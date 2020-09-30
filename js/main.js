let C;
let P;

let plotEC;

let scatterChart;

function randomCurve(p) {
    let a = Math.floor(Math.random() * p);
    let x = Math.floor(Math.random() * p);
    let y = Math.floor(Math.random() * p);
    let b = (((y ** 2 - x ** 3 - a * x) % p + p) % p);
    let E = new Curve(p, a, b);
    let P = new Point(x, y, 1, E, false);
    return [E, P]
}

function setLimits(curve) {
    let p = curve.p;
    let B = Math.floor((p + 1 + Math.ceil(2 * p)) ** 0.5);
    let k = lcm(1, B);
  return [B, k]  
}

function primalityTest(p, n) {
    let isPrime = true;
    for (let i = 0; i < n; i++) {
        let arr = randomCurve(p);
        let E = arr[0];
        let P = arr[1];
        arr = setLimits(E);
        let k = setLimits(E)[1];
        let O = new Point(0,1,0, E); 
        // console.log(E);
        for (let j = 1; j < k; j++) {
            if (isNaN(addPoints(O, P, false).x) || isNaN(addPoints(O, P, false).y)) {
                isPrime = false;
                if (O.x - P.x == 0 ) {
                    return [gcd(2 * O.y, p), E]
                }
                else {
                    return [gcd(((O.x - P.x) % p + p) % p, p), E]
                }
            }
            else {
                O = addPoints(P, O, false);
            }
        }
       if (!isPrime) {
           alert('not a prime');
           break
       }
       console.log(isPrime);
    }
    return [true, n]
}

// function multiplication() {
//     let p = parseInt(document.getElementById('prime').value);
//     let a = parseInt(document.getElementById('aParam').value);
//     let b = parseInt(document.getElementById('bParam').value);
//     let x1 = parseInt(document.getElementById('xcoord1').value);
//     let y1 = parseInt(document.getElementById('ycoord1').value);
//     let z1 = parseInt(document.getElementById('zcoord1').value);
//     let n = parseInt(document.getElementById('n').value);
//     C = new Curve(p, a, b);
//     P = new Point(x1,y1,z1,C);
//     Q = mult(n, P);
//     document.getElementById('resultMultiplication').innerHTML = 'The coordinates of '.concat((n).toString(), 'P' ,' are: [', (Q.x).toString(), ': ', (Q.y).toString(), ': ', (Q.z).toString(), ']')
// }

// function addition() {
//     let p = parseInt(document.getElementById('prime').value);
//     let a = parseInt(document.getElementById('aParam').value);
//     let b = parseInt(document.getElementById('bParam').value);
//     let x1 = parseInt(document.getElementById('xcoord1').value);
//     let y1 = parseInt(document.getElementById('ycoord1').value);
//     let z1 = parseInt(document.getElementById('zcoord1').value);
//     let x2 = parseInt(document.getElementById('xcoord2').value);
//     let y2 = parseInt(document.getElementById('ycoord2').value);
//     let z2 = parseInt(document.getElementById('zcoord2').value);
//     C = new Curve(p, a, b);
//     P = new Point(x1,y1,z1,C);
//     Q = new Point(x2,y2,z2,C);
//     R = addPoints(P, Q);
//     document.getElementById('resultAddition').innerHTML = 'The coordinates of '.concat( 'P + Q' ,' are: [', (R.x).toString(), ': ', (R.y).toString(), ': ', (R.z).toString(), ']')
// }

// function plotPoints() {
//     let p = parseInt(document.getElementById('prime').value);
//     let a = parseInt(document.getElementById('aParam').value);
//     let b = parseInt(document.getElementById('bParam').value);
//     C = new Curve(p, a, b);
//     let Ps = C.getAllPoints();
    
//     plotEC = document.getElementById('plotEC').getContext('2d');
//     if (scatterChart) {
//         scatterChart.destroy();
//     }
//     scatterChart = new Chart(plotEC, {
//         type: 'scatter',
//         data: {
//             datasets: [{
//                 label: 'Rational points',
//                 pointBackgroundColor: 'blue',
//                 data: Ps
//             }]
//         },
//         options: {
//             legend: {
//                 display: false
//             },
//             scales: {
//                 xAxes: [{
//                     ticks: {
//                         min: 0,
//                         max: p,
//                     }
//                 }],
//                 yAxes: [{
//                     ticks: {
//                         min: 0,
//                         max: p,
//                     }
//                 }]
//             }
//         }
//     })
//     addData(scatterChart, 'Rational points', Ps);
// }
