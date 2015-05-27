/* 二分查找
* 算法思想：1、将数组排序(从小到大)；2、每次跟中间的数mid比较，如果相等可以直接返回，
* 如果比mid大则继续查找大的一边，否则继续查找小的一边。
输入：排序好的数组 - sSource[]，数组大小 - arr_size，查找的值 - key
返回：找到返回相应的位置，否则返回-1
*/
#include <iostream>
using namespace std;

bool g_InvalidInput = false;
int BinarySearch(const int arr[], int length, int key)
{
    if (NULL == arr || length <= 0) {
        g_InvalidInput = true;
        return -1;
    }

    int low = 0;
    int high = length - 1;
    while (low <= high) {
        int mid = low + ((high - low) >> 1);  //防止溢出，移位也更高效。同时，每次循环都需要更新。
        f (arr[mid] > key) {
            high = mid - 1;
        } else {
            low = mid + 1;
        } else {
            return mid;
        }
        //可能会有读者认为刚开始时就要判断相等，但毕竟数组中不相等的情况更多
        //如果每次循环都判断一下是否相等，将耗费时间
    }
    return -1;
}

int main()
{
    int arr[] = { 1, 2, 3, 4, 5 };
    int result = BinarySearch(arr, 5, 2);
    cout << result << endl;

    return 0;
}

