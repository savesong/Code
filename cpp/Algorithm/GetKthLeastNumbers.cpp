#include <iostream>
#include <set>
#include <utility>
using namespace std;

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

bool g_InvalidInput = false;
typedef std::multiset<int, std::greater<int> > IntSet;
typedef std::multiset<int, std::greater<int> >::iterator IntSetItr;

void GetKthLeastNumbers1(int array[], int length, int k, IntSet& numbers)
{
    if (NULL == array || length <= 0 || k <= 0 || k > length) {
        g_InvalidInput = true;
    }

    int index = Partition(array, 0, length - 1);
    const int EXPECTED = k - 1;
    int begin = 0;
    int end = length - 1;
    while (index != EXPECTED) {
        if (index > EXPECTED) {
            end = index - 1;
        } else {
            begin = index + 1;
        }
        index = Partition(array, begin, end);
    }

    numbers.clear();
    for (int i = 0; i <= index; ++i) {
        numbers.insert(array[i]);
    }
}

void GetKthLeastNumbers2(int array[], int length, int k, IntSet& numbers)
{
    if (NULL == array || length <= 0 || k <= 0 || k > length) {
        g_InvalidInput = true;
    }

    numbers.clear();
    for (int i = 0; i < length; ++i) {
        if (numbers.size() < k) {
            numbers.insert(array[i]);
        } else {
            IntSetItr curMaxItr = numbers.begin();
            if (array[i] < *curMaxItr) {
                numbers.erase(curMaxItr);
                numbers.insert(array[i]);
            }
        }
    }
}

int main()
{
    int array[] = {1, 3, 2, 5, 4};

    IntSet result1;
    GetKthLeastNumbers1(array, 5, 4, result1);
    for (int i : result1) {
        cout << i << ", ";
    }
    cout << endl;

    IntSet result2;
    GetKthLeastNumbers2(array, 5, 4, result2);
    for (int i : result2) {
        cout << i << ", ";
    }
    cout << endl;

    return 0;
}

