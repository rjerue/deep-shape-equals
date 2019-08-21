import { areObjectsSameShape } from '../src';

const basic = {
  a: 1,
  b: 'Ryan',
};

const basicCompliment = {
  a: 2,
  b: 'Jerue',
};

const bad = { ...basic, a: 'hello' };

describe('areObjectsSameShape Tests', () => {
  it('Basic shaping', () => {
    expect(areObjectsSameShape([basic, basicCompliment])).toEqual(true);
  });
  it('Basic negative', () => {
    expect(areObjectsSameShape([basic, bad])).toEqual(false);
  });
  it('Deep Testing', () => {
    const left = { ...basic, deep: basicCompliment };
    const right = { ...basicCompliment, deep: basic };
    expect(areObjectsSameShape([left, right])).toEqual(true);
  });
  it('Deep Testing Netagive', () => {
    const left = { ...basic, deep: basicCompliment };
    const right = { ...basicCompliment, deep: bad };
    expect(areObjectsSameShape([left, right])).toEqual(false);
  });
  it('Arrays', () => {
    const left = { ...basic, array: [1, '2', true] };
    const right = { ...basicCompliment, array: [11, '22', false] };
    expect(areObjectsSameShape([left, right])).toEqual(true);
  });
  it('Arrays ignore order', () => {
    const left = { ...basic, array: [1, '2', true] };
    const right = { ...basicCompliment, array: ['2', 11, false] };
    expect(areObjectsSameShape([left, right], true)).toEqual(true);
  });
  it('Arrays with objects', () => {
    const left = { ...basic, array: [1, '2', true, { ...basicCompliment }] };
    const right = {
      ...basicCompliment,
      array: [11, '22', false, { ...basicCompliment }],
    };
    expect(areObjectsSameShape([left, right])).toEqual(true);
  });
  it('Arrays with deep', () => {
    const arr = [1, '2', true, { ...basicCompliment }];
    const left = {
      ...basic,
      array: [1, '2', true, { ...basicCompliment, arr }, arr],
    };
    const right = {
      ...basicCompliment,
      array: [11, '22', false, { ...basicCompliment, arr }, arr],
    };
    expect(areObjectsSameShape([left, right])).toEqual(true);
  });
  it('Arrays types Negative', () => {
    const left = { ...basic, array: ['1', '2', true] };
    const right = { ...basicCompliment, array: [11, '22', false] };
    expect(areObjectsSameShape([left, right])).toEqual(false);
  });
  it('Arrays ignore order negative', () => {
    const left = { ...basic, array: [1, '2', true, '2'] };
    const right = { ...basicCompliment, array: ['2', 11, false, 11] };
    expect(areObjectsSameShape([left, right], true)).toEqual(false);
  });
  it('Arrays length Negative', () => {
    const left = { ...basic, array: [1, '2', true, 'oh hi there'] };
    const right = { ...basicCompliment, array: [11, '22', false] };
    expect(areObjectsSameShape([left, right])).toEqual(false);
  });
  it('Arrays with deep negative', () => {
    const arr = [1, '2', true, { ...basicCompliment }];
    const left = {
      ...basic,
      array: [1, '2', true, { ...basicCompliment, arr }],
    };
    const right = {
      ...basicCompliment,
      array: [11, '22', false, { ...basicCompliment, arr: [...arr, 'bezos'] }],
    };
    expect(areObjectsSameShape([left, right])).toEqual(false);
  });
});
