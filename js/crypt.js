

// taking powers of huge integer s
function power_mod(x, n, p, big_numbers = true) {
    if (big_numbers) {
        let  q = BigInt(1);
        while (n > 0) {
            q *= BigInt(x);

            q %= BigInt(p);
            n--;
        }
        return q
    }
    else {
        let  q = 1;
        while (n > 0) {
            q *= x;

            q %= p;
            n--;
        }
        return q
    }
}

// convert string to ascii integer
function stringtoInt(message) {
    let c = 2 ** 8;
    let n = message.length;
    let message_num = 0;
    for (let i = 0; i < n; i++) {
        message_num += message.charCodeAt(i) * c ** i
    }
    return message_num
}

// generate keys
// might add more curves later
function keys(curve) {
    let a = Math.floor(Math.random() * limit);
    while (gcd(a, cardinality) != 1) {
        a = Math.floor(Math.random() * limit);
    }
    return [a, mult(a, basePoint)]
}

//encode message to point on elliptic curve
function koblitz_encode(curve, message) {
    let a = BigInt(curve.equation[0]);
    let b = BigInt(curve.equation[1]);
    let p = curve.p;
    // message = message.toString();
    let m = BigInt(stringtoInt(message)); 
    let d = BigInt(100);
    for (let j = 0; j < d; j++) {
        let x = BigInt((d * m + BigInt(j)) % p);
        let s = (x * x * x + a * x + b) % BigInt(p);
        console.log(j, x, s)
        if (s == power_mod(s, BigInt((parseInt(p) + 1)/2), p)) {
            let y = power_mod(s, BigInt((parseInt(p) + 1)/4), p)
            return new Point(x, y, 1, curve)
        }
    }
}

// decode point to message
function koblitz_decode(point) {
    let x = parseInt(point.x);
    let y = parseInt(point.y);
    let z = parseInt(point.z);
    let c = 2 ** 8;
    let d = 100;
    let lst = [];
    let m = parseInt(Math.floor((x/z)/d))
    while (m != 0) {
        lst.push(String.fromCharCode(m % c));
        m = Math.floor(m/c);
    }
    return lst.join('')
}


function format(s) {
    h = s.split('~');
    h0 = h[0].split(':');
    h2 = h[1].split('|');
    h1 = [];
    n = h2.length;
    for (let i = 0; i < n; i ++) {
        h1.push(h2[i].split(':'))
    }

    for (let i = 0; i < 3; i ++) { 
        h0[i] = BigInt(h0[i])
    }
    console.log(h0, h1);
    for (let i = 0; i < h1.length; i ++) {
        for (let j = 0; j < 3; j ++) {
            h1[i][j] = BigInt(h1[i][j])
        }
    }
    return [h0, h1]
}

