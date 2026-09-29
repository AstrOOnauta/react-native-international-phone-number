import { act, renderHook } from '@testing-library/react-native';
import { getCountryByCca2 } from 'rn-country-select';

import usePhoneInput from '../lib/hooks/usePhoneInput.js';

// Same call the TextInput makes on every keystroke: current value plus the new text.
async function type(result, keys) {
  for (const key of keys) {
    await act(async () => {
      result.current.onChangePhoneNumber(
        result.current.nationalPhoneNumberFormatted + key
      );
    });
  }
}

async function paste(result, text) {
  await act(async () => {
    result.current.onChangePhoneNumber(text);
  });
}

describe('initial country', () => {
  test('falls back to Brazil', async () => {
    const { result } = await renderHook(() => usePhoneInput());
    expect(result.current.country.cca2).toBe('BR');
  });

  test('uses defaultCountry', async () => {
    const { result } = await renderHook(() =>
      usePhoneInput({ defaultCountry: 'US' })
    );
    expect(result.current.country.cca2).toBe('US');
  });

  test('an E.164 defaultPhoneNumber picks its own country and is formatted', async () => {
    const { result } = await renderHook(() =>
      usePhoneInput({ defaultCountry: 'BR', defaultPhoneNumber: '+12025550123' })
    );
    expect(result.current.country.cca2).toBe('US');
    expect(result.current.nationalPhoneNumberFormatted).toBe('202 555 0123');
  });

  test('a controlled country wins over everything else', async () => {
    const { result } = await renderHook(() =>
      usePhoneInput({
        country: getCountryByCca2('AR'),
        defaultCountry: 'US',
      })
    );
    expect(result.current.country.cca2).toBe('AR');
  });
});

describe('typing', () => {
  test('formats and reports every derived value', async () => {
    const onChangePhoneNumber = jest.fn();
    const { result } = await renderHook(() =>
      usePhoneInput({ onChangePhoneNumber })
    );

    await type(result, '11912345678');

    expect(result.current.nationalPhoneNumberFormatted).toBe('11 91234 5678');
    expect(result.current.nationalPhoneNumber).toBe('11912345678');
    expect(result.current.internationalPhoneNumber).toBe('+5511912345678');
    expect(result.current.internationalPhoneNumberFormatted).toBe('+55 11 91234 5678');
    expect(result.current.internationalPhoneNumberLength).toBe(13);
    expect(result.current.isValidPhoneNumber).toBe(true);
    expect(result.current.phoneNumberType).toBe('MOBILE');
    expect(onChangePhoneNumber).toHaveBeenLastCalledWith('11 91234 5678');
  });

  test('a national number starting with the calling code digits is untouched', async () => {
    // DDD 55 is a real Brazilian area code; PR #180 cleared the field at "55".
    const { result } = await renderHook(() => usePhoneInput());
    await type(result, '55994689706');
    expect(result.current.nationalPhoneNumberFormatted).toBe('55 99468 9706');
  });

  test('a digit after a complete number is ignored and not reported', async () => {
    const onChangePhoneNumber = jest.fn();
    const { result } = await renderHook(() =>
      usePhoneInput({ onChangePhoneNumber })
    );
    await type(result, '55994689706');
    onChangePhoneNumber.mockClear();

    await type(result, '7');

    expect(result.current.nationalPhoneNumberFormatted).toBe('55 99468 9706');
    expect(onChangePhoneNumber).not.toHaveBeenCalled();
  });

  test('a calling code typed by hand drops off once the number completes', async () => {
    const { result } = await renderHook(() =>
      usePhoneInput({ defaultCountry: 'US' })
    );
    await type(result, '12025550123');
    expect(result.current.nationalPhoneNumberFormatted).toBe('202 555 0123');
  });

  test('autofill without the leading + lands as the national number', async () => {
    const { result } = await renderHook(() => usePhoneInput());
    await paste(result, '5511912345678');
    expect(result.current.nationalPhoneNumberFormatted).toBe('11 91234 5678');
    expect(result.current.country.cca2).toBe('BR');
  });
});

describe('smart paste', () => {
  test('an international number switches the country', async () => {
    const onChangeCountry = jest.fn();
    const { result } = await renderHook(() =>
      usePhoneInput({ onChangeCountry })
    );

    await paste(result, '+1 202 555 0123');

    expect(result.current.country.cca2).toBe('US');
    expect(result.current.nationalPhoneNumberFormatted).toBe('202 555 0123');
    expect(onChangeCountry).toHaveBeenLastCalledWith(
      expect.objectContaining({ cca2: 'US' })
    );
  });

  test('a custom mask is applied to the pasted national digits', async () => {
    const { result } = await renderHook(() =>
      usePhoneInput({ customMask: '(##) #####-####' })
    );
    await paste(result, '+55 11 91234-5678');
    expect(result.current.nationalPhoneNumberFormatted).toBe('(11) 91234-5678');
  });
});

