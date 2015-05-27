var makeCounter = function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }  
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
alert(Counter1.value()); /* 提示 0 */
Counter1.increment();
Counter1.increment();
alert(Counter1.value()); /* 提示 2 */
Counter1.decrement();
alert(Counter1.value()); /* 提示 1 */
alert(Counter2.value()); /* 提示 0 */
