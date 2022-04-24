export const convertDecToHexString = (dec: number, hexDigit?: number) => {
  if(typeof hexDigit === 'number' && hexDigit <= 0) {
    throw new Error('Hexadecimal digit must be greater than 0.')
  }
  return dec.toString(16).toUpperCase().padStart(hexDigit, '0');
}
export const convertHexStringToDec = (hexString: string) => parseInt(hexString, 16);
