let C;
let P;

let plotEC;
let plot_distEC;

let scatterChart;
let distChart;


function randomCurve(p) {
    let a = Math.floor(Math.random() * p);
    let x = Math.floor(Math.random() * p);
    let y = Math.floor(Math.random() * p);
    let b = (((y ** 2 - x ** 3 - a * x) % p + p) % p);
    let E = new Curve(p, a, b);
    let P = new Point(x, y, 1, E, false);
    return [E, P]
}

function setLimits(p) {
    let B = Math.floor((p + 1 + Math.ceil(2 * p)) ** 0.5);
    let k = lcm(1, B);
  return [B, k]  
}

function primality(p, n) {
    let k = setLimits(p)[1];
    console.log(k);
    for (let i = 0; i < n; i++) {
        let arr = randomCurve(p);
        let E = arr[0];
        let P = arr[1];
        let O = new Point(0,1,0, E); 
        // console.log(E);
        for (let j = 1; j < k; j++) {
            if (isNaN(addPoints(O, P, false).x) || isNaN(addPoints(O, P, false).y)) {
                if (O.x - P.x == 0 ) {
                    return [false, gcd(2 * O.y, p), E]
                }
                else {
                    return [false, gcd(((O.x - P.x) % p + p) % p, p), E]
                }
            }
            else {
                O = addPoints(P, O, false);
            }
        }
    //    console.log(isPrime);
    }
    return [true, n]
}

function distribution(curve) {
    let p = curve.p;
    let xs = [];
    let ys = [];
    for(let i = p + 1 - Math.floor(2 * p ** 0.5); i <= p + 1 + Math.floor(2 * p ** 0.5); i++) {
        xs.push(i);
        ys.push(0);
    }
    for(let j = 0; j < p; j++) {
        for(let k = 0; k < p; k++) {
            let C = new Curve(p, j, k);
            let n = C.getAllPoints().length + 1;
            ys[xs.indexOf(n)]++;
        }
    }
    let data = [];
    for(let t = 0; t < xs.length; t++) {
        let x = xs[t];
        let y = ys[t];
        data.push({x:y})
    }
    return data
}