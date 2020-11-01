

# This file was *autogenerated* from the file functions.sage
from sage.all_cmdline import *   # import sage library

_sage_const_256 = Integer(256); _sage_const_0 = Integer(0); _sage_const_1 = Integer(1); _sage_const_2 = Integer(2); _sage_const_8 = Integer(8); _sage_const_100 = Integer(100); _sage_const_64 = Integer(64); _sage_const_3 = Integer(3); _sage_const_4 = Integer(4)# Converts integer n to base b

p = 2 ** 521 - 1
# proof.arithmetic(False)
F = GF(p)
A = p-3
B = 1093849038073734274511112390766805569936207598951683748994586394495953116150735016013708737573759623248592132296706313309438452531591012912142327488478985984
E = EllipticCurve([F(A), F(B)])
q = E.cardinality()

def convert_base(n, b = _sage_const_256 ):
    
    lst = []
    while n > _sage_const_0 :
        lst.append(n % b)
        n = n // b

    return lst

# Generates a random base point on the elliptic curve E
def base_point(E):
    P = E.random_point()
    q = E.cardinality()
    while P.order() != q:
        P = E.random_point()
        print(P)
    return P

# Generates a pair of keys (Public and Private)
def generate_keys(E, P):
    a = ZZ.random_element(q)
    while gcd(a, q) != _sage_const_1 :
        a = ZZ.random_element(q)
    return [a, a * P]

