import { CircularlyRangedNumber, RangedNumber } from '../RangedNumber/RangedNumber';

import { convertDecToHexString } from '../../utils/number';

abstract class Color {
  protected _alpha: RangedNumber
  protected static readonly hexStringPrefix: string = '#';
  public static readonly minAlphaValue: number = 0;
  public static readonly maxAlphaValue: number = 255;

  constructor(alpha: number = 0) {
    this._alpha = new RangedNumber(alpha, Color.minAlphaValue, Color.maxAlphaValue);
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
  public static readonly minValue: number = 0;
  public static readonly maxValue: number = 255;

  constructor(red: number, green: number, blue: number, alpha?: number) {
    super(alpha)
    this._red = new RangedNumber(red, RGBColor.minValue, RGBColor.maxValue);
    this._green = new RangedNumber(green, RGBColor.minValue, RGBColor.maxValue);
    this._blue = new RangedNumber(blue, RGBColor.minValue, RGBColor.maxValue);
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

export class HSBColor extends Color {
  protected _hue: CircularlyRangedNumber;
  protected _satuation: RangedNumber;
  protected _brightness: RangedNumber;
  public static readonly minHueValue: number = 0;
  public static readonly maxHueValue: number = 359;
  public static readonly minSatuationValue: number = 0;
  public static readonly maxSatuationValue: number = 100;
  public static readonly minBrightnessValue: number = 0;
  public static readonly maxBrightnessValue: number = 100;

  constructor(hue: number, satuation: number, brightness: number, alpha?: number) {
    super(alpha)
    this._hue = new CircularlyRangedNumber(hue, HSBColor.minHueValue, HSBColor.maxHueValue);
    this._satuation = new RangedNumber(satuation, HSBColor.minSatuationValue, HSBColor.maxSatuationValue);
    this._brightness = new RangedNumber(brightness, HSBColor.minBrightnessValue, HSBColor.maxBrightnessValue);
  }

  public toRGBColor = () => {
    // https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_RGB
    const hue = this._hue.value;
    const normalizedSatuation = this._satuation.value / 100;
    const normalizedBrightness = this._brightness.value / 100;
    const f = (n: number) => {
      const k = ((hue / 60) + n) % 6;
      const t = Math.max(Math.min(k, 4 - k, 1), 0);
      const normalizedColorValue = normalizedBrightness - (normalizedBrightness * normalizedSatuation * t);
      return Math.round(normalizedColorValue * 256);
    };     
    return new RGBColor(f(5), f(3), f(1), this._alpha.value);
  };

  get hue() { return this._hue.value }
  get satuation() { return this._satuation.value }
  get brightness() { return this._brightness.value }
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
