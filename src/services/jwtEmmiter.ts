import { sign } from "../clients/kmsClient"
import { Token } from "../domain/tokent"
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