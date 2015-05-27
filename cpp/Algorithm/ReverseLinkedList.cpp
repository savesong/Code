#include <iostream>
using namespace std;

struct ListNode
{
    int m_data;
    ListNode* m_pNext;
};

ListNode* ReverseLinkedList(ListNode* pHead)
{
    ListNode* pReversedHead = NULL;
    ListNode* pPre = NULL;
    ListNode* pNode = pHead;
    while (pNode != NULL) {
        ListNode* pNext = pNode->m_pNext;
        if (NULL == pNext) {
            pReversedHead = pNode;
        }

        pNode->m_pNext = pPre;
        pPre = pNode;
        pNode = pNext;
    }

    return pReversedHead;
}

int main()
{
    cout << "ReverseLinkedList()" << endl;
    return 0;
}

