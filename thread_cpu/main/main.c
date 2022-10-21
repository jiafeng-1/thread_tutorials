/*
 * @Descripttion: 
 * @Author: Jia Feng
 * @version: 
 * @Date: 2022-10-20 18:13:03
 * @LastEditors: Jia Feng
 * @LastEditTime: 2022-10-20 19:33:18
 */
#include "thread.h"

 
int main()
{
    int cpu_num = 0;
    cpu_num  = GetCpuCount();
    printf("The number of cpu is %d\n", cpu_num);
 
    pthread_t t1;
    pthread_t t2;
    pthread_attr_t attr1;
    pthread_attr_t attr2;
 
    pthread_attr_init(&attr1);
    pthread_attr_init(&attr2);
 
    if (0!=pthread_create(&t1, &attr1, thread_fun_1, NULL))
    {
        printf("create thread 1 error\n");
        return;
    }
 
    if (0!=pthread_create(&t2, &attr2, thread_fun_2, NULL))
    {
        printf("create thread 2 error\n");
        return;
    }
 
    cpu_set_t cpu_info;
    CPU_ZERO(&cpu_info);
    CPU_SET(10, &cpu_info);
    if (0!=pthread_setaffinity_np(t1, sizeof(cpu_set_t), &cpu_info))
    {
        printf("set affinity failed");
    }
 
    CPU_ZERO(&cpu_info);
    CPU_SET(11, &cpu_info);
    if (0!=pthread_setaffinity_np(t2, sizeof(cpu_set_t), &cpu_info))
    {
        printf("set affinity failed");
    }
 
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
}