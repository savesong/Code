#include <iostream> 
#include <time.h> 
using namespace std; 

const int MAX = 100;

int main() 
{
    srand( (unsigned)time( NULL ) );  //srand()函数产生一个以当前时间开始的随机种子.应该放在for等循环语句前面 不然要很长时间等待
    for (int i = 0; i < 10; i++) {
        cout << rand() % MAX <<endl;  //MAX为最大值，其随机域为0~MAX-1
    }

    return 0; 
} 
