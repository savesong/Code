#include <iostream>
#include <queue>
using namespace std;

void Swap(int arr[], int index1, int index2)
{
    if (index1 != index2) {
        int temp = arr[index1];
        arr[index1] = arr[index2];
        arr[index2] = temp;
    }
}

int Partition(int arr[], int begin, int end)
{
    int pivot = arr[end];
    int small = begin - 1;
    for (int i = begin; i < end; ++i) {
        if (arr[i] <= pivot) {
            ++small;
            Swap(arr, i, small);
        }
    }
    Swap(arr, small + 1, end);
    return small + 1;
}

void QuickSortRecursively(int arr[], int begin, int end)
{
    if (begin < end) {
        int index = Partition(arr, begin, end);
        QuickSortRecursively(arr, begin, index - 1);
        QuickSortRecursively(arr, index + 1, end);
    }
}

void QuickSortIteratively(int arr[], int begin, int end)
{
    if (begin < end) {
        queue<int> indices;
        indices.push(begin);
        indices.push(end);

        while (!indices.empty()) {
            int idx1 = indices.front();
            indices.pop();
            int idx2 = indices.front();
            indices.pop();
            int index = Partition(arr, idx1, idx2);

            if (idx1 < index - 1) {
                indices.push(idx1);
                indices.push(index - 1);
            }

            if (index + 1 < end) {
                indices.push(index + 1);
                indices.push(end);
            }
        }
    }
}

bool g_InvalidInput = false;
void QuickSort(int arr[], int length)
{
    if (nullptr == arr || length <= 0) {
        g_InvalidInput = true;
        return;
    }

    QuickSortRecursively(arr, 0, length - 1);
//    QuickSortIteratively(arr, 0, length - 1);
}

// for testing
template<class T>
void PrintArray(T arr[], int length)
{
    for (int i = 0; i < length; ++i) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main()
{
    int arr1[] = {7, 6, 5, 4, 3, 2, 1};
    QuickSort(arr1, 7);
    PrintArray(arr1, 7);

    int arr2[] = {1, 2, 3, 4, 5, 6, 7};
    QuickSort(arr2, 7);
    PrintArray(arr2, 7);

    int arr3[] = {2, 7, 1, 3, 5, 6, 4};
    QuickSort(arr3, 7);
    PrintArray(arr3, 7);

    int arr4[] = {3, 5, 2, 3, 66, 225, 1};
    QuickSort(arr4, 7);
    PrintArray(arr4, 7);

    return 0;
}

