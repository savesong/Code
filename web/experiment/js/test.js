//console.log('in test.js');

// Interview Question 1
function repeat(func, times, wait) {
    return function(content) {
        for (var i = 0; i < times; ++i) {
            setTimeout(
                function() {
                    alert(content);
                }, wait * (i + 1));
        }
    }
}

//var repeatedFun = repeat(alert, 10, 5000);
//repeatedFun ("hellworld");

// Interview Question 2
function stringconcat() {
    var result = '';
    for (var i = 0; i < arguments.length; i++) {
        if (i === 0) {
            result += arguments[i];
        } else {
            result += '+' + arguments[i];
        }
    }
    return result;
}

stringconcat.prefix = function(pre) {
    return function() {
        var result = pre;
        for (var i = 0; i < arguments.length; i++) {
            result += '+' + arguments[i];
        }
        return result;
    };
}

var result1 = stringconcat("a", "b");
var result2 = stringconcat("c", "d");
var stringconcatWithPrefix = stringconcat.prefix("hellworld");
var result3 = stringconcatWithPrefix("a", "b");
var stringconcatWithPrefix1 = stringconcat.prefix("hellworld1");
var result4 = stringconcatWithPrefix1("c", "d");
//console.log(result1);
//console.log(result2);
//console.log(result3);
//console.log(result4);

var i=9;
function fo(){
    var i=0;
    return function(n){
        return n+i++;
    }
};

var f=fo();
var a = f(15);
var b = fo()(15);
var c = fo()(20);
var d = f(20);
//console.log(a);
//console.log(b);
//console.log(c);
//console.log(d);


$('.search').css('color', 'red');
$('.search').css('cursor', 'pointer');
$('.search').click(function() {
    alert(123);
});


function spacify(str) {
    return str.split('').join(' ');
}

//console.log(spacify('abc'));
//console.log(spacify('hello world'));

//console.log(functionOne);         // > undefined
//console.log(functionOne());         // > Uncaught TypeError
var functionOne = function() {
    return 111;
}

//console.log(functionTwo);
//console.log(functionTwo());
function functionTwo() {
    return 222;
}

var User = {
  count: 1,

  getCount: function() {
    return this.count;
  }
};
console.log(User.getCount());
var func = User.getCount;
console.log(func());
