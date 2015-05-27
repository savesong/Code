#include <iostream>
#include <string>
#include <vector>
using namespace std;

void StringSplit(const string& src, const string& delim, vector<string>& result) {
    size_t start = 0;
    size_t index = src.find_first_of(delim);
    while (index != string::npos) {
        if (index > start) {
            result.push_back(src.substr(start, index - start));
            start = index + 1;
            index = src.find_first_of(delim, start);
        }
    }

    if (start < src.length()) {
        result.push_back(src.substr(start));
    }
}

int main() {
    string str = "hello world";
    string delim = "aeiou";
    vector<string> result;
    StringSplit(str, delim, result);
    for (auto s : result) {
        cout << s << endl;
    }
}

