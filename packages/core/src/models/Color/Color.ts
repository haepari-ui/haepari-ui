import { CircularlyRangedNumber, RangedNumber } from '../RangedNumber/RangedNumber';
import { convertDecToHexString, roundDec } from '../../utils/number';

abstract class Color {
  protected _alpha: RangedNumber;
  protected static readonly _decimalPoint: number = 1;
  protected static readonly _hexStringPrefix: string = '#';
  public static readonly minAlpha: number = 0;
  public static readonly maxAlpha: number = 255;

  constructor(alpha: number = 0) {
    this._alpha = new RangedNumber(alpha, Color.minAlpha, Color.maxAlpha);
  }

  get alpha() { return this._alpha.value }
  public abstract toHexString({
    includeAlpha,
    includePrefix
  }): string;
}
export class RGBColor extends Color {
  protected _red: RangedNumber;
  protected _green: RangedNumber;
  protected _blue: RangedNumber;
  public static readonly minColor: number = 0;
  public static readonly maxColor: number = 255;

  constructor(red: number, green: number, blue: number, alpha?: number) {
    super(alpha)
    this._red = new RangedNumber(red, RGBColor.minColor, RGBColor.maxColor);
    this._green = new RangedNumber(green, RGBColor.minColor, RGBColor.maxColor);
    this._blue = new RangedNumber(blue, RGBColor.minColor, RGBColor.maxColor);
  }

  get red() { return this._red.value }
  get green() { return this._green.value }
  get blue() { return this._blue.value }

  public toHexString({
    includeAlpha = false,
    includePrefix = false
  } = {}): string {
    return [
      includePrefix ? Color._hexStringPrefix : '',
      convertDecToHexString(this._red.value, 2),
      convertDecToHexString(this._green.value, 2),
      convertDecToHexString(this._blue.value, 2),
      includeAlpha ? convertDecToHexString(this._alpha.value, 2) : '',
    ].join('');
  };
  
  public toHSVColor() {
    const normalizedRed = this._red.value / 256;
    const normalizedGreen = this._green.value / 256;
    const normalizedBlue = this._blue.value / 256;

    const maxColor = Math.max(normalizedRed, normalizedGreen, normalizedBlue);
    const minColor = Math.min(normalizedRed, normalizedGreen, normalizedBlue);
    const colorDiff = maxColor - minColor;
    const h = colorDiff && (
      (maxColor === normalizedRed)
        ? ((normalizedGreen - normalizedBlue) / colorDiff)
        : ((maxColor === normalizedGreen)
        ? ((normalizedBlue - normalizedRed) / colorDiff) + 2
        : ((normalizedRed - normalizedGreen) / colorDiff) + 4
      )
    );

    const hue = roundDec((h < 0 ? h + 6 : h) * 60, Color._decimalPoint);
    const satuation = roundDec((maxColor && colorDiff / maxColor) * 100, Color._decimalPoint);
    const value = roundDec(maxColor * 100, Color._decimalPoint);
    const alpha = this._alpha.value;
    return new HSVColor(hue, satuation, value, alpha);
  }
}

export class HSVColor extends Color {
  protected _hue: CircularlyRangedNumber;
  protected _satuation: RangedNumber;
  protected _value: RangedNumber;
  public static readonly minHue: number = 0;
  public static readonly maxHue: number = 359;
  public static readonly minSatuation: number = 0;
  public static readonly maxSatuation: number = 100;
  public static readonly minValue: number = 0;
  public static readonly maxValue: number = 100;

  constructor(hue: number, satuation: number, value: number, alpha?: number) {
    super(alpha)
    this._hue = new CircularlyRangedNumber(hue, HSVColor.minHue, HSVColor.maxHue);
    this._satuation = new RangedNumber(satuation, HSVColor.minSatuation, HSVColor.maxSatuation);
    this._value = new RangedNumber(value, HSVColor.minValue, HSVColor.maxValue);
  }

  get hue() { return this._hue.value }
  get satuation() { return this._satuation.value }
  get value() { return this._value.value }

  public toHexString({
    includeAlpha = false,
    includePrefix = false
  } = {}): string {
    return this.toRGBColor().toHexString({
      includeAlpha,
      includePrefix
    });
  };

  public toRGBColor = () => {
    // https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
    const hue = this._hue.value;
    const normalizedSatuation = this._satuation.value / 100;
    const normalizedValue = this._value.value / 100;

    const f = (n: number) => {
      const k = ((hue / 60) + n) % 6;
      const t = Math.max(Math.min(k, 4 - k, 1), 0);
      const normalizedColor = normalizedValue - (normalizedValue * normalizedSatuation * t);
      return normalizedColor * 256;
    };     

    const red = roundDec(f(5), 0);
    const green = roundDec(f(3), 0);
    const blue = roundDec(f(1), 0);
    const alpha = this._alpha.value;
    return new RGBColor(red, green, blue, alpha);
  };
}
