import { CircularlyRangedNumber, RangedNumber } from '../RangedNumber/RangedNumber';

import { convertDecToHexString } from '../../utils/number';

abstract class Color {
  protected _alpha: RangedNumber
  protected static readonly hexStringPrefix: string = '#';
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
      includePrefix ? Color.hexStringPrefix : '',
      convertDecToHexString(this._red.value, 2),
      convertDecToHexString(this._green.value, 2),
      convertDecToHexString(this._blue.value, 2),
      includeAlpha ? convertDecToHexString(this._alpha.value, 2) : '',
    ].join('');
  };
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

  public toRGBColor = () => {
    // https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
    const hue = this._hue.value;
    const normalizedSatuation = this._satuation.value / 100;
    const normalizedValue = this._value.value / 100;
    const f = (n: number) => {
      const k = ((hue / 60) + n) % 6;
      const t = Math.max(Math.min(k, 4 - k, 1), 0);
      const normalizedColor = normalizedValue - (normalizedValue * normalizedSatuation * t);
      return Math.round(normalizedColor * 256);
    };     
    return new RGBColor(f(5), f(3), f(1), this._alpha.value);
  };

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
}
