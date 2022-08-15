const getEnvironmentVariableOrThrow = (name: string): string => {
  const environmentValue = process.env[name]
  if (environmentValue) return environmentValue
  else throw new Error(`Missing '${name}' environment variable`)
}

const getRedisConnectionUrl = () => getEnvironmentVariableOrThrow('REDIS_URL')

const getKmsKeyName = () => getEnvironmentVariableOrThrow('KMS_KEY')

export { getRedisConnectionUrl, getKmsKeyName }
