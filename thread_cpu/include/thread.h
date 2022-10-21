/*
 * @Descripttion: 
 * @Author: Jia Feng
 * @version: 
 * @Date: 2022-10-20 18:24:47
 * @LastEditors: Jia Feng
 * @LastEditTime: 2022-10-20 21:04:33
 */
#ifndef __THREAD__H
#define __THREAD__H
#include <stdio.h>
#define __USE_GNU
#include <pthread.h>
#include <unistd.h>
#include <sys/syscall.h>
int GetCpuCount();

void *thread_fun_1();
void *thread_fun_2();


#endif