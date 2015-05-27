// g++ -std=c++11 Cpp11.cpp
#include <iostream>
using namespace std;

void LearnRangeBasedForLoop() {
    string str{"abc"};
    for (auto ch : str) {
        cout << ch << endl;
    }
}

int main() {
    auto i = 123;
    cout << i << endl;

    LearnRangeBasedForLoop();
}
