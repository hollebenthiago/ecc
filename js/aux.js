//inverse of a mod m
function modInverse(a, m) {
    // validate inputs
    [a, m] = [Number(a), Number(m)]
    if (Number.isNaN(a) || Number.isNaN(m)) {
      return NaN // invalid input
    }
    a = (a % m + m) % m
    if (!a || m < 2) {
      return NaN // invalid input
    }
    // find the gcd
    const s = []
    let b = m
    while(b) {
      [a, b] = [b, a % b]
      s.push({a, b})
    }
    if (a !== 1) {
      return NaN // inverse does not exists
    }
    // find the inverse
    let x = 1
    let y = 0
    for(let i = s.length - 2; i >= 0; --i) {
      [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
    }
    return (y % m + m) % m
}
//find quadratic residues mod p
function quadraticResidues(p) {
	let squares = {};
	for (let i = 0; i < p; i++) {
		if (squares[(i*i % p).toString()]) {
			squares[(i*i % p).toString()].push(i)
		}
		else {
			squares[(i*i % p).toString()] = [i];
		}
	}
	return squares
}
// gcd of two numbers
function gcd(a, b) {
  return !b ? a : gcd(b, a % b);
}
// lcm of (min, min + 1,..., max)
function lcm(min, max) {
  function range(min, max) {
      let arr = [];
      for (let i = min; i <= max; i++) {
          arr.push(i);
      }
      return arr;
  }

  function gcd(a, b) {
      return !b ? a : gcd(b, a % b);
  }

  function lcmSimple(a, b) {
      return (a * b) / gcd(a, b);   
  }

  let multiple = min;
  range(min, max).forEach(function(n) {
      multiple = lcmSimple(multiple, n);
  });

  return multiple;
}

function combinations(arr){
  if (arr.length <= 1) return arr;
  else {
  	subarr = combinations(arr.slice(1));
  	return subarr.concat(subarr.map(e => e * arr[0]), arr[0]);
  }
}

//round a number to nearest integer
function round(v) {
  return Math.sign(v) * Math.round(Math.abs(v))
}

// solve cubic equation in one variable
function CubicSolve(a, b, c, d){

  b /= a;
  c /= a;
  d /= a;

  let discrim, q, r, dum1, s, t, term1, r13;

  q = (3.0*c - (b*b))/9.0;
  r = -(27.0*d) + b*(9.0*c - 2.0*(b*b));
  r /= 54.0;

  discrim = q*q*q + r*r;
  
  let roots = [ {real: 0, i: 0}, {real: 0, i: 0}, {real: 0, i: 0} ]
  
  term1 = (b/3.0);

  let intRoots = [];

  if (discrim > 0) { // one root real, two are complex
	s = r + Math.sqrt(discrim);
	s = ((s < 0) ? -Math.pow(-s, (1.0/3.0)) : Math.pow(s, (1.0/3.0)));
	t = r - Math.sqrt(discrim);
	t = ((t < 0) ? -Math.pow(-t, (1.0/3.0)) : Math.pow(t, (1.0/3.0)));

	roots[0].real = -term1 + s + t;
	term1 += (s + t)/2.0;
	roots[2].real = roots[2].real = -term1;
	term1 = Math.sqrt(3.0)*(-t + s)/2;

	roots[1].i = term1;
	roots[2].i = -term1;
	if (Math.abs(round(roots[0].real) - roots[0].real) < 1e-15) {
		intRoots.push(round(roots[0].real));
	}
	return intRoots
  } // End if (discrim > 0)

  // The remaining options are all real
  

  if (discrim == 0){ // All roots real, at least two are equal.
   r13 = ((r < 0) ? -Math.pow(-r,(1.0/3.0)) : Math.pow(r,(1.0/3.0)));
   roots[0].real = -term1 + 2.0*r13;
   roots[2].real = roots[1].real = -(r13 + term1);
   for (let i = 0; i < roots.length; i++) {
		if (Math.abs(round(roots[i].real) - roots[i].real) < 1e-15) {
			intRoots.push(round(roots[i].real))
		}
   }
   return intRoots;
  } // End if (discrim == 0)

  // Only option left is that all roots are real and unequal (to get here, q < 0)
  else {
	q = -q;
	dum1 = q*q*q;
	dum1 = Math.acos(r/Math.sqrt(dum1));
	r13 = 2.0*Math.sqrt(q);

	roots[0].real = -term1 + r13*Math.cos(dum1/3.0);
	roots[1].real = -term1 + r13*Math.cos((dum1 + 2.0*Math.PI)/3.0);
	roots[2].real = -term1 + r13*Math.cos((dum1 + 4.0*Math.PI)/3.0);
	for (let i = 0; i < roots.length; i++) {
		if (Math.abs(round(roots[i].real) - roots[i].real) < 1e-15) {
			intRoots.push(round(roots[i].real))
			}
  		}
	return intRoots;
	}
}

function isNotNaN(x) {
	return !isNaN(x)
}
