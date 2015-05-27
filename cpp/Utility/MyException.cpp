#include <iostream>
#include <exception>

struct MyException : std::exception
{
    virtual const char* what() const noexcept
    {
        return "Invalid input!";
    }
};

int main()
{
    try {
        throw MyException();
    } catch (std::exception& e) {
        std::cout << e.what() << std::endl;
    }
    
    return 0;
}

