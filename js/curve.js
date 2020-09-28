function Curve(p, a, b) {
    
    this.p = p;
    this.equation = [a,b];
    
    this.includePoint = function(x, y, z) {
    
        if ((z*y**2 - z*x**3 - z**2*this.equation[0]*x - z**3*this.equation[1]) % this.p == 0) {
            return true
        }
    
        else {
            return false
        }
    }
}