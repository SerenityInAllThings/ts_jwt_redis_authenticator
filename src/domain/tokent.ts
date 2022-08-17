export interface TokenCreationResponse {
  success: boolean
  token?: string
}

export interface Token {
  email: string
}

export const isToken = (value?: any): value is Token =>
  value != undefined &&
  typeof value == 'object' &&
  !Array.isArray(value) &&
  "email" in value;