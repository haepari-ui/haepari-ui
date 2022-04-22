import { isNullOrUndefined } from '../utils/type';
import { pipe } from '../utils/pipe';

export class RangedNumber {
  private _value: number;
  private _minValue: number;
  private _maxValue: number;

  private static isMinAndMaxAllSet(minValue: number, maxValue: number) {
    return [minValue, maxValue].every(lhs => !isNullOrUndefined(lhs));
  }

  private static isMinAndMaxValid(minValue: number, maxValue: number) {
    return !(RangedNumber.isMinAndMaxAllSet(minValue, maxValue) && (minValue > maxValue));
  }

  constructor(value: number, minValue?: number, maxValue?: number) {
    if(!RangedNumber.isMinAndMaxValid(this._minValue, this._maxValue)) {
      throw new Error('Number range is invalid.');
    }
    this._value = value;
    this._minValue = minValue;
    this._maxValue = maxValue;
  }

  get value() { return this._value };
  get minValue() { return this._minValue };
  get maxValue() { return this._maxValue };
  set value(newValue: number) {
    if(!RangedNumber.isMinAndMaxValid(this._minValue, this._maxValue)) {
      throw new Error('Number range is invalid.');
    }
    this._value = newValue;
  }

}

export class CircularlyRangedNumber extends RangedNumber {
  constructor(value: number, minValue: number, maxValue: number) {
    super(value, minValue, maxValue);
  }

  private normalizeValue(value: number) {
    return pipe(value, [
      lhs => lhs - this.minValue,
      lhs => lhs % this.maxValue,
      lhs => lhs + Math.abs(this.minValue),
    ]);
  }

  set value(newValue: number) {
    this.value = this.normalizeValue(newValue);
  }
}
