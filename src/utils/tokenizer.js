import jwt from 'jsonwebtoken'

const detokenizeUser = (req) => {
    const header = req.headers.authorization

    if(!header){
        throw new Error('AUTHENTICATION REQUIRED')
    }

    const token = header.replace('Bearer ','')
    const decoded = jwt.verify(token, process.env.JWTSECRET)

    return decoded
}

export { detokenizeUser }