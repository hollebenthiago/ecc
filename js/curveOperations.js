function addPoints(p1, p2, allowAlert = true) {
    
    let lam = 0;
    let curve = p1.curve;
    p1.allowAlert = allowAlert;
    p2.allowAlert = allowAlert;
    console.log(p1.curve, p1);
    if (p1.identity == true) {
        return p2
    }
    
    else if (p2.identity == true) {
        return p1
    }

    else if ((p1.x - p2.x) % curve.p == 0 && (p1.y + p2.y) % curve.p == 0) {
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
        return new Point(xS, yS, 1, curve, allowAlert)
    }   
}

// function mult(n, p) {
//     if (n == 0) {
//         return new Point(0,1,0,p.curve)
//     }

//     if (n > 0) {
//         let binaryExpression = (n).toString(2);
//         let s = new Point(0, 1, 0, p.curve);
//         let q = new Point(p.x, p.y, p.z, p.curve);
//         for (let i = 0; i < binaryExpression.length; i++) {
//             if (binaryExpression[i] == "1") {
//                 s = addPoints(s, q, q.curve);
//             }
//             q = addPoints(q, q, q.curve);
//         }
//         return s
//     }

//     else {
//         n = -n;
//         let binaryExpression = (n).toString(2);
//         let s = new Point(0, 1, 0, p.curve);
//         let q = new Point(p.x, -p.y, p.z, p.curve);
//         for (let i = 0; i < binaryExpression.length; i++) {
//             if (binaryExpression[i] == "1") {
//                 s = addPoints(s, q, q.curve);
//             }
//             q = addPoints(q, q, q.curve);
//         }
//         return s
//     }
// }

function mult(n, p, allowAlert = true) {
    
    let s = new Point(0, 1, 0, p.curve);

    if (n == 0) {
        return s
    }

    else if (n > 0) {
        let q = new Point(p.x, p.y, p.z, p.curve, allowAlert = allowAlert);
        for (let i = 0; i < n; i++) {
            s = addPoints(s, q, allowAlert);
        }
        return s
    }

    else {
        let q = new Point(p.x -p.y, p.z, p.curve, allowAlert);
        n = -n;
        for (let i = 0; i < n; i++) {
            s = addPoints(s, q, allowAlert);
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