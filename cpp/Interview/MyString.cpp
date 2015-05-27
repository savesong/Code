#include <iostream>
#include <string>
using namespace std;
 
class MyString
{
 public:
  MyString(const char* str = nullptr)
  {
    if (nullptr == str) {
        m_data = new char[1];
        *m_data = '\0';
    } else {
        m_data = new char[strlen(str) + 1];
        strcpy(m_data, str);
    }
  }
 
  /*
  MyString(const MyString& rhs)
    : m_data(new char[strlen(rhs.m_data) + 1])
  {
    strcpy(m_data, rhs.m_data);
  }
  */

  // Delegate constructor in C++11
  MyString(const MyString& rhs)
    : MyString(rhs.m_data)
  {
  }
 
  ~MyString()
  {
    delete[] m_data;
  }
 
  // Traditional
  MyString& operator=(const MyString& rhs)
  {
    MyString tmp(rhs);
    swap(tmp);
    return *this;
  }

  // move constructor in C++11
  MyString(MyString&& rhs)
    : m_data(rhs.m_data)
  {
    rhs.m_data = nullptr;
  }
 
  // move assignment in C++11
  MyString& operator=(MyString&& rhs)
  {
    swap(rhs);
    return *this;
  }
 
  /* Effective C++, Item 11
  // Note: assignment operator is both the move- and move-assignment operator in C++11
  MyString& operator=(MyString rhs) // yes, pass-by-value
  {
    swap(rhs);
    return *this;
  }
  */
 
  friend const MyString operator+(const MyString& lhs, const MyString& rhs)
  {
      MyString newStr;
      if(nullptr == lhs.m_data) {
          newStr.m_data = rhs.m_data;
      } else if(nullptr == rhs.m_data) {
          newStr.m_data = lhs.m_data;
      } else {
          newStr.m_data = new char[strlen(lhs.m_data) + strlen(rhs.m_data) + 1];
          strcpy(newStr.m_data, lhs.m_data);
          strcat(newStr.m_data, rhs.m_data);
      }
      return newStr;
  }

  // Accessors
  size_t size() const
  {
    return strlen(m_data);
  }
 
  void swap(MyString& rhs)
  {
    std::swap(m_data, rhs.m_data);
  }

  friend ostream& operator<<(ostream& os, const MyString& str)
  {
      os << str.m_data;
      return os;
  }
 
 private:
  char* m_data;
};

int main()
{
    MyString str1;
    cout << str1.size() << endl;

    MyString str2("hello");
    cout << str2 << endl;

    MyString str3(nullptr);
    cout << str3.size() << endl;
    
    MyString str4("world");
    cout << str2 + " " + str4 << endl;

    return 0;
}
