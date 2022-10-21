var SELF_DEFINE_TOPIC_USER_DATA = '/user/data';

function rawDataToJson(topic, bytes) {
    if (topic.includes(SELF_DEFINE_TOPIC_USER_DATA)) {
        return parseUserDataToJson(topic, bytes);
    }
    return null;
}

function parseUserDataToJson(topic, bytes) {
    var int8Array = Int8Array.from(bytes);
    var dataView = buildDataView(bytes);

    var jsonMap = [];
    var frameInfos = [];

    var length = bytes.length;
    var headerCount = 0;
    for (var i = 0; i < length - 2; i++) {
        if (dataView.getUint16(i) == 0x5a5a) {
            headerCount++;
        }
    }
    var startPosition = 0;
    var endPosition = 0;

    var resultData = {
        version: 0,
        length: length,
        frameCount: 0,
        dataset: jsonMap,
        frames: frameInfos,
        rawData: int8Array
    };
    resultData.frameCount = headerCount;

    for (var hCount = 0; hCount < headerCount; hCount++) {
        //帧头5a5a
        var index = startPosition;
        var offset = 2;
        if (length < index + offset) {
            return resultData;
        }
        if (dataView.getUint16(index) != 0x5a5a) {
            return resultData;
        }

        //设备编号RM01-B0122040001
        index += offset;
        offset = 16;
        if (length < index + offset) {
            return resultData;
        }
        var deviceName = '';
        for (var i = 0; i < offset; i++) {
            deviceName += String.fromCharCode(bytes[i + index]);
        }

        // 帧计数
        index += offset;
        offset = 1;
        if (length < index + offset) {
            return resultData;
        }
        var frameCount = dataView.getUint8(index);

        // 版本号
        index += offset;
        offset = 2;
        if (length < index + offset) {
            return resultData;
        }
        var version = dataView.getUint8(index).toString() + '.' + dataView.getUint8(index + 1).toString()
        resultData.version = version;

        //payload个数
        index += offset;
        offset = 1
        var payloadCount = dataView.getUint8(index);

        // 保留
        index += offset;
        offset = 1;
        if (length < index + offset) {
            return resultData;
        }
        var retain = dataView.getUint16(index);

        for (var Count = 0; Count < payloadCount; Count++) {
            // =========payload==========
            // payload-数据类型
            index += offset;
            offset = 2;
            if (length < index + offset) {
                return resultData;
            }
            var dataType = dataView.getUint16(index, true);

            // payload-保留
            index += offset;
            offset = 1;
            if (length < index + offset) {
                return resultData;
            }
            var retain_1 = dataView.getUint8(index);

            // payload-数据长度
            index += offset;
            offset = 2;
            if (length < index + offset) {
                return resultData;
            }
            var dataLength = dataView.getUint16(index, true);

            index += offset;
            offset = dataLength;
            if (length < index + offset) {
                resultData.fdataLength = dataLength;
                return resultData;
            }
            // M：体动 S：体征 T：轨迹 P：点云 C:配置 R：重发 U：更新 X:帧统计
            var subJsonMap = {};

            switch (dataType) {
                case 0x01: // 4.4.雷达体动数据上传(数据类型0x0001)
                    subJsonMap['topic'] = topic;
                    subJsonMap['deviceName'] = deviceName;
                    subJsonMap['dataType'] = 'M';
                    subJsonMap['Falling'] = dataView.getUint8(index) === 1 ? true : false;
                    // subJsonMap['PeopleCount'] = dataView.getUint8(index + 1);
                    jsonMap.push(subJsonMap);
                    break;
                case 0x02: // 4.5.雷达体征数据上传(数据类型0x0002)
                    subJsonMap['topic'] = topic;
                    subJsonMap['deviceName'] = deviceName;
                    subJsonMap['dataType'] = 'S';
                    subJsonMap['BreathRate'] = dataView.getUint8(index);
                    subJsonMap['HeartRate'] = dataView.getUint8(index + 1);
                    jsonMap.push(subJsonMap);
                    break;
                case 0x03: // 4.6.雷达轨迹数据上传(数据类型0x0003)
                    subJsonMap['topic'] = topic;
                    subJsonMap['deviceName'] = deviceName;
                    subJsonMap['dataType'] = 'T';
                    subJsonMap['trackId'] = retain_1;
                    var XYNum = Math.floor(dataLength / 8);
                    subJsonMap['XY'] = [];
                    for (var i = 0; i < XYNum; i++) {
                        var subXY = {};
                        subXY['X'] = dataView.getFloat32(index + i * 8, true);
                        subXY['Y'] = dataView.getFloat32(index + 4 + i * 8, true);
                        subJsonMap['XY'].push(subXY);
                    }
                    jsonMap.push(subJsonMap);
                    break;
                case 0x04: // 4.7.雷达点云数据上传(数据类型0x0004)
                    subJsonMap['topic'] = topic;
                    subJsonMap['deviceName'] = deviceName;
                    subJsonMap['dataType'] = 'P';
                    subJsonMap['dataLength'] = dataLength;
                    var rawPoindCloud = int8Array.subarray(index, index + dataLength + 2); // new Uint8Array(dataView.buffer, index, dataLength);
                    subJsonMap['rawPoindCloud'] = rawPoindCloud;
                    var cpOffset = 0;
										if (version && version == '1.4') {
                      	var timestamp = dataView.getBigUint64(index + cpOffset, true);
                        subJsonMap['time'] = BigInt.asIntN(64, timestamp);
                        cpOffset += 8;
                    }
                    subJsonMap['type'] = dataView.getUint32(index + cpOffset, true);
                    cpOffset += 4;
                    subJsonMap['length'] = dataView.getUint32(index + cpOffset, true);
                    cpOffset += 4;
                    subJsonMap['elevationUnit'] = dataView.getFloat32(index + cpOffset, true);
                    cpOffset += 4;
                    subJsonMap['azimuthUnit'] = dataView.getFloat32(index + cpOffset, true);
                    cpOffset += 4;
                    if (version && version == '1.2') {
                        subJsonMap['dopplerUnit'] = dataView.getFloat32(index + cpOffset, true);
                        cpOffset += 4;
                    }
                    subJsonMap['rangeUnit'] = dataView.getFloat32(index + cpOffset, true);
                    cpOffset += 4;
                    if (version && version == '1.2') {
                        subJsonMap['snrUint'] = dataView.getFloat32(index + cpOffset, true);
                        cpOffset += 4;
                    }
                    var pointNum = Math.floor((dataLength - cpOffset) / 4);
                    if (version && version == '1.2') {
                        pointNum = Math.floor((dataLength - cpOffset) / 8);
                    }
                    subJsonMap['points'] = [];
                    for (var i = 0; i < pointNum; i++) {
                        var subpoint = {};
                        subpoint['elevation'] = dataView.getInt8(index + cpOffset);
                        cpOffset += 1;
                        subpoint['azimuth'] = dataView.getInt8(index + cpOffset);
                        cpOffset += 1;
                        if (version && version == '1.2') {
                            subpoint['doppler'] = dataView.getInt16(index + cpOffset, true);
                            cpOffset += 2;
                        }
                        subpoint['range'] = dataView.getUint16(index + cpOffset, true);
                        cpOffset += 2;
                        if (version && version == '1.2') {
                            subpoint['snr'] = dataView.getUint16(index + cpOffset, true);
                            cpOffset += 2;
                        }
                        subJsonMap['points'].push(subpoint);
                    }
                    jsonMap.push(subJsonMap);
                    break;
                case 0x06: // 4.9.重新配置雷达wifi回复(数据类型0x0006)
                    subJsonMap['topic'] = topic;
                    subJsonMap['deviceName'] = deviceName;
                    subJsonMap['dataType'] = 'C';
                    subJsonMap['WifiConfig'] = dataView.getUint8(index) === 1 ? true : false;
                    jsonMap.push(subJsonMap);
                    break;
                case 0x08: // 4.11.重发雷达wifi名称回复 (数据类型0x0008)
                    subJsonMap['topic'] = topic;
                    subJsonMap['deviceName'] = deviceName;
                    subJsonMap['dataType'] = 'R';
                    var str = '';
                    for (var i = 0; i < dataLength; i++) {
                        str += String.fromCharCode(bytes[i + index]);
                    }
                    subJsonMap['WifiName'] = str;
                    jsonMap.push(subJsonMap);
                    break;
                case 0x0a: // 4.13.雷达程序更新情况回复(数据类型0x000a)
                    subJsonMap['topic'] = topic;
                    subJsonMap['deviceName'] = deviceName;
                    subJsonMap['dataType'] = 'U';
                    subJsonMap['upgrade'] = dataView.getUint8(index) === 1 ? true : false;
                    jsonMap.push(subJsonMap);
                    break;
                case 0x0d: // 4.16.请求时间戳 (数据类型0x000d)
                    subJsonMap['topic'] = topic;
                    subJsonMap['deviceName'] = deviceName;
                    subJsonMap['dataType'] = 'NTP';
                    subJsonMap['deviceSendTime'] = dataView.getBigUint64(index, true);
                    jsonMap.push(subJsonMap);
                    break;
            }
            index += offset;
            offset = 0;
            if (length < index + offset) {
                return resultData;
            }
        }
        //校验码
        index += offset;
        offset = 2;
        if (length < index + offset) {
            return resultData;
        }
        // var dataCheck = dataView.getUint16(index, true);

        //帧尾
        index += offset;
        offset = 2;
        if (length < index + offset) {
            return resultData;
        }
        // 数据帧解析结束
        if (dataView.getUint16(index) == 0xa5a5) {
            endPosition = index + 1;
            frameInfos.push({
                version: version,
                frameStart: startPosition,
                frameEnd: endPosition,
                frameNo: frameCount,
                payloadCount: payloadCount,
                length: endPosition - startPosition + 1,
                data: int8Array.subarray(startPosition, endPosition + 1),
                dataType: "X",
            });
            if (hCount === headerCount - 1) {
                return resultData;
            }
        }
        index += offset;
        startPosition = index;
    }
    return resultData;
}

