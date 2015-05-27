#include <iostream>
using namespace std;

bool g_InvalidInput = false;
long long StrToInt(const char* str)
{
    g_InvalidInput = false;

    if (NULL == str || strlen(str) <= 0) {
        g_InvalidInput = true;
        return 0;
    }

    while (isspace(*str)) {
        ++str;
    }

    bool negative = false;
    if (*str == '+' || *str == '-') {
        if (*str == '-') {
            negative = true;
        }
        ++str;
    }

    long long result = 0;
    while (*str != '\0') {
        if (isdigit(*str)) {
            result = result * 10 + (*str - '0');

            if ((!negative && result > INT_MAX)
                    || (negative && -result < INT_MIN)) {
                g_InvalidInput = true;
                return 0;
            }

            ++str;
        } else {
            break;
        }
    }

    if (negative) {
        result = -result;
    }

    return result;
}

int main()
{
    cout << StrToInt("  123")  << ", " << g_InvalidInput << endl;
    cout << StrToInt("-123") << ", " << g_InvalidInput << endl;
    cout << StrToInt("+123") << ", " << g_InvalidInput << endl;
    cout << StrToInt("123") << ", " << g_InvalidInput << endl;
    cout << StrToInt("2147483647") << ", " << g_InvalidInput << endl;
    cout << StrToInt("-2147483648") << ", " << g_InvalidInput << endl;
    cout << StrToInt("123.45") << ", " << g_InvalidInput << endl;
    cout << StrToInt("12xxx") << ", " << g_InvalidInput << endl;
    cout << endl;

    cout << StrToInt("") << ", " << g_InvalidInput << endl;
    cout << StrToInt("2147483648") << ", " << g_InvalidInput << endl;
    cout << StrToInt("-2147483649") << ", " << g_InvalidInput << endl;

    return 0;
}

