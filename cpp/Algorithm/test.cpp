#include <iostream>
#include <set>
#include <exception>
using namespace std;

struct InvalidInputException : std::exception
{
    virtual const char* what() const noexcept
    {
        return "Invalid input!";
    }
};

void testException()
{
    try {
        throw InvalidInputException();
    } catch (exception& ex) {
        cout << ex.what() << endl;
    }
}

void testSet()
{
    set<int, greater<int> > intSet;
    intSet.insert(1);
    intSet.insert(3);
    intSet.insert(2);
    intSet.insert(6);
    intSet.insert(5);
    intSet.insert(4);

    for (int i : intSet) {
        cout << i << ", ";
    }
    cout << endl;
}

int main()
{
//    testException();
    testSet();

    return 0;
}

