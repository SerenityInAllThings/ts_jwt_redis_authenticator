import jwt from 'jsonwebtoken'
import { getPublicKey, sign } from "../clients/kmsClient"
import { isToken, Token } from "../domain/tokent"
import User from "../domain/user"
import base64url from "base64url";

const headers = {
  alg: "RS256",
  typ: "JWT"
}

export const emit = async ({ email }: User) => {
  const header = base64url(JSON.stringify(headers))
  const body: Token = { email }
  const unsigned = header + '.' + base64url(JSON.stringify(body))
  const signature = await sign(unsigned)
  return unsigned + '.' + signature
}

export const verify = async (token: string) => {
  try {
    const publicKey = await getPublicKey()
    const ok = await parse(token, publicKey)
    return ok
  } catch (err) {
    console.error(err)
    return false
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