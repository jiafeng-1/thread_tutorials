project(src)


# 添加原文件
set(src_lib "general" PARENT_SCOPE)
aux_source_directory(. DIR_SRCS)
message("my src source: " ${DIR_SRCS})


# 生成静态库
add_library(JF_thread STATIC ${DIR_SRCS})
# 链接库
# target_link_libraries(dh_rtmp ${OpenCV_LIBS})
# target_link_libraries(dh_rtmp gxiapi)
target_link_libraries(JF_thread pthread)
# target_link_libraries(dh_rtmp swscale)
# target_link_libraries(dh_rtmp avcodec)
# target_link_libraries(dh_rtmp avformat)
# target_link_libraries(dh_rtmp avutil)
add_definitions("-Wall -g")