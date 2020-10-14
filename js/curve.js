// elliptic curve constructor
function Curve(p, a, b, bigNumbers = false) {
    
    this.bigNumbers = bigNumbers;
    if (!bigNumbers) {
        this.p = p;
        this.equation = [a,b];
        this.delta = 4 * a ** 3 + 27 * b ** 2;
    }
    
    else {
        this.p = BigInt(p);
        this.equation = [BigInt(a),BigInt(b)];
        this.delta = BigInt(4 * a ** 3 + 27 * b ** 2);
    }
    // checks if a certain point is on the curve
    this.includePoint = function(x, y, z) {
    
        if (!this.bigNumbers) {

            if (((z*y**2 - x**3 - z**2*this.equation[0]*x - z**3*this.equation[1]) % this.p == 0 || (z*y**2 - x**3 - z**2*this.equation[0]*x - z**3*this.equation[1] == 0)) && !this.bigNumbers) {
                return true
            }
        
            else {
                return false
            }
        }

        else {

            if ((BigInt(z)*BigInt(y)**BigInt(2) - BigInt(x)**BigInt(3) - BigInt(z)**BigInt(2)*this.equation[0]*BigInt(x) - BigInt(z)**BigInt(3)*this.equation[1]) % this.p == 0) {
                return true
            }

            else {
                return false
            }
    
        }
    }
    // brute force method to get all points in an elliptic curve
    this.getAllPoints = function() {
        let Ps = [];
        let squares = quadraticResidues(this.p);
        let residues = Object.keys(squares);
        let j;
        for (let i = 0; i < p; i++) {
            j = ((i ** 3 + this.equation[0] * i + this.equation[1]) % this.p + p) % this.p;
            if (residues.includes((j).toString())) {
                for (let t = 0; t < squares[j].length; t++) {
                    Ps.push({x:i, y:squares[j][t]})
                };
            };
        };
        return Ps
    }
}