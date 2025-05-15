import { Platform } from 'react-native';

import styles from '../styles';

export function getContainerStyle(theme, containerStyle, disabled) {
  return [
    theme === 'dark'
      ? {
          ...styles.darkContainer,
          backgroundColor: disabled
            ? '#858585'
            : styles.darkContainer.backgroundColor,
        }
      : {
          ...styles.lightContainer,
          backgroundColor: disabled
            ? '#E3E3E3'
            : styles.lightContainer.backgroundColor,
        },
    containerStyle ? containerStyle : {},
  ];
}

export function getFlagContainerStyle(theme, flagContainerStyle) {
  return [
    theme === 'dark' ? styles.darkFlagButton : styles.lightFlagButton,
    flagContainerStyle ? flagContainerStyle : {},
  ];
}

export function getFlagStyle(flagStyle) {
  return [styles.flag, flagStyle ? flagStyle : {}];
}

export function getCaretStyle(theme, caretStyle) {
  return [
    theme === 'dark' ? styles.darkCaret : styles.lightCaret,
    caretStyle?.color !== undefined
      ? {
          borderTopColor: caretStyle?.color,
        }
      : {},
    caretStyle?.fontSize !== undefined
      ? { borderWidth: caretStyle?.fontSize * 0.45 }
      : {},
    caretStyle && caretStyle?.display === 'none'
      ? { display: 'none', borderWidth: 0 }
      : {},
  ];
}

export function getDividerStyle(theme, dividerStyle) {
  return [
    theme === 'dark' ? styles.darkDivider : styles.lightDivider,
    dividerStyle ? dividerStyle : {},
  ];
}

export function getFlagTextStyle(theme, flagTextStyle) {
  return [
    theme === 'dark' ? styles.darkFlagText : styles.lightFlagText,
    flagTextStyle ? flagTextStyle : {},
  ];
}

export function getInputStyle(theme, inputStyle) {
  return [
    theme === 'dark' ? styles.darkInput : styles.lightInput,
    inputStyle ? inputStyle : {},
  ];
}

export function getCountryPickerStyle(theme, height, modalStyle) {
  const themeStyle =
    theme === 'dark'
      ? styles.darkCountryPicker
      : styles.lightCountryPicker;

  // Ensure borderRadius values are numbers
  const processStyle = (style) => {
    if (!style) return {};
    const processed = { ...style };
    if (typeof processed.borderRadius === 'string') {
      processed.borderRadius = parseFloat(processed.borderRadius);
    }
    if (typeof processed.borderTopLeftRadius === 'string') {
      processed.borderTopLeftRadius = parseFloat(processed.borderTopLeftRadius);
    }
    if (typeof processed.borderTopRightRadius === 'string') {
      processed.borderTopRightRadius = parseFloat(processed.borderTopRightRadius);
    }
    if (typeof processed.borderBottomLeftRadius === 'string') {
      processed.borderBottomLeftRadius = parseFloat(processed.borderBottomLeftRadius);
    }
    if (typeof processed.borderBottomRightRadius === 'string') {
      processed.borderBottomRightRadius = parseFloat(processed.borderBottomRightRadius);
    }
    return processed;
  };

  const countryPickerStyle = {
    ...themeStyle,
    modal: [
      {
        ...themeStyle.modal,
      },
      { height: height || '50%' },
      Platform.OS === 'web'
        ? { padding: 25, borderRadius: 15, margin: 'auto' }
        : {},
      processStyle(modalStyle?.modal),
    ],
    backdrop: { ...themeStyle.backdrop, ...processStyle(modalStyle?.backdrop) },
    textInput: {
      ...themeStyle.textInput,
      ...processStyle(modalStyle?.searchInput),
    },
    line: { ...themeStyle.line, ...processStyle(modalStyle?.divider) },
    itemsList: {
      ...themeStyle.itemsList,
      ...processStyle(modalStyle?.countriesList),
    },
    countryButtonStyles: {
      ...themeStyle.countryButtonStyles,
      ...processStyle(modalStyle?.countryButton),
    },
    countryMessageContainer: {
      ...themeStyle.countryMessageContainer,
      ...processStyle(modalStyle?.noCountryContainer),
    },
    searchMessageText: {
      ...themeStyle.searchMessageText,
      ...processStyle(modalStyle?.noCountryText),
    },
    flag: { ...themeStyle.flag, ...processStyle(modalStyle?.flag) },
    dialCode: { ...themeStyle.dialCode, ...processStyle(modalStyle?.callingCode) },
    countryName: {
      ...themeStyle.countryName,
      ...processStyle(modalStyle?.countryName),
    },
  };

  return countryPickerStyle;
}
