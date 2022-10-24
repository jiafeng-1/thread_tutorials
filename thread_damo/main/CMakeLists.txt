project(main)
# include_directories(
#     "/home/jiafeng/jiafeng/FFMPEG/dh_rtmp/include")
# link_directories("/home/jiafeng/jiafeng/FFMPEG/dh_rtmp/lib/x86_64")
# link_directories( "/home/jiafeng/jiafeng/FFMPEG/dh_rtmp/build/src")
message("main" ${PROJECT_BINARY_DIR}/lib)
aux_source_directory(. DIR_MAIN)

# 生成可执行文件
add_executable(tcp ${DIR_MAIN})
# 链接
target_link_libraries(thread_damo JF_thread)
# gcc .\main.c -L..\lib\ -lgeneral -lwsock32 -lmq_ -lpaho-mqtt3c -I..\include\ -o main.exe

