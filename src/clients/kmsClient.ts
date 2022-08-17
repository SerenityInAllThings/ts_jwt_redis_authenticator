import { GetPublicKeyCommand, KMSClient, SignCommand, VerifyCommand, VerifyCommandInput } from "@aws-sdk/client-kms";
import { getKmsKeyName } from "../domain/environmentVariables";
import { InternalError } from "../domain/errors";

const client = new KMSClient({})
let publicKey: Uint8Array | undefined

export const sign = async (toBeSigned: string) => {
  const buffer = Buffer.from(toBeSigned)
  const command = new SignCommand({
    KeyId: getKmsKeyName(), 
    SigningAlgorithm: 'RSASSA_PKCS1_V1_5_SHA_256',
    MessageType: 'RAW',
    Message: buffer, 
  })
  const response = await client.send(command)
  if (!response?.Signature)
    throw new InternalError('internalError', 'No response from sign')
  const signature = Buffer.from(response.Signature).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return signature
}

export const getPublicKey = async () => {
  if (!publicKey) {
    const command = new GetPublicKeyCommand({ KeyId: getKmsKeyName() })
    const response = await client.send(command)
    if (!response.PublicKey) 
      throw new InternalError('internalError', 'Missing public key')
    publicKey = response.PublicKey
  }
  return '-----BEGIN PUBLIC KEY-----\n' + 
    Buffer.from(publicKey).toString('base64') + 
    '\n-----END PUBLIC KEY-----'
}