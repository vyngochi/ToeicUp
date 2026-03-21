import CryptoJS from 'crypto-js'

export const encrypt = (data: any) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    import.meta.env.VITE_CRYPTO_SECRET_KEY,
  ).toString()
}

export const decrypt = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, import.meta.env.VITE_CRYPTO_SECRET_KEY)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}
