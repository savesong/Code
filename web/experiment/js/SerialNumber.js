var serialNumber = {
    $n: 0,

    get next() {
        return this.$n++;
    },

    set next(n) {
        if (n > this.$n) {
            this.$n = n;
        } else {
            throw "serial number can only be set to a larger value";
        }
    }
};
