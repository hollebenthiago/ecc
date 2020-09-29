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

    this.getAllPoints = function() {
        let Ps = [];
        let squares = quadraticResidues(this.p);
        let residues = keys(squares);
        let j;
        for (let i = 0; i < p; i++) {
            j = ((i ** 3 + this.equation[0] * i + this.equation[1]) % this.p + p) % this.p;
            if (residues.includes(j)) {
                for (let t = 0; t < squares[j].length; t++) {
                    Ps.push({x:i, y:squares[j][t]})
                }
            }
        }
        return Ps
    }
}