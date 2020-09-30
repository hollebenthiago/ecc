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

  var multiple = min;
  range(min, max).forEach(function(n) {
      multiple = lcmSimple(multiple, n);
  });

  return multiple;
}