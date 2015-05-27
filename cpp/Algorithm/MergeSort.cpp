#include <iostream>
#include <exception>
using namespace std;

void MergeSortCore(int array[], int low, int mid, int high)
{
    const int LENGTH1 = mid - low + 1;
    int* array1 = new int[LENGTH1];
    memcpy(array1, array + low, LENGTH1 * sizeof(int));

    const int LENGTH2 = high - mid;
    int* array2 = new int[LENGTH2];
    memcpy(array2, array + mid + 1, LENGTH2 * sizeof(int));

    int i = 0;
    int j = 0;
    int k = low;
    while (i < LENGTH1 && j < LENGTH2) {
        if (array1[i] <= array2[j]) {
            array[k++] = array1[i++];
        } else {
            array[k++] = array2[j++];
        }
    }

    while (i < LENGTH1) {
        array[k++] = array1[i++];
    }

    while (j < LENGTH2) {
        array[k++] = array2[j++];
    }

    delete[] array1;
    delete[] array2;
}

void MergeSort(int array[], int begin, int end)
{
    if (begin < end) {
        int mid = begin + (end - begin) / 2;
        MergeSort(array, begin, mid);
        MergeSort(array, mid + 1, end);
        MergeSortCore(array, begin, mid, end);
    }
}

void MergeSort(int array[], int length)
{
    if (NULL == array || length <= 0) {
        throw invalid_argument("Invalid input!");
    }

    MergeSort(array, 0, length - 1);
}

int main()
{
    int array[] = {2, 1, 3, 6, 5, 4};
    try {
        MergeSort(array, 6);
    } catch (const exception& ex) {
        cerr << ex.what() << endl;
    }

    for (int i : array) {
        cout << i << ", ";
    }
    cout << endl;

    return 0;
}

