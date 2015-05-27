#include <iostream>
#include <stack>
using namespace std;

struct BinaryTreeNode
{
    int data;
    BinaryTreeNode* pLeft;
    BinaryTreeNode* pRight;
};

void PreOrderRecursively (BinaryTreeNode* pRoot)
{
    if (NULL != pRoot)
    {
        cout << pRoot->data;
        PreOrderRecursively(pRoot->pLeft);
        PreOrderRecursively(pRoot->pRight);
    }
}

void InOrderRecursively (BinaryTreeNode* pRoot)
{
    if (pRoot)
    {
        InOrderRecursively(pRoot->pLeft);
        cout << pRoot->data;
        InOrderRecursively(pRoot->pRight);
    }
}

void PostOrderRecursively (BinaryTreeNode* pRoot)
{
    if (NULL != pRoot)
    {
        PostOrderRecursively(pRoot->pLeft);
        PostOrderRecursively(pRoot->pRight);
        cout << pRoot->data;
    }
}

void PreOrderNonRecursively1 (BinaryTreeNode* pRoot)
{
    if (NULL == pRoot)
    {
        return;
    }

    stack<BinaryTreeNode*> nodes;
    nodes.push(pRoot);
    while (!nodes.empty())
    {
        BinaryTreeNode* pNode = nodes.top();
        nodes.pop();
        if (pNode)
        {
            cout << pNode->data;
            nodes.push(pNode->pRight);
            nodes.push(pNode->pLeft);
        }
    }
}

void PreOrderNonRecursively2 (BinaryTreeNode* pRoot)
{
    if (NULL == pRoot)
    {
        return;
    }

    stack<BinaryTreeNode*> nodes;
    BinaryTreeNode* pNode = pRoot;
    while (NULL != pNode || !nodes.empty())
    {
        while (NULL != pNode)
        {
            cout << pNode->data;
            nodes.push(pNode);
            pNode = pNode->pLeft;
        }

        pNode = nodes.top();
        nodes.pop();
        pNode = pNode->pRight;
    }
}

void InOrderNonRecursively (BinaryTreeNode* pRoot)
{
    if (NULL == pRoot)
    {
        return;
    }

    stack<BinaryTreeNode*> nodes;
    BinaryTreeNode* pNode = pRoot;
    while (NULL != pNode || !nodes.empty())
    {
        while (NULL != pNode)
        {
            nodes.push(pNode);
            pNode = pNode->pLeft;
        }

        pNode = nodes.top();
        nodes.pop();
        cout << pNode->data;
        pNode = pNode->pRight;
    }
}

void PostOrderNonRecursively (BinaryTreeNode* pRoot)
{
    if (NULL == pRoot)
    {
        return;
    }

    stack<BinaryTreeNode*> nodes;
    BinaryTreeNode* pNode = pRoot;
    BinaryTreeNode* pNodeVisited = NULL;
    while (NULL != pNode || !nodes.empty())
    {
        while (NULL != pNode)
        {
            nodes.push(pNode);
            pNode = pNode->pLeft;
        }

        pNode = nodes.top();
        nodes.pop();
        if (NULL == pNode->pRight || pNodeVisited == pNode->pRight)
        {
            cout << pNode->data;
            pNodeVisited = pNode;
            pNode = NULL;
        }
        else
        {
            nodes.push(pNode);
            pNode = pNode->pRight;
        }
    }
}

int main()
{
    cout << "test" << endl;

    return 0;
}

