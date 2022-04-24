import { isNullOrUndefined } from '../../utils/type';

export class RangedNumber {
  protected _value: number;
  protected _minValue: number;
  protected _maxValue: number;

  private isMinSet() {
    return !isNullOrUndefined(this.minValue);
  }
  private isMaxSet() {
    return !isNullOrUndefined(this.maxValue);
  }
  private isMinAndMaxSet() {
    return this.isMinSet() && this.isMaxSet();
  }

  private isMinAndMaxValid() {
    return !(this.isMinAndMaxSet() && (this._minValue > this._maxValue));
  }

  private isNewValueValid(newValue: number) {
    if(!isNullOrUndefined(this._minValue) && (newValue < this._minValue)) return false;
    if(!isNullOrUndefined(this._maxValue) && (newValue > this._maxValue)) return false;
    return true;
  }

  constructor(value: number, minValue?: number, maxValue?: number) {
    this._value = value;
    this._minValue = minValue;
    this._maxValue = maxValue;
    if(!this.isMinAndMaxValid()) {
      throw new Error('Number range is invalid.');
    }
  }

  get value() { return this._value };
  get minValue() { return this._minValue };
  get maxValue() { return this._maxValue };
  set value(newValue: number) {
    if(!this.isNewValueValid(newValue)) {
      throw new Error('New value is invalid.');
    }
    this._value = newValue;
  }

}

export class CircularlyRangedNumber extends RangedNumber {
  private normalizeValue(value: number) {
    const numberRange = this._maxValue - this._minValue;
    const minValueRemainer = this._minValue % numberRange;
    const valueRemainer = (value - minValueRemainer) % numberRange;
    return this._minValue + valueRemainer;
  }

  get value() { return this._value };
  get minValue() { return this._minValue };
  get maxValue() { return this._maxValue };
  set value(newValue: number) {
    this._value = this.normalizeValue(newValue);
  }
}
