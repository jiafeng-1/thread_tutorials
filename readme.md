<!--
 * @Descripttion: 
 * @Author: Jia Feng
 * @version: 
 * @Date: 2022-10-23 18:57:56
 * @LastEditors: Jia Feng
 * @LastEditTime: 2022-10-23 19:40:28
-->
## 工程搭建自动化脚本
采用自己构建的自动化脚本ingo
项目地址`https://github.com/jiafeng-1/ingo_.git`

```bash
# 非常简单的使用
ingo + 项目名称
# 可选择创建c/c++工程，可选项使用make/cmake做编译，可使用vscode调试代码
# 欢迎测试进去了解使用。
```

## 代码工程结构
```bash
tree -L 1
.
├── auto   --- 自动化脚本
├── build  --- 编译目录/可执行脚本默认生成在./build/main/目录下
├── CMakeLists.txt --- CmakeLists根文件
├── conf   --- 配置文件(空)
├── include ---头文件
├── lib     --- lib库文件(空)    
├── main    --- main主文件
├── src     --- src源文件
└── version --- 版本记录文件

```
### thread_damo
多线程基础教程-c语言版本使用pthread线程库，实现基础的线程操作。

使用方法 
```bash
cd thread_damo
mkdir build && cd build 
cmake .. && make
# 运行二进制文件
./main/[工程二进制文件名称]
```

### thread_cpu
多线程进阶教程-c语言版本使用pthread线程库，对线程进行cpu绑核操作。

使用方法 
```bash
cd thread_damo
mkdir build && cd build 
cmake .. && make
# 运行二进制文件
./main/[工程二进制文件名称]
```