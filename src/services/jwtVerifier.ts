import jwt from 'jsonwebtoken'
import { getPublicKey } from "../clients/kmsClient"
import { isToken, Token } from "../domain/tokent"

export interface OkVerification {
  ok: true,
  token: Token
}

export interface NOkVerification {
  ok: false
}

export const verify = async (token: string): Promise<OkVerification | NOkVerification>  => {
  try {
    const publicKey = await getPublicKey()
    const parsedToken = await parse(token, publicKey)
    return { ok: true, token: parsedToken }
  } catch (err) {
    console.error(err)
    return { ok: false }
  }
}

const parse = (token: string, key: string) => new Promise<Token>((resolve, reject) => {
  jwt.verify(token, key, { algorithms: ['RS256'] } ,(err, token) => {
    if (err || !token) reject(err)
    else if (isToken(token)) resolve(token)
    else {
      console.error('jwt', JSON.stringify(token))
      reject(new Error('werid jwt type'))
    }
  })
})