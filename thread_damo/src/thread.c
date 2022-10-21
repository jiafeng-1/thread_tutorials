/*
 * @Descripttion: 
 * @Author: Jia Feng
 * @version: 
 * @Date: 2022-10-17 20:13:35
 * @LastEditors: Jia Feng
 * @LastEditTime: 2022-10-20 00:54:17
 */
#include "thread.h"

#define THREADMAX 10
 
pthread_t thread[THREADMAX]; //创建线程函数返回类型
pthread_mutex_t mut; //互斥锁类型
static int number=0;
 
void *thread1(void* a) //线程函数
{
    pthread_mutex_lock(&mut); //加锁，用于对共享变量操作
    printf("number = %d\n", number++);
    pthread_mutex_unlock(&mut); //解锁
 
}
 

void thread_create(void)
{
    /*创建线程*/
    int i=0;
    for (i=0;i<THREADMAX;i++){
        pthread_create(&thread[i], NULL, thread1, NULL);
    }
}
 
void thread_wait(void)
{
    int i=0;
    for (i=0;i<THREADMAX ;i++){
        pthread_join(thread[i],NULL);
    }
}