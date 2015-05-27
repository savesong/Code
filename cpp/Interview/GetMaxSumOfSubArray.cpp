#include <iostream>
using namespace std;

bool g_InvalidInput = false;
int GetMaxSumOfSubArray(int* array, int length)
{
    if (array == NULL || length <= 0) {
        g_InvalidInput = true;
        return 0;
    }

    long maxsum = array[0];
    long curSum = 0;
    for (int i = 0; i < length; i++) {
       if (curSum <= 0) {
           curSum = array[i];
       } else {
           curSum += array[i];
       }

       if (curSum > maxsum) {
           maxsum = curSum;
       }
    }

    return maxsum;
}

int main()
{
    int arr1[] = {1, -2, 3, 10, -4, 7, 2, -5};
    cout << GetMaxSumOfSubArray(arr1, 8) << endl;

    return 0;
}

