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
        document.getElementById('resultPrimality').innerHTML = 'The number '.concat(p, ' is not prime! The Elliptic Curve \\( y^2 + x^3 + ', a, 'x + ', b,'\\) does not have a group structure. One factor was found: ', (arr[1]).toString());
    }

}

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


function findTorsion() {
    let a = parseFloat(document.getElementById('aParam').value);
    let b = parseFloat(document.getElementById('bParam').value);
    let E = new Curve(0, a, b);
    let tPoints = torsionPoints(E);
    console.log(tPoints, tPoints.length);
    if (tPoints.length == 1) {
        document.getElementById('resultTorsion').innerHTML = 'The only torsion point of the curve \\(y^2 = x^3 + '.concat(a, 'x + ', b, '\\) is the point at infinity [0: 1: 0]');
    }
    else {
        let textTorsion = 'The torsion points of the curve \\( y^2 = x^3 + '.concat(a, 'x + ', b, '\\) are :');
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