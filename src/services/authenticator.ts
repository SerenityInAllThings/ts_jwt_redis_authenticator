import { InternalError } from "../domain/errors"
import { TokenCreationResponse } from "../domain/tokent"
import { isPasswordCorrect } from "../domain/user"
import { fetchByEmail } from "../repositories/userRepository"
import { emit } from "./jwtEmmiter"

export const authenticate = async (email: string, password: string): Promise<TokenCreationResponse> => {
  const user = await fetchByEmail(email)
  if (!user)
    throw new InternalError('notFound', `no user with email '${email}' was found`)

  const isValid = await isPasswordCorrect(user, password)
  if (!isValid)
    return { success: false }
  
  const jwt = await emit(user)
  return { success: true, token: jwt }
}