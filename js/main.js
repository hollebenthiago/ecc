E = new Curve(5, 3, 3);
Q = new Point(4, 3, 1, E);
A = new Point(-2, 2, 1, E);

let C;
let P;

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
    Q = mult(n, P);
    document.getElementById('result').innerHTML = 'The coordinates of '.concat((n).toString(), 'P' ,' are: [', (Q.x).toString(), ': ', (Q.y).toString(), ': ', (Q.z).toString(), ']')
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
    document.getElementById('result').innerHTML = 'The coordinates of '.concat((n).toString(), 'P' ,' are: [', (Q.x).toString(), ': ', (Q.y).toString(), ': ', (Q.z).toString(), ']')
}
