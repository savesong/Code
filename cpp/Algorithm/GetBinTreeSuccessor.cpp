#include <iostream>
using namespace std;

struct BinTreeNode
{
    int data;
    BinTreeNode* pLeft;
    BinTreeNode* pRight;
    BinTreeNode* pParent;
};

bool g_InvalidInput = false;
BinTreeNode* GetBinTreeSuccessor(BinTreeNode* node)
{
    if (NULL == node) {
        g_InvalidInput = true;
        return NULL;
    }

    if (node->pRight != NULL) {
        BinTreeNode* pLeftMost = node->pRight;
        while (pLeftMost && pLeftMost->pLeft) {
            pLeftMost = pLeftMost->pLeft;
        }
        return pLeftMost;
    }

    BinTreeNode* pParentNode = node->pParent;
    while (pParentNode && node == pParentNode->pRight) {
        node = pParentNode;
        pParentNode = node->pParent;
    }
    return pParentNode;
}

int main()
{
    cout << "GetBinTreeSuccessor()" << endl;

    return 0;
}

