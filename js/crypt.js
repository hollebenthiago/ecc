// curve used for cryptography
const E = new Curve(16777259, 3, 7);


// taking powers of huge integers
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

//encode message to point on elliptic curve
function koblitz_encode(curve, message) {
    let a = BigInt(curve.equation[0]);
    let b = BigInt(curve.equation[1]);
    let p = curve.p;
    // message = message.toString();
    let m = stringtoInt(message); 
    let d = 100;
    for (let j = 0; j < d; j++) {
        let x = BigInt((d * m + j) % p);
        let s = (x * x * x + a * x + b) % BigInt(p);
        console.log(j, x, s)
        if (s == power_mod(s, (p + 1)/2, p)) {
            let y = power_mod(s, (p + 1)/4, p)
            return new Point(parseInt(x), parseInt(y), 1, curve)
        }
    }
}

// decode point to message
function koblitz_decode(point) {
    let c = 2 ** 8;
    let d = 100;
    let lst = [];
    let m = parseInt(Math.floor((point.x/point.z)/d))
    while (m != 0) {
        lst.push(String.fromCharCode(m % c));
        m = Math.floor(m/c);
    }
    return lst.join('')
}