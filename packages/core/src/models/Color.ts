import { CircularlyRangedNumber, RangedNumber } from './RangedNumber';

export class RGB {
  private _red: RangedNumber;
  private _green: RangedNumber;
  private _blue: RangedNumber;

  constructor(red: number, green: number, blue: number) {
    const minValue = 0;
    const maxValue = 255;

    this._red = new RangedNumber(red, minValue, maxValue);
    this._green = new RangedNumber(green, minValue, maxValue);
    this._blue = new RangedNumber(blue, minValue, maxValue);
  }

  get red() { return this._red.value }
  get green() { return this._green.value }
  get blue() { return this._blue.value }
}

export class HSB {
  private _hue: CircularlyRangedNumber;
  private _satuation: RangedNumber;
  private _brightness: RangedNumber;

  constructor(hue: number, satuation: number, brightness: number) {
    const minRadius = 0;
    const maxRadius = 359;
    const minValue = 0;
    const maxValue = 100;

    this._hue = new CircularlyRangedNumber(hue, minRadius, maxRadius);
    this._satuation = new RangedNumber(satuation, minValue, maxValue);
    this._brightness = new RangedNumber(brightness, minValue, maxValue);
  }

  get hue() { return this._hue.value }
  get satuation() { return this._satuation.value }
  get brightness() { return this._brightness.value }
}
