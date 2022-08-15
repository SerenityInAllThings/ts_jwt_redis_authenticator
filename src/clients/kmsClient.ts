import { GetPublicKeyCommand, KMS, KMSClient, SignCommand, VerifyCommand } from "@aws-sdk/client-kms";
import { getKmsKeyName } from "../domain/environmentVariables";
import { InternalError } from "../domain/errors";

const client = new KMSClient({})

const toBase64 = (uint8array: Uint8Array)  => {
  const output: string[] = [];
  for (let i = 0, {length} = uint8array; i < length; i++)
    output.push(String.fromCharCode(uint8array[i]));
  return Buffer.from(output.join('')).toString('base64')
}

export const sign = async (toBeSigned: string) => {
  const buffer = Buffer.from(toBeSigned)
  const options = {
    KeyId: getKmsKeyName(), 
    Message: buffer, 
    SigningAlgorithm: 'RSASSA_PKCS1_V1_5_SHA_256' 
  }
  const command = new SignCommand(options)
  const response = await client.send(command)
  if (!response?.Signature)
    throw new InternalError('internalError', 'No response from sign')
  const signature = toBase64(response.Signature)
  return signature
}