#include <iostream>
using namespace std;

void StringPermutation(char* pStr, char* pBegin)
{
    if (*pBegin == '\0') {
        cout << pStr << endl;
    } else {
        for (char* pCh = pBegin; *pCh != '\0'; ++pCh) {
            swap(*pCh, *pBegin);
            StringPermutation(pStr, pBegin + 1);
            swap(*pCh, *pBegin);
        }
    }
}

void StringPermutation(char* pStr)
{
    if (NULL == pStr) {
        return;
    }

    StringPermutation(pStr, pStr);
}

void StringPermutation2(char* pStr)
{
    if (NULL == pStr) {
        return;
    }

    char* pBegin = pStr;
    char* pEnd = pStr + strlen(pStr);
    sort(pBegin, pEnd);
    do {
        cout << pStr << endl;
    } while (next_permutation(pBegin, pEnd));
}

int main()
{
    char str[] = "abc";

    cout << "Result 1: " << endl;
    StringPermutation(str);
    cout << endl;

    cout << "Result 2: " << endl;
    StringPermutation2(str);

    return 0;
}

