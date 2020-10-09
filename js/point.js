// elliptic curve point constructor
function Point(x, y, z,curve) {
    this.x = x;
    this.y = y;    
    this.z = z;
    if (this.x == 0 && this.y == 1 && this.z == 0) {
        this.identity = true;
    }
    else {
        this.identity = false;
    }
    this.curve = curve;
    // this.double = function() {
    //     if (this.y != 0) {
    //         let x3 = (((3 * this.x ** 2 + this.curve.equation[0]) * modInverse(2 * y, this.curve.p)) ** 2 - 2*x)  % this.curve.p;
    //         let y3 = (((3 * this.x ** 2 + this.curve.equation[0]) * modInverse(2 * y, this.curve.p)) * (this.x - x3) - this.y) % this.curve.p;
    //         this.x = x3;
    //         this.y = y3; 
    //     }
    // }
}