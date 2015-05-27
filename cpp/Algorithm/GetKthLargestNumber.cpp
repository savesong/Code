#include <iostream>
#include <utility>

int Partition(int array[], int begin, int end)
{
    int pivot = array[end];
    int small = begin - 1;
    for (int i = begin; i < end; ++i) {
        if (array[i] <= pivot) {
            ++small;
            std::swap(array[small], array[i]);
        }
    }

    std::swap(array[small + 1], array[end]);
    return small + 1;
}

int GetKthLargestNumber1Core(int array[], int begin, int end, int k)
{
    int index = Partition(array, begin, end);
    int order = index - begin + 1;
    if (order == k) {
        return array[index];
    } else if (order > k) {
        return GetKthLargestNumber1Core(array, begin, index - 1, k);
    } else {
        return GetKthLargestNumber1Core(array, index + 1, end, k - order);
    }
}

bool g_InvalidInput = false;
int GetKthLargestNumber1(int array[], int length, int k)
{
    if (NULL == array || length <= 0 || k > length) {
        g_InvalidInput = true;
        return -1;
    }

    return GetKthLargestNumber1Core(array, 0, length - 1, k);
}

// ---------------------------------------------------------------------------

bool g_InvalidInput2 = false;
int GetKthLargestNumber2(int array[], int length, int k)
{
    if (NULL == array || length <= 0 || k <= 0 || k > length) {
        g_InvalidInput2 = true;
        return 0;
    }

    const int EXPECTED = k - 1;
    int index = Partition(array, 0, length - 1);
    while (index != EXPECTED) {
        if (index > EXPECTED) {
            index = Partition(array, 0, index - 1);
        } else if (index < EXPECTED) {
            index = Partition(array, index + 1, length - 1);
        }
    }
    return array[index];
}

int main()
{
    int array[] = {1, 3, 2, 5, 4};
    std::cout << GetKthLargestNumber1(array, 5, 4) << std::endl;
    std::cout << GetKthLargestNumber2(array, 5, 4) << std::endl;

    return 0;
}

