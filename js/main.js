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
    console.log(P)
    Q = mult(n, P)
    console.log(p,a,b,x1,y1,z1,n);
    console.log(C);
    console.log(P);
    console.log(Q);
    // alert('The coordinates of '.concat((n).toString(), 'P' ,' are: ', (Q.x).toString(), ', ', (Q.y).toString(), ', ', (Q.z).toString()))
    document.getElementById('result').innerHTML = 'The coordinates of '.concat((n).toString(), 'P' ,' are: [', (Q.x).toString(), ': ', (Q.y).toString(), ': ', (Q.z).toString(), ']')
}