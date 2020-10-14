function addPoints(p1, p2, primeTesting = false) {
    
    let lam = 0;
    let curve = p1.curve;
    if (curve == undefined && primeTesting) {
        curve = p2.curve;
    }


    if (curve == undefined && primeTesting) {
        console.log(p1, p2)
        return new Point(p2.x - p1.x, 1, 1, curve)
    }
    if (p1.identity == true) {
        return p2
    }
    
    else if (p2.identity == true) {
        return p1
    }

    let bigNumbers = p1.curve.bigNumbers;

    // if the numbers are not that big
    if (curve.p != 0 && !bigNumbers) {
        if ((p1.x - p2.x) % curve.p == 0 && (p1.y + p2.y) % curve.p == 0) {
            return new Point(0, 1, 0, curve)
        }
        
        else {
            if (p1.x == p2.x) {
                lam = (3 * (p1.x)**2 + curve.equation[0]) * modInverse(2* p1.y, curve.p);
            }
            else {
                lam = (p2.y - p1.y) * modInverse(p2.x - p1.x, curve.p);
            }
    
            let xS = ((lam ** 2 - p1.x - p2.x) % curve.p + curve.p ) % curve.p;
            let yS = ((lam * (p1.x - xS) - p1.y) % curve.p + curve.p ) % curve.p;
            return new Point(xS, yS, 1, curve)
        }
    }

    else if (curve.p == 0 && !bigNumbers) {
        if (p1.x - p2.x == 0 && p1.y + p2.y == 0) {
            return new Point(0, 1, 0, curve)
        }
        
        else {
            if (p1.x == p2.x) {
                lam = (3 * (p1.x)**2 + curve.equation[0])/(2* p1.y);
            }
            else {
                lam = (p2.y - p1.y)/(p2.x - p1.x);
            }
    
            let xS = ((lam ** 2 - p1.x - p2.x));
            let yS = ((lam * (p1.x - xS) - p1.y));
            return new Point(xS, yS, 1, curve)
        }
    }
    
    // if the numbers are really big
    if (curve.p != 0 && bigNumbers) {
        if ((p1.x - p2.x) % curve.p == BigInt(0) && (p1.y + p2.y) % curve.p == BigInt(0)) {
            return new Point(BigInt(0), BigInt(1), BigInt(0), curve)
        }
        
        else {
            if (p1.x == p2.x) {
                lam = (BigInt(3) * (p1.x)**BigInt(2) + curve.equation[0]) * BigInt(modInverse(BigInt(2)* p1.y, curve.p));
            }
            else {
                lam = (p2.y - p1.y) * BigInt(modInverse(p2.x - p1.x, curve.p));
            }
    
            let xS = ((lam ** BigInt(2) - p1.x - p2.x) % curve.p + curve.p ) % curve.p;
            let yS = ((lam * (p1.x - xS) - p1.y) % curve.p + curve.p ) % curve.p;
            return new Point(xS, yS, BigInt(1), curve)
        }
    }

    else if (curve.p == 0 && bigNumbers) {
        if (p1.x - p2.x == 0 && p1.y + p2.y == 0) {
            return new Point(0, 1, 0, curve)
        }
        
        else {
            if (p1.x == p2.x) {
                lam = (3 * (p1.x)**2 + curve.equation[0])/(2* p1.y);
            }
            else {
                lam = (p2.y - p1.y)/(p2.x - p1.x);
            }
    
            let xS = ((lam ** 2 - p1.x - p2.x));
            let yS = ((lam * (p1.x - xS) - p1.y));
            return new Point(xS, yS, 1, curve)
        }
    }
}

function mult(n, p) {
    
    let s = new Point(0, 1, 0, p.curve);

    if (n == 0) {
        return s
    }

    else if (n > 0) {
        let q = new Point(p.x, p.y, p.z, p.curve);
        for (let i = 0; i < n; i++) {
            s = addPoints(s, q);
        }
        return s
    }

    else {
        let q = new Point(p.x -p.y, p.z, p.curve);
        n = -n;
        for (let i = 0; i < n; i++) {
            s = addPoints(s, q);
        }
        return s
    }
}


function equal(p1, p2) {
    
    if (p1.x == p2.x && p1.y == p2.y && p1.z == p2.z && p1.curve == p2.curve) {
        return true
    }

    else {
        return false
    }
}