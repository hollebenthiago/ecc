let t  = 100;
function factor(n) {
    let factors = [];
    while (n > 1) {
        // console.log(factors);
        let  arrP = primality(n, t);
        if (arrP[0]) {
            // console.log('a', n)
            factors.push(n);
            return factors
        }
        else {
            let rechecking = primality(arrP[1], t);
            if (rechecking[0]) {
                n = n/arrP[1];
                factors.push(arrP[1]);
            }
            else {
                let subfactors = factor(rechecking[1]);
                // console.log('b', subfactors)
                factors = factors.concat(subfactors);
                let k = 1;
                for (let i = 0; i < subfactors.length; i++) {
                    k = k * subfactors[i];
                }
                n = n/k;
                // console.log(n,k );
            }
        }
    }
    return factors    
}

function checkingSquares(arr) {
    let a = [], b = [], c = [],prev;

    arr.sort();
    for (let i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    for (let j = 0; j < a.length; j++) {
        if (b[j]  >= 2) {
            c.push([a[j], b[j]])
        }
    }
    return c;
}

function perfectPrimeSquares(l, n) {
    let sols = [];
    for (let i = 0; i < l.length; i++) {
        for (let j = 1; j <= Math.floor(l[i][1]/2); j++) {
            sols.push(l[i][0]**j)
        }
    }
    let possiblePerfectFactors = combinations(sols);
    let perfectFactors = [];
    for(let i = 0; i < possiblePerfectFactors.length; i++) {
        if (n % possiblePerfectFactors[i] == 0) {
            perfectFactors.push(possiblePerfectFactors[i])
        }
    }
    perfectFactors.push(1);
    perfectFactors.push(0);
    return perfectFactors
}

function isTorsion(l) {
    let E = l[0].curve;
    let P;
    let torsion = [];
    for (let i = 0; i < l.length; i++) {
        for (let j = 1; j < 13; j++) {
            P = mult(j, l[i]);
            if (P.x == 0 && P.y == 1 && P.z == 0) {
                torsion.push(l[i])
                break
            }
        }
    }
    return torsion
}

function torsionPoints(curve) {
    let points = [];
    let n = curve.delta;
    let E = curve;
    let l = perfectPrimeSquares(checkingSquares(factor(n)), n);
    for (let i = 0; i < l.length; i++) {
        let y = l[i];
        let xs = CubicSolve(1, 0, E.equation[0], E.equation[1] - y**2);
        for (let j = 0; j < xs.length; j++) {
            let c = 0;
            let d = 0;
            for (let k = 0; k < points.length; k++) {
                if (!equal(new Point(xs[j], l[i], 1, E), points[k])) {
                    c++;
                }
                if (!equal(new Point(xs[j], -l[i], 1, E), points[k]) && l[i] != 0) {
                    d++;
                }
            }
            if (c == points.length) {
                points.push(new Point(xs[j],l[i], 1, E))
                d++
            }
            if (d == points.length && !equal(new Point(xs[j],-l[i], 1, E), new Point(xs[j],l[i], 1, E))) {
            points.push(new Point(xs[j],-l[i], 1, E))
            }
        }
    }
    points.push(new Point(0, 1, 0, E));
    return isTorsion(points)
}