function reportDeviceInfo() {
    var payloadArray = [];
    payloadArray = payloadArray.concat(buffer_uint16(0x0007, true)); //数据类型。
    payloadArray = payloadArray.concat(buffer_uint8(0)); //保留。
    payloadArray = payloadArray.concat(buffer_uint16(0, true)); //数据长度。
    return build_data_frame(payloadArray);
}

function resetwifi(json) {
    var wifiInfo = json.params["resetwifi"];
    var payloadArray = [];
    var ssid = wifiInfo['id'];
    var pwd = wifiInfo['password'];

    payloadArray = payloadArray.concat(buffer_uint16(0x0005, true)); //数据类型。
    payloadArray = payloadArray.concat(buffer_uint8(0)); //保留。

    if (!ssid) {
        payloadArray = payloadArray.concat(buffer_uint16(0, true)); //数据长度。
    } else {
        var len = 3 + ssid.length + pwd.length
        payloadArray = payloadArray.concat(buffer_uint16(len, true)); //数据长度。

        payloadArray = payloadArray.concat(buffer_uint8(ssid.length)); //ssid长度。
        payloadArray = payloadArray.concat(string_to_uint8_array(ssid));
        payloadArray = payloadArray.concat(buffer_uint8(pwd.length)); //pwd长度。
        payloadArray = payloadArray.concat(string_to_uint8_array(pwd));
    }

    return build_data_frame(payloadArray);
}

function ntpResponse(json) {
    var payloadArray = [];
    payloadArray = payloadArray.concat(buffer_uint16(0x000e, true)); //数据类型。
    payloadArray = payloadArray.concat(buffer_uint8(0)); //保留。
		payloadArray = payloadArray.concat(buffer_uint16(3*8, true)); //数据长度。
    
  	payloadArray = payloadArray.concat(buffer_uint64(BigInt(json.deviceSendTime), true));
    payloadArray = payloadArray.concat(buffer_uint64(BigInt(json.serverRecvTime), true));
    payloadArray = payloadArray.concat(buffer_uint64(BigInt(json.serverSendTime), true));
    return build_data_frame(payloadArray);
}

function jsonToRawData(topic, json) {

    var service_request = '/thing/service/request';
    if (topic.includes(service_request)) {
        if (json.params && json.params["resetwifi"]) {
            return resetwifi(json);
        } else if (json.params && json.params["reportDeviceInfo"]) {
            return reportDeviceInfo();
        } else if (json["deviceSendTime"]) {
            return ntpResponse(json);
        }
    }

    return null;
}

function build_data_frame(data) {
    var payloadArray = [];
    payloadArray = payloadArray.concat(buffer_uint16(0x5A5A, true)); //帧头
    payloadArray = payloadArray.concat(string_to_uint8_array('aaaaaaaaaaaaaaaa')); //设备编号
    payloadArray = payloadArray.concat(buffer_uint8(1)); //帧计数
    payloadArray = payloadArray.concat(buffer_uint8(1)); //版本号
    payloadArray = payloadArray.concat(buffer_uint8(0)); //版本号
    payloadArray = payloadArray.concat(buffer_uint16(0, true)); //保留

    payloadArray = payloadArray.concat(data); //payload
		
    payloadArray = payloadArray.concat(buffer_uint16(0, true)); //校验码
    payloadArray = payloadArray.concat(buffer_uint16(0xA5A5, true)); //帧尾

    return payloadArray
}