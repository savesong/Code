function Container(param) {
    // private field
    var secret = 2;
    var that = this;

    // private method
    function dec() {
        if (secret > 0) {
            secret -= 1;
            return true;
        } else {
            return false;
        }
    }

    // public instance field
    this.member = param;

    // public instance method (privileged?)
    this.service = function() {
        return dec() ? that.member : null;
    };
}

// public instance method
Container.prototype.stamp = function(string) {
    return this.member + string;
}

// static field
Container.count = 0;

// static method
Container.increase = function() {
    Container.count++;
}

var o1 = new Container("o1");
console.log(o1.service());
console.log(o1.service());
console.log(o1.service());
console.log(o1.service());
console.log(o1.stamp("xx"));
console.log(Container.count);
Container.increase();