describe('custom mask', () => {
  test('typing follows the mask instead of the country format', async () => {
    const { result } = await renderHook(() =>
      usePhoneInput({ customMask: '(##) #####-####' })
    );
    await type(result, '11912345678');
    expect(result.current.nationalPhoneNumberFormatted).toBe('(11) 91234-5678');
  });
});

describe('controlled value', () => {
  test('a change reports the formatted value but leaves the value to the parent', async () => {
    const onChangePhoneNumber = jest.fn();
    const { result } = await renderHook(() =>
      usePhoneInput({ value: '', onChangePhoneNumber })
    );

    await paste(result, '11912345678');

    expect(onChangePhoneNumber).toHaveBeenLastCalledWith('11 91234 5678');
    expect(result.current.nationalPhoneNumberFormatted).toBe('');
  });

  test('a new E.164 value from the parent re-detects the country', async () => {
    const onChangeCountry = jest.fn();
    const { result, rerender } = await renderHook(
      ({ value }) => usePhoneInput({ value, onChangeCountry }),
      { initialProps: { value: '' } }
    );

    await rerender({ value: '+12025550123' });

    expect(result.current.country.cca2).toBe('US');
    expect(onChangeCountry).toHaveBeenLastCalledWith(
      expect.objectContaining({ cca2: 'US' })
    );
  });
});

describe('controlled country', () => {
  test('setCountry only notifies the parent', async () => {
    const onChangeCountry = jest.fn();
    const { result } = await renderHook(() =>
      usePhoneInput({ country: getCountryByCca2('BR'), onChangeCountry })
    );

    await act(async () => {
      result.current.setCountry(getCountryByCca2('US'));
    });

    expect(onChangeCountry).toHaveBeenLastCalledWith(
      expect.objectContaining({ cca2: 'US' })
    );
    expect(result.current.country.cca2).toBe('BR');
  });
});

describe('programmatic setPhoneNumber', () => {
  test('an overflowing number is kept raw so it stays visible', async () => {
    const { result } = await renderHook(() => usePhoneInput());
    await act(async () => {
      result.current.setPhoneNumber('119123456789999');
    });
    expect(result.current.nationalPhoneNumberFormatted).toBe('119123456789999');
    expect(result.current.isValidPhoneNumber).toBe(false);
  });

  test('emitChange: false does not report the change', async () => {
    const onChangePhoneNumber = jest.fn();
    const { result } = await renderHook(() =>
      usePhoneInput({ onChangePhoneNumber })
    );
    await act(async () => {
      result.current.setPhoneNumber('11912345678', { emitChange: false });
    });
    expect(result.current.nationalPhoneNumberFormatted).toBe('11 91234 5678');
    expect(onChangePhoneNumber).not.toHaveBeenCalled();
  });
});

describe('validation and type callbacks', () => {
  test('silent while empty, then one call per transition', async () => {
    const onValidationChange = jest.fn();
    const onPhoneNumberTypeChange = jest.fn();
    const { result } = await renderHook(() =>
      usePhoneInput({ onValidationChange, onPhoneNumberTypeChange })
    );
    expect(onValidationChange).not.toHaveBeenCalled();
    expect(onPhoneNumberTypeChange).not.toHaveBeenCalled();

    await type(result, '11912345678');
    expect(onValidationChange).toHaveBeenCalledTimes(1);
    expect(onValidationChange).toHaveBeenLastCalledWith(
      true,
      'MOBILE',
      expect.objectContaining({ cca2: 'BR' })
    );
    expect(onPhoneNumberTypeChange).toHaveBeenCalledTimes(1);
    expect(onPhoneNumberTypeChange).toHaveBeenLastCalledWith('MOBILE');

    await act(async () => {
      result.current.onChangePhoneNumber('11 91234 567');
    });
    expect(onValidationChange).toHaveBeenCalledTimes(2);
    expect(onValidationChange).toHaveBeenLastCalledWith(
      false,
      null,
      expect.objectContaining({ cca2: 'BR' })
    );
    expect(onPhoneNumberTypeChange).toHaveBeenCalledTimes(2);
    expect(onPhoneNumberTypeChange).toHaveBeenLastCalledWith(null);
  });

  test('a prefilled number is reported on mount', async () => {
    const onValidationChange = jest.fn();
    await renderHook(() =>
      usePhoneInput({ defaultPhoneNumber: '+5511912345678', onValidationChange })
    );
    expect(onValidationChange).toHaveBeenCalledTimes(1);
    expect(onValidationChange).toHaveBeenLastCalledWith(
      true,
      'MOBILE',
      expect.objectContaining({ cca2: 'BR' })
    );
  });
});
