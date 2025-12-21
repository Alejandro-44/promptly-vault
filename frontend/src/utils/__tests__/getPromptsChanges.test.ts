import { getPromptChanges } from '../getPromptsChanges';
import type { PromptCreate } from '@/services';

describe('getPromptChanges', () => {
  it('should return empty object when no changes', () => {
    const original: PromptCreate = {
      title: 'Test Title',
      prompt: 'Test Prompt',
      resultExample: 'Test Result',
      model: 'Test Model',
      tags: ['tag1', 'tag2']
    };
    const current = { ...original };

    expect(getPromptChanges(original, current)).toEqual({});
  });

  it('should detect title change', () => {
    const original: PromptCreate = {
      title: 'Old Title',
      prompt: 'Test Prompt',
      resultExample: 'Test Result',
      model: 'Test Model',
      tags: ['tag1', 'tag2']
    };
    const current: PromptCreate = {
      ...original,
      title: 'New Title'
    };

    expect(getPromptChanges(original, current)).toEqual({ title: 'New Title' });
  });

  it('should detect prompt change', () => {
    const original: PromptCreate = {
      title: 'Test Title',
      prompt: 'Old Prompt',
      resultExample: 'Test Result',
      model: 'Test Model',
      tags: ['tag1', 'tag2']
    };
    const current: PromptCreate = {
      ...original,
      prompt: 'New Prompt'
    };

    expect(getPromptChanges(original, current)).toEqual({ prompt: 'New Prompt' });
  });

  it('should detect resultExample change', () => {
    const original: PromptCreate = {
      title: 'Test Title',
      prompt: 'Test Prompt',
      resultExample: 'Old Result',
      model: 'Test Model',
      tags: ['tag1', 'tag2']
    };
    const current: PromptCreate = {
      ...original,
      resultExample: 'New Result'
    };

    expect(getPromptChanges(original, current)).toEqual({ resultExample: 'New Result' });
  });

  it('should detect model change', () => {
    const original: PromptCreate = {
      title: 'Test Title',
      prompt: 'Test Prompt',
      resultExample: 'Test Result',
      model: 'Old Model',
      tags: ['tag1', 'tag2']
    };
    const current: PromptCreate = {
      ...original,
      model: 'New Model'
    };

    expect(getPromptChanges(original, current)).toEqual({ model: 'New Model' });
  });

  it('should detect tags change', () => {
    const original: PromptCreate = {
      title: 'Test Title',
      prompt: 'Test Prompt',
      resultExample: 'Test Result',
      model: 'Test Model',
      tags: ['tag1', 'tag2']
    };
    const current: PromptCreate = {
      ...original,
      tags: ['tag3', 'tag4']
    };

    expect(getPromptChanges(original, current)).toEqual({ tags: ['tag3', 'tag4'] });
  });

  it('should ignore tags order change', () => {
    const original: PromptCreate = {
      title: 'Test Title',
      prompt: 'Test Prompt',
      resultExample: 'Test Result',
      model: 'Test Model',
      tags: ['tag1', 'tag2']
    };
    const current: PromptCreate = {
      ...original,
      tags: ['tag2', 'tag1']
    };

    expect(getPromptChanges(original, current)).toEqual({});
  });

  it('should detect tags length change', () => {
    const original: PromptCreate = {
      title: 'Test Title',
      prompt: 'Test Prompt',
      resultExample: 'Test Result',
      model: 'Test Model',
      tags: ['tag1', 'tag2']
    };
    const current: PromptCreate = {
      ...original,
      tags: ['tag1']
    };

    expect(getPromptChanges(original, current)).toEqual({ tags: ['tag1'] });
  });

  it('should detect multiple changes', () => {
    const original: PromptCreate = {
      title: 'Old Title',
      prompt: 'Old Prompt',
      resultExample: 'Old Result',
      model: 'Old Model',
      tags: ['old1', 'old2']
    };
    const current: PromptCreate = {
      title: 'New Title',
      prompt: 'New Prompt',
      resultExample: 'New Result',
      model: 'New Model',
      tags: ['new1', 'new2']
    };

    expect(getPromptChanges(original, current)).toEqual({
      title: 'New Title',
      prompt: 'New Prompt',
      resultExample: 'New Result',
      model: 'New Model',
      tags: ['new1', 'new2']
    });
  });
});
