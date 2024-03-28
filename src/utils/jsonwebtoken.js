import jsonwebtoken from 'jsonwebtoken'
const privateKey = "palabrasecretaparatoken"

export const generateToken = (user) => {
    const token = jsonwebtoken.sign(user, privateKey, {expiresIn: "24h"})
    return token
}