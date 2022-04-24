import { CircularlyRangedNumber, RangedNumber } from './RangedNumber';
import { describe, expect, it } from '@jest/globals';

describe('RangedNumber WITHOUT ranges', () => {
  let number: RangedNumber;
  beforeEach(() => {
    number = new RangedNumber(50);
  })

  it('Get value', () => {
    expect(number.value).toBe(50);
  });

  it('Update value', () => {
    number.value = 75;
    expect(number.value).toBe(75);
  });
});

describe('RangedNumber with ranges', () => {
  let number: RangedNumber;
  beforeEach(() => {
    number = new RangedNumber(50, -100, 100);
  })

  it('Get value', () => {
    expect(number.value).toBe(50)
  });

  it('Update value', () => {
    number.value = 75;
    expect(number.value).toBe(75);
    expect(() => {
      number.value = 500;
      return number.value;
    }).toThrow();
  });
});

describe('CircularlyRangedNumber with ranges', () => {
  let number: CircularlyRangedNumber;
  beforeEach(() => {
    number = new CircularlyRangedNumber(50, -100, 100);
  })

  it('Get value', () => {
    expect(number.value).toBe(50);
  });

  it('Update value', () => {
    number.value = 75;
    expect(number.value).toBe(75);
  });
  it('Update value that should be normalized', () => {
    number.value = 100;
    expect(number.value).toBe(-100);
    number.value = 125;
    expect(number.value).toBe(-75);
    number.value = 400;
    expect(number.value).toBe(0);
    number.value = 575;
    expect(number.value).toBe(-25);
  });
});
