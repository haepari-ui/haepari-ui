export const convertDecToHexString = (dec: number, hexDigit?: number) => {
  if(typeof hexDigit === 'number' && hexDigit <= 0) {
    throw new Error('Hexadecimal digit must be greater than 0.')
  }
  return dec.toString(16).toUpperCase().padStart(hexDigit, '0');
}

export const convertHexStringToDec = (hexString: string) => parseInt(hexString, 16);

export const ceilDec = (dec: number, digit: number = 0) => {
  const poweredDigit = 10 ** digit;
  return Math.ceil(dec * poweredDigit) / poweredDigit
}

export const floorDec = (dec: number, digit: number = 0) => {
  const poweredDigit = 10 ** digit;
  return Math.floor(dec * poweredDigit) / poweredDigit
}

export const roundDec = (dec: number, digit: number = 0) => {
  const poweredDigit = 10 ** digit;
  return Math.round(dec * poweredDigit) / poweredDigit
}
