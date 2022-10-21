/*
 * @Descripttion: 
 * @Author: Jia Feng
 * @version: 
 * @Date: 2022-10-17 20:11:31
 * @LastEditors: Jia Feng
 * @LastEditTime: 2022-10-17 20:20:35
 */
#include <stdio.h>
#include <stdlib.h>
#include "thread.h"
int main(int argc, char *argv[])
{
    /*用默认属性初始化互斥锁*/
    pthread_mutex_init(&mut,NULL);
    thread_create();
    thread_wait();
    return 0;
}




