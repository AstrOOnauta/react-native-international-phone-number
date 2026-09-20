import React, { createRef } from 'react';
import { act, fireEvent, render, screen, userEvent } from '@testing-library/react-native';

import PhoneInput from '../lib/index.js';
import getExampleForCountry from '../lib/utils/getExampleForCountry.js';
import {
  getCountriesButtonAccessibilityLabel,
  getPhoneNumberInputAccessibilityLabel,
} from '../lib/utils/getTranslations.js';

const phoneInput = (language) =>
  screen.getByLabelText(getPhoneNumberInputAccessibilityLabel(language));
const countriesButton = (language) =>
  screen.getByRole('button', {
    name: getCountriesButtonAccessibilityLabel(language),
  });

async function pickCountry(user, name, cca2) {
  await user.press(countriesButton());
  await user.type(await screen.findByTestId('countrySelectSearchInput'), name);
  // The modal debounces the search by 150 ms.
  await user.press(await screen.findByTestId(`countrySelectItem-${cca2}`));
}

describe('placeholder', () => {
  test("shows the selected country's example number", async () => {
    await render(<PhoneInput defaultCountry="BR" />);
    expect(phoneInput()).toHaveProp('placeholder', getExampleForCountry('BR'));
  });

  test('an explicit placeholder wins', async () => {
    await render(<PhoneInput placeholder="Your phone" />);
    expect(phoneInput()).toHaveProp('placeholder', 'Your phone');
  });
});

describe('typing', () => {
  test('shows the number formatted as it is typed', async () => {
    const user = userEvent.setup();
    await render(<PhoneInput />);
    await user.type(phoneInput(), '11912345678');
    expect(phoneInput()).toHaveDisplayValue('11 91234 5678');
  });

  test('a digit after a complete number is ignored', async () => {
    const user = userEvent.setup();
    await render(<PhoneInput />);
    await user.type(phoneInput(), '559946897067');
    expect(phoneInput()).toHaveDisplayValue('55 99468 9706');
  });

  test('autofill without the leading + lands as the national number', async () => {
    const user = userEvent.setup();
    await render(<PhoneInput />);
    await user.paste(phoneInput(), '5511912345678');
    expect(phoneInput()).toHaveDisplayValue('11 91234 5678');
  });

  test('bidi marks pasted with the number are stripped', async () => {
    await render(<PhoneInput />);
    await fireEvent.changeText(phoneInput(), '‎11912345678‏');
    expect(phoneInput()).toHaveDisplayValue('11 91234 5678');
  });
});

describe('country picker', () => {
  test('picking a country updates the calling code, clears the input and notifies', async () => {
    const user = userEvent.setup();
    const onChangeCountry = jest.fn();
    await render(<PhoneInput onChangeCountry={onChangeCountry} />);
    await user.type(phoneInput(), '11912345678');

    // Uruguay is off the first rendered page, so finding it proves the search filtered.
    await pickCountry(user, 'Uruguay', 'UY');

    expect(onChangeCountry).toHaveBeenLastCalledWith(
      expect.objectContaining({ cca2: 'UY' })
    );
    expect(screen.getByText('+598')).toBeOnTheScreen();
    expect(phoneInput()).toHaveDisplayValue('');
    expect(screen.queryByTestId('countrySelectSearchInput')).not.toBeOnTheScreen();
  });

  test('disabled: the input is not editable and the picker does not open', async () => {
    const user = userEvent.setup();
    await render(<PhoneInput disabled />);
    expect(phoneInput()).toHaveProp('editable', false);
    await user.press(countriesButton());
    expect(screen.queryByTestId('countrySelectSearchInput')).not.toBeOnTheScreen();
  });

  test('modalDisabled: the input works but the picker does not open', async () => {
    const user = userEvent.setup();
    await render(<PhoneInput modalDisabled />);
    expect(phoneInput()).toHaveProp('editable', true);
    await user.press(countriesButton());
    expect(screen.queryByTestId('countrySelectSearchInput')).not.toBeOnTheScreen();
  });
});

describe('ref', () => {
  test('exposes the derived values and clears the input', async () => {
    const user = userEvent.setup();
    const ref = createRef();
    await render(<PhoneInput ref={ref} />);
    await user.type(phoneInput(), '11912345678');

    expect(ref.current.getInternationalPhoneNumber()).toBe('+5511912345678');
    expect(ref.current.isValidPhoneNumber).toBe(true);
    expect(ref.current.getCountry().cca2).toBe('BR');
    expect(ref.current.props.value).toBe('11 91234 5678');

    await act(async () => {
      ref.current.clear();
    });
    expect(phoneInput()).toHaveDisplayValue('');
  });
});

describe('props over time', () => {
  test('changing defaultCountry after mount clears the input', async () => {
    const user = userEvent.setup();
    await render(<PhoneInput defaultCountry="BR" />);
    await user.type(phoneInput(), '11912345678');

    await screen.rerender(<PhoneInput defaultCountry="US" />);

    expect(phoneInput()).toHaveDisplayValue('');
    expect(screen.getByText('+1')).toBeOnTheScreen();
  });

  test('the Brazil fallback is reported to the parent on mount', async () => {
    const onChangeCountry = jest.fn();
    await render(<PhoneInput onChangeCountry={onChangeCountry} />);
    expect(onChangeCountry).toHaveBeenCalledWith(
      expect.objectContaining({ cca2: 'BR' })
    );
  });
});

describe('accessibility', () => {
  test('labels follow the language prop', async () => {
    await render(<PhoneInput language="pt" />);
    expect(phoneInput('por')).toBeOnTheScreen();
    expect(countriesButton('por')).toBeOnTheScreen();
  });
});
