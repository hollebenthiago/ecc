# # Converts integer n to base b
# def convert_base(n, b = 256):
    
#     lst = []
#     while n > 0:
#         lst.append(n % b)
#         n = n // b

#     return lst

# # Generates a random base point on the elliptic curve E
# def base_point(E):
#     P = E.random_point()
#     #q = E.cardinality()
#     while P.order() != q:
#         P = E.random_point()
#         print(P)
#     return P

# # Generates a pair of keys (Public and Private)
# def generate_keys(E, P):
#     a = ZZ.random_element(q)
#     while gcd(a, q) != 1:
#         a = ZZ.random_element(q)
#     return [a, a * P]

# # Turns a string into a point on the elliptic curve E
# def stringPoint_encode(E, string):
#     A = E.a4()
#     B = E.a6()
#     p = E.base_field().cardinality()
#     b = 2 ** 8
#     msg = str(string)
#     n = len(msg)
#     d = 100
#     pts = []
#     for t in range(n // 64 + 1):
#         m_current = msg[64 * t : 64 * (t + 1)]
#         m = sum(ord(m_current[k]) * b**k for k in range(min(len(m_current), 64)))
#         for j in range(d):
#             x = (d * m + j) % p
#             s = (x**3 + A * x + B) % p
#             if s == power_mod(s, int((p+1)/2), p):
#                 y = power_mod(s, int((p+1)/4), p)
#                 pts.append(E([x,y]))
#                 break
#     return pts

# # Reverse operation of the previous function
# def pointString_decode(lst_P):
#     b = 2 ** 8
#     d = 100
#     lst = []
#     for P in lst_P:
#         m = int((floor((P[0]/P[2])))/d)
#         while m != 0:
#             lst.append(chr(m % b))
#             m //= b
#             m = int(m)
#     return ''.join(lst)

# # Encodes a message (string) with given keys
# def encode(E, P, msg, privateKey_sender, publicKey_sender, publicKey_reciever):
#     PM = stringPoint_encode(E, msg)
#     enc_msg = []
#     for Q in PM:
#         k = ZZ.random_element(q)
#         kP = k *  publicKey_sender
#         enc_msg.append([kP, Q + k * privateKey_sender * publicKey_reciever])
# #     enc_msg = [kP, PM + k * privateKey_sender * publicKey_reciever]
#     return enc_msg


# # Decrypts a message (string) with given keys
# def decode(E, P, enc_msg, publicKey_sender, privateKey_reciever):
#     lst_P = []
#     for e_msg in enc_msg:
#         kP = privateKey_reciever * e_msg[0]
#         PM = e_msg[1] - kP
#         lst_P.append(PM)
#     dec_msg = pointString_decode(lst_P)
#     return dec_msg


# # Turns a list into a point on an elliptic curve E
# def listPoint_encode(E, lst):
#     A = E.a4()
#     B = E.a6()
#     p = E.base_field().cardinality()
#     b = 2 ** 8
#     n = len(lst)
#     d = 100
#     pts = []
#     for t in range(n // 64 + 1):
#         m_current = lst[64 * t : 64 * (t + 1)]
#         m = sum(m_current[k] * b ** k for k in range(min(len(m_current), 64)))
#         for j in range(d):
#             x = (d * m + j) % p
#             s = (x**3 + A * x + B) % p
#             if s == power_mod(s, int((p+1)/2), p):
#                 y = power_mod(s, int((p+1)/4), p)
#                 pts.append([E([x,y]), min(len(m_current), 64)])
#                 break
#     return pts

# # Reverse operation of the previous function
# def pointList_decode(lst_P):
#     b = 2 ** 8
#     d = 100
#     lst = []
#     for P in lst_P:
#         temp_lst = []
#         m = int((floor((P[0][0]/P[0][2])))/d)
#         while m != 0:
#             temp_lst.append(m % b)
#             m //= b
#             m = int(m)
#         while len(temp_lst) < P[1]:
#             temp_lst.append(0)
#         lst += temp_lst
#     return lst

# # Turns an image into a point on an elliptic curve E
# def imagePoint_encode(E, img):
#     pixels = img.getdata()
#     red = [p[0] for p in pixels]
#     green = [p[1] for p in pixels]
#     blue = [p[2] for p in pixels]
    
#     print('encode red')    
#     enc_red = listPoint_encode(E, red)
#     print('encode green')
#     enc_green = listPoint_encode(E, green)
#     print('encode blue')
#     enc_blue = listPoint_encode(E, blue)

#     return [enc_red, enc_green, enc_blue]

# # Reverse operation of the previous function
# def pointImage_decode(lst_P):
    
#     print('decode red')    
#     dec_red = pointList_decode(lst_P[0])
#     print('decode green')
#     dec_green = pointList_decode(lst_P[1])
#     print('decode blue')
#     dec_blue = pointList_decode(lst_P[2])
    
#     return [(r, g, b) for (r, g, b) in zip(dec_red, dec_green, dec_blue)]

# # Encrypts an image with given keys
# def encodeImage(E, P, img, privateKey_sender, publicKey_sender, publicKey_reciever):
#     PM = imagePoint_encode(E, img)
#     enc_red = []
#     enc_green = []
#     enc_blue = []

#     for i, e in enumerate([enc_red, enc_green, enc_blue]):
#         for Q in PM[i]:
#             k = ZZ.random_element(q)
#             kP = k *  publicKey_sender
#             e.append([kP, Q[0] + k * privateKey_sender * publicKey_reciever, Q[1]])
#     enc_img = [enc_red, enc_green, enc_blue]
#     return enc_img

# # Decrypts an image with given keys
# def decodeImage(E, P, enc_img, publicKey_sender, privateKey_reciever):
#     lst_P = []
#     dec_red = []
#     dec_green = []
#     dec_blue = []
#     for i, e in enumerate([dec_red, dec_green, dec_blue]):
#         for e_dec in enc_img[i]:
#             kP = privateKey_reciever * e_dec[0]
#             PM = e_dec[1] - kP
#             e.append([PM, e_dec[2]])
#     dec_img = pointImage_decode([dec_red, dec_green, dec_blue])
#     return dec_img