# Turns a string into a point on the elliptic curve E
def stringPoint_encode(E, string, verbose = False):
    A = E.a4()
    B = E.a6()
    p = E.base_field().cardinality()
    b = _sage_const_2  ** _sage_const_8 
    msg = str(string)
    n = len(msg)
    d = _sage_const_100 
    pts = []
    for t in range(n // _sage_const_64  + _sage_const_1 ):
        if verbose:
            print(t, ' de ', n // _sage_const_64  + _sage_const_1)
        m_current = msg[_sage_const_64  * t : _sage_const_64  * (t + _sage_const_1 )]
        m = sum(ord(m_current[k]) * b**k for k in range(min(len(m_current), _sage_const_64 )))
        for j in range(d):
            x = (d * m + j) % p
            s = (x**_sage_const_3  + A * x + B) % p
            if s == power_mod(s, int((p+_sage_const_1 )/_sage_const_2 ), p):
                y = power_mod(s, int((p+_sage_const_1 )/_sage_const_4 ), p)
                pts.append(E([x,y]))
                break
    return pts

# Reverse operation of the previous function
def pointString_decode(lst_P, verbose = False):
    b = _sage_const_2  ** _sage_const_8 
    d = _sage_const_100 
    lst = []
    for P in lst_P:
        if verbose:
            print(lst_P.index(P), ' de ', len(lst_P))
        m = int((floor((P[_sage_const_0 ]/P[_sage_const_2 ])))/d)
        while m != _sage_const_0 :
            lst.append(chr(m % b))
            m //= b
            m = int(m)
    return ''.join(lst)

# Encodes a message (string) with given keys
def encode(E, P, msg, privateKey_sender, publicKey_sender, publicKey_reciever, verbose = False):
    PM = stringPoint_encode(E, msg, verbose)
    enc_msg = []
    for Q in PM:
        if verbose:
            print(PM.index(Q), ' de ', len(PM))
        k = ZZ.random_element(q)
        kP = k *  publicKey_sender
        enc_msg.append([kP, Q + k * privateKey_sender * publicKey_reciever])
#     enc_msg = [kP, PM + k * privateKey_sender * publicKey_reciever]
    return enc_msg


# Decrypts a message (string) with given keys
def decode(E, P, enc_msg, publicKey_sender, privateKey_reciever, verbose = False):
    lst_P = []
    for e_msg in enc_msg:
        if verbose:
            print(enc_msg.index(e_msg), ' de ', len(enc_msg))
        kP = privateKey_reciever * e_msg[_sage_const_0 ]
        PM = e_msg[_sage_const_1 ] - kP
        lst_P.append(PM)
    dec_msg = pointString_decode(lst_P, verbose)
    return dec_msg


# Turns a list into a point on an elliptic curve E
def listPoint_encode(E, lst, verbose = False):
    A = E.a4()
    B = E.a6()
    p = E.base_field().cardinality()
    b = _sage_const_2  ** _sage_const_8 
    n = len(lst)
    d = _sage_const_100 
    pts = []
    for t in range(n // _sage_const_64  + _sage_const_1 ):
        if verbose:
            print(t, ' de ', n // _sage_const_64  + _sage_const_1)
        m_current = lst[_sage_const_64  * t : _sage_const_64  * (t + _sage_const_1 )]
        m = sum(m_current[k] * b ** k for k in range(min(len(m_current), _sage_const_64 )))
        for j in range(d):
            x = (d * m + j) % p
            s = (x**_sage_const_3  + A * x + B) % p
            if s == power_mod(s, int((p+_sage_const_1 )/_sage_const_2 ), p):
                y = power_mod(s, int((p+_sage_const_1 )/_sage_const_4 ), p)
                pts.append([E([x,y]), min(len(m_current), _sage_const_64 )])
                break
    return pts

# Reverse operation of the previous function
def pointList_decode(lst_P, verbose = False):
    b = _sage_const_2  ** _sage_const_8 
    d = _sage_const_100 
    lst = []
    for P in lst_P:
        if verbose:
            print(lst_P.index(P), ' de ', len(lst_P))
        temp_lst = []
        m = int((floor((P[_sage_const_0 ][_sage_const_0 ]/P[_sage_const_0 ][_sage_const_2 ])))/d)
        while m != _sage_const_0 :
            temp_lst.append(m % b)
            m //= b
            m = int(m)
        while len(temp_lst) < P[_sage_const_1 ]:
            temp_lst.append(_sage_const_0 )
        lst += temp_lst
    return lst

# Turns an image into a point on an elliptic curve E
def imagePoint_encode(E, img, verbose = False):
    pixels = img.getdata()
    red = [p[_sage_const_0 ] for p in pixels]
    green = [p[_sage_const_1 ] for p in pixels]
    blue = [p[_sage_const_2 ] for p in pixels]
    
    if verbose:
        print('encode red')    
    enc_red = listPoint_encode(E, red, verbose)
    if verbose:
        print('encode green')
    enc_green = listPoint_encode(E, green, verbose)
    if verbose:
        print('encode blue')
    enc_blue = listPoint_encode(E, blue, verbose)

    return [enc_red, enc_green, enc_blue]

# Reverse operation of the previous function
def pointImage_decode(lst_P, verbose = False):
    
    if verbose:
        print('decode red')    
    dec_red = pointList_decode(lst_P[_sage_const_0 ], verbose)
    if verbose:
        print('decode green')
    dec_green = pointList_decode(lst_P[_sage_const_1 ], verbose)
    if verbose:
        print('decode blue')
    dec_blue = pointList_decode(lst_P[_sage_const_2 ], verbose)
    
    return [(r, g, b) for (r, g, b) in zip(dec_red, dec_green, dec_blue)]

# Encrypts an image with given keys
def encodeImage(E, P, img, privateKey_sender, publicKey_sender, publicKey_reciever, verbose = False):
    PM = imagePoint_encode(E, img, verbose)
    enc_red = []
    enc_green = []
    enc_blue = []

    for i, e in enumerate([enc_red, enc_green, enc_blue]):
        for Q in PM[i]:
            if verbose:
                print(PM[i].index(Q), ' de ', len(PM[i]), '\  ', i)
            k = ZZ.random_element(q)
            kP = k *  publicKey_sender
            e.append([kP, Q[_sage_const_0 ] + k * privateKey_sender * publicKey_reciever, Q[_sage_const_1 ]])
    enc_img = [enc_red, enc_green, enc_blue]
    return enc_img

# Decrypts an image with given keys
def decodeImage(E, P, enc_img, publicKey_sender, privateKey_reciever, verbose = False):
    lst_P = []
    dec_red = []
    dec_green = []
    dec_blue = []
    for i, e in enumerate([dec_red, dec_green, dec_blue]):
        for e_dec in enc_img[i]:
            if verbose:
                print(enc_img[i].index(e_dec), ' de ', len(enc_img[i]), '\  ', i)
            kP = privateKey_reciever * e_dec[_sage_const_0 ]
            PM = e_dec[_sage_const_1 ] - kP
            e.append([PM, e_dec[_sage_const_2 ]])
    dec_img = pointImage_decode([dec_red, dec_green, dec_blue], verbose = False)
    return dec_img

