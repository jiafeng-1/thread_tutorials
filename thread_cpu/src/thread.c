/*
 * @Descripttion: 
 * @Author: Jia Feng
 * @version: 
 * @Date: 2022-10-20 18:15:50
 * @LastEditors: Jia Feng
 * @LastEditTime: 2022-10-20 21:03:42
 */
#include "thread.h"
 
int GetCpuCount()
{
    return (int)sysconf(_SC_NPROCESSORS_ONLN);
}
 
#define gettidv1() syscall(__NR_gettid) // new form
void *thread_fun_1()
{
    pthread_setname_np(pthread_self(), "thread_1");
    char thread_name[20] = {0};
    while(1)
    {
        pthread_getname_np(pthread_self(), thread_name, sizeof(thread_name));
        printf("the thread_1's Pid is %d\n", getpid());
        printf("The LWPID/tid of thread_1 is: %ld\n", (long int)gettidv1());
        printf("thread name = %s\n", thread_name);
        printf("thread name = %s\n", thread_name);
        printf("thread name = %s\n", thread_name);
        printf("thread name = %s\n", thread_name);
        printf("thread name = %s\n", thread_name);
        sleep(1);

    }
 
    return NULL;
}

void *thread_fun_2()
{
    pthread_setname_np(pthread_self(), "thread_2");
    char thread_name[20] = {0};
    while(1)
    {
        pthread_getname_np(pthread_self(), thread_name, sizeof(thread_name));
        printf("the thread_1's Pid is %d\n", getpid());
        printf("The LWPID/tid of thread_1 is: %ld\n", (long int)gettidv1());
        printf("thread name = %s\n", thread_name);
        printf("thread name = %s\n", thread_name);
        printf("thread name = %s\n", thread_name);
        printf("thread name = %s\n", thread_name);
        printf("thread name = %s\n", thread_name);
        printf("thread name = %s\n", thread_name);
        sleep(1);
    }
 
    return NULL;
}