import { HSVColor, RGBColor } from './Color';
import { describe, expect, it } from '@jest/globals';

describe('RGBColor', () => {
  let color: RGBColor;
  beforeEach(() => {
    // https://en.wikipedia.org/wiki/Shades_of_purple#Byzantium
    color = new RGBColor(112, 41, 99, 127);
  })

  it('Get value', () => {
    expect(color.red).toBe(112);
    expect(color.green).toBe(41);
    expect(color.blue).toBe(99);
    expect(color.alpha).toBe(127);
  });

  it('Stringify', () => {
    expect(color.toHexString()).toBe('702963');
    expect(color.toHexString({ includeAlpha: true })).toBe('7029637F');
    expect(color.toHexString({ includePrefix: true })).toBe('#702963');
  });
});

describe('HSVColor', () => {
  let color: HSVColor;
  beforeEach(() => {
    // https://en.wikipedia.org/wiki/Shades_of_purple#Byzantium
    color = new HSVColor(311, 63.4, 43.9, 127);
  })

  it('Get value', () => {
    expect(color.hue).toBe(311);
    expect(color.satuation).toBe(63.4);
    expect(color.value).toBe(43.9);
    expect(color.alpha).toBe(127);
  });

  it('to RGBColor', () => {
    const convertedColor = color.toRGBColor();
    expect(convertedColor.red).toBe(112);
    expect(convertedColor.green).toBe(41);
    expect(convertedColor.blue).toBe(99);
    expect(convertedColor.alpha).toBe(127);
  });

  it('Stringify', () => {
    expect(color.toHexString()).toBe('702963');
    expect(color.toHexString({ includeAlpha: true })).toBe('7029637F');
    expect(color.toHexString({ includePrefix: true })).toBe('#702963');
  });
});
