import { sign } from "../clients/kmsClient"
import { Token } from "../domain/tokent"
import User from "../domain/user"

const headers = {
  alg: "HS256",
  typ: "JWT"
}

const base64Encode = (text: string) => Buffer.from(text).toString("base64")

export const emit = async ({ email }: User) => {
  const header = base64Encode(JSON.stringify(headers))
  const payload: Token = { email }
  const unsigned = header + '.' + base64Encode(JSON.stringify(payload))
  const signature = await sign(unsigned)
  return unsigned + '.' + signature
}

