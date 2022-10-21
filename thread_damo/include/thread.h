/*
 * @Descripttion: 
 * @Author: Jia Feng
 * @version: 
 * @Date: 2022-10-17 20:13:42
 * @LastEditors: Jia Feng
 * @LastEditTime: 2022-10-17 23:11:22
 */
#ifndef __THREAD__H
#define __THREAD__H
#include <stdio.h>  
#include <math.h>  
#include <pthread.h>  
#include <stdlib.h>  
#include <string.h>
#include <sys/time.h>
#include <unistd.h>

#define THREADMAX 10
 
extern pthread_t thread[THREADMAX]; //创建线程函数返回类型
extern pthread_mutex_t mut; //互斥锁类型

void *thread1(void* a);
void thread_create(void);
void thread_wait(void);

#endif