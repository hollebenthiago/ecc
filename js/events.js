// multiplication by scalar
function multiplication() {
    let p = parseInt(document.getElementById('prime').value);
    let a = parseInt(document.getElementById('aParam').value);
    let b = parseInt(document.getElementById('bParam').value);
    let x1 = parseInt(document.getElementById('xcoord1').value);
    let y1 = parseInt(document.getElementById('ycoord1').value);
    let z1 = parseInt(document.getElementById('zcoord1').value);
    let n = parseInt(document.getElementById('n').value);
    C = new Curve(p, a, b);
    P = new Point(x1,y1,z1,C);
    if (C.includePoint(P.x, P.y, P.z)) {
        Q = mult(n, P);
        document.getElementById('resultMultiplication').innerHTML = 'The coordinates of '.concat((n).toString(), 'P' ,' are: [', (Q.x).toString(), ': ', (Q.y).toString(), ': ', (Q.z).toString(), ']')
    }
    else {
        document.getElementById('resultMultiplication').innerHTML = 'The point P has to be on the curve'
    }
}
// addition
function addition() {
    let p = parseInt(document.getElementById('prime').value);
    let a = parseInt(document.getElementById('aParam').value);
    let b = parseInt(document.getElementById('bParam').value);
    let x1 = parseInt(document.getElementById('xcoord1').value);
    let y1 = parseInt(document.getElementById('ycoord1').value);
    let z1 = parseInt(document.getElementById('zcoord1').value);
    let x2 = parseInt(document.getElementById('xcoord2').value);
    let y2 = parseInt(document.getElementById('ycoord2').value);
    let z2 = parseInt(document.getElementById('zcoord2').value);
    C = new Curve(p, a, b);
    P = new Point(x1,y1,z1,C);
    Q = new Point(x2,y2,z2,C);
    R = addPoints(P, Q);
    if (C.includePoint(P.x, P.y, P.z) && C.includePoint(Q.x, Q.y, Q.z)) {
        document.getElementById('resultAddition').innerHTML = 'The coordinates of '.concat( 'P + Q' ,' are: [', (R.x).toString(), ': ', (R.y).toString(), ': ', (R.z).toString(), ']')
    }
    else {
        document.getElementById('resultAddition').innerHTML = 'Both points have to be on the curve'
    }
}
// plot rational points
function plotPoints() {
    let p = parseInt(document.getElementById('prime').value);
    let a = parseInt(document.getElementById('aParam').value);
    let b = parseInt(document.getElementById('bParam').value);
    C = new Curve(p, a, b);
    let Ps = C.getAllPoints();
    
    plotEC = document.getElementById('plotEC').getContext('2d');
    if (scatterChart) {
        scatterChart.destroy();
    }
    scatterChart = new Chart(plotEC, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Rational points',
                pointBackgroundColor: 'blue',
                data: Ps
            }]
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        min: 0,
                        max: p,
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: p,
                    }
                }]
            }
        }
    })
}
// primality test
function primalityTest() {
    let p = parseInt(document.getElementById('prime').value);
    let n = parseInt(document.getElementById('n').value);
    let arr = primality(p, n);
    if (arr[0]) {
        document.getElementById('resultPrimality').innerHTML = (arr[1]).toString().concat(' curves were tested, but no factor was found'); 
    }
    else {
        let a = arr[2].equation[0];
        let b = arr[2].equation[1];
        document.getElementById('resultPrimality').innerHTML = 'The number '.concat(p, ' is not prime! The Elliptic Curve  y² = x³ + ', a, 'x + ', b,' does not have a group structure. One factor was found: ', (arr[1]).toString());
    }

}
// plot distribution of elliptic curves by their group order
function plotDistribution() {
    let p = parseInt(document.getElementById('prime').value);
    let arr = distribution(p);
    plot_distEC = document.getElementById('plot_dist').getContext('2d');
    if (distChart) {
        distChart.destroy();
    }
    distChart = new Chart(plot_distEC, {
        type: 'bar',
        data: {
            labels: arr[0],
            datasets: [
                {
                    label: "Number of Elliptic Curves",
                    backgroundColor: '#3498db',
                    data: arr[1]
                }
            ]
    },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Rational Points'
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Elliptic Curves'
                    }
                }]
            }
            
        }
    })
}

// find torsion points of elliptic curves over the rationals
function findTorsion() {
    let a = parseFloat(document.getElementById('aParam').value);
    let b = parseFloat(document.getElementById('bParam').value);
    let E = new Curve(0, a, b);
    let tPoints = torsionPoints(E);
    console.log(tPoints, tPoints.length);
    if (tPoints.length == 1) {
        document.getElementById('resultTorsion').innerHTML = 'The only torsion point of the curve y² = x³ + '.concat(a, 'x + ', b, ' is the point at infinity [0: 1: 0]');
    }
    else {
        let textTorsion = 'The torsion points of the curve  y² = x³ + '.concat(a, 'x + ', b, ' are :');
        for (let i = 0; i < tPoints.length; i++) {
            if (i == tPoints.length - 1) {
                textTorsion = textTorsion.concat(' and [', tPoints[i].x, ': ', tPoints[i].y, ': ', tPoints[i].z, ']')
            }
            else if (i == 0) {
                textTorsion = textTorsion.concat(' [', tPoints[i].x, ': ', tPoints[i].y, ': ', tPoints[i].z, ']');
            }
            else {
                textTorsion = textTorsion.concat(', [', tPoints[i].x, ': ', tPoints[i].y, ': ', tPoints[i].z, ']');
            }
        }
        document.getElementById('resultTorsion').innerHTML = textTorsion;
    }

}

function generateKeys() {
    let ks = keys(E);
    document.getElementById('resultKeysPrivate').innerHTML = 'Your private key is : '.concat(ks[0])
    document.getElementById('resultKeysPublic').innerHTML = 'Your public key is : '.concat(ks[1], 'P = ','[', 00, ', ', 00 , ', ', 1, ']')
}

function generateRandomPoint() {
    let P = getRandomPoint(E);
    document.getElementById('resultBasePoint').innerHTML = 'The base point is : '.concat('P = ','[', P.x, ', ', P.y , ', ', P.z, ']')
}


function encryptMessage() {
    let M = document.getElementById('message').value;
    let MP = koblitz_encode(E, M);
    document.getElementById('resultEncrypt').innerHTML = 'The point corresponding to your message is: '.concat('[', MP.x, ', ',MP.y, ', ', MP.z, ']')
}

function decryptMessage() {
    let x = document.getElementById('pointx').value;
    let y = document.getElementById('pointy').value;
    let z = document.getElementById('pointz').value;
    let M = koblitz_decode(new Point(x,y,z,E));
    document.getElementById('resultDecrypt').innerHTML = 'The message corresponding to the point is: '.concat(M)
}