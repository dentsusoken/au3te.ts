import { describe, expect, it } from 'vitest';
import { Prompt } from './Prompt';

describe('Prompt', () => {
  it('should return the correct value', () => {
    const prompt = Prompt.LOGIN;
    expect(prompt.getValue()).toBe(1);
  });

  it('should return the correct string representation', () => {
    const prompt = Prompt.CONSENT;
    expect(prompt.toString()).toBe('consent');
  });

  it('should return the correct prompt by value', () => {
    const prompt = Prompt.getByValue(3);
    expect(prompt).toBe(Prompt.SELECT_ACCOUNT);
  });

  it('should return the correct prompt by string', () => {
    const prompt = Prompt.parse('create');
    expect(prompt).toBe(Prompt.CREATE);
  });

  it('should convert a set of prompts to a bit value', () => {
    const prompts = new Set<Prompt>([Prompt.LOGIN, Prompt.CONSENT]);
    const bitValue = Prompt.toBit(prompts);
    expect(bitValue).toBe(3);
  });

  it('should convert a bit value to a set of prompts', () => {
    const bitValue = 5;
    const prompts = Prompt.toArray(bitValue);
    expect(prompts).toEqual(
      new Set<Prompt>([Prompt.NONE, Prompt.LOGIN, Prompt.CREATE])
    );
  });
});
