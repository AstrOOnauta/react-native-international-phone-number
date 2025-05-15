import { Platform } from 'react-native';

import styles from '../styles';

// Add this utility function at the top of the file
function ensureNumeric(value) {
  if (value === undefined || value === null) return undefined;
  const num = Number(value);
  return isNaN(num) ? undefined : num;
}

export function getContainerStyle(theme, containerStyle, disabled) {
  const baseStyle = theme === 'dark'
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
      };

  // Ensure all numeric values are numbers
  const processedStyle = {
    ...baseStyle,
    borderRadius: ensureNumeric(baseStyle.borderRadius),
    borderWidth: ensureNumeric(baseStyle.borderWidth),
    borderTopWidth: ensureNumeric(baseStyle.borderTopWidth),
    borderBottomWidth: ensureNumeric(baseStyle.borderBottomWidth),
    borderLeftWidth: ensureNumeric(baseStyle.borderLeftWidth),
    borderRightWidth: ensureNumeric(baseStyle.borderRightWidth),
    borderTopLeftRadius: ensureNumeric(baseStyle.borderTopLeftRadius),
    borderTopRightRadius: ensureNumeric(baseStyle.borderTopRightRadius),
    borderBottomLeftRadius: ensureNumeric(baseStyle.borderBottomLeftRadius),
    borderBottomRightRadius: ensureNumeric(baseStyle.borderBottomRightRadius),
  };

  return [processedStyle, containerStyle ? containerStyle : {}];
}

export function getFlagContainerStyle(theme, flagContainerStyle) {
  const baseStyle = theme === 'dark' ? styles.darkFlagButton : styles.lightFlagButton;
  
  const processedStyle = {
    ...baseStyle,
    borderRadius: ensureNumeric(baseStyle.borderRadius),
    borderWidth: ensureNumeric(baseStyle.borderWidth),
    borderTopWidth: ensureNumeric(baseStyle.borderTopWidth),
    borderBottomWidth: ensureNumeric(baseStyle.borderBottomWidth),
    borderLeftWidth: ensureNumeric(baseStyle.borderLeftWidth),
    borderRightWidth: ensureNumeric(baseStyle.borderRightWidth),
    borderTopLeftRadius: ensureNumeric(baseStyle.borderTopLeftRadius),
    borderTopRightRadius: ensureNumeric(baseStyle.borderTopRightRadius),
    borderBottomLeftRadius: ensureNumeric(baseStyle.borderBottomLeftRadius),
    borderBottomRightRadius: ensureNumeric(baseStyle.borderBottomRightRadius),
  };

  return [processedStyle, flagContainerStyle ? flagContainerStyle : {}];
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
  const baseStyle = theme === 'dark' ? styles.darkInput : styles.lightInput;
  
  const processedStyle = {
    ...baseStyle,
    borderRadius: ensureNumeric(baseStyle.borderRadius),
    borderWidth: ensureNumeric(baseStyle.borderWidth),
    borderTopWidth: ensureNumeric(baseStyle.borderTopWidth),
    borderBottomWidth: ensureNumeric(baseStyle.borderBottomWidth),
    borderLeftWidth: ensureNumeric(baseStyle.borderLeftWidth),
    borderRightWidth: ensureNumeric(baseStyle.borderRightWidth),
    borderTopLeftRadius: ensureNumeric(baseStyle.borderTopLeftRadius),
    borderTopRightRadius: ensureNumeric(baseStyle.borderTopRightRadius),
    borderBottomLeftRadius: ensureNumeric(baseStyle.borderBottomLeftRadius),
    borderBottomRightRadius: ensureNumeric(baseStyle.borderBottomRightRadius),
  };

  return [processedStyle, inputStyle ? inputStyle : {}];
}

export function getModalSectionTitleStyle(theme, modalStyle) {
  return [
    theme === 'dark'
      ? styles.darkModalSectionTitle
      : styles.lightModalSectionTitle,
    modalStyle?.sectionTitle ? modalStyle.sectionTitle : {},
  ];
}

export function getCountryPickerStyle(theme, height, modalStyle) {
  const themeStyle = theme === 'dark'
    ? styles.darkCountryPicker
    : styles.lightCountryPicker;

  const processStyle = (style) => {
    if (!style) return {};
    const processed = { ...style };
    
    // Ensure all numeric values are numbers
    processed.borderRadius = ensureNumeric(processed.borderRadius);
    processed.borderWidth = ensureNumeric(processed.borderWidth);
    processed.borderTopWidth = ensureNumeric(processed.borderTopWidth);
    processed.borderBottomWidth = ensureNumeric(processed.borderBottomWidth);
    processed.borderLeftWidth = ensureNumeric(processed.borderLeftWidth);
    processed.borderRightWidth = ensureNumeric(processed.borderRightWidth);
    processed.borderTopLeftRadius = ensureNumeric(processed.borderTopLeftRadius);
    processed.borderTopRightRadius = ensureNumeric(processed.borderTopRightRadius);
    processed.borderBottomLeftRadius = ensureNumeric(processed.borderBottomLeftRadius);
    processed.borderBottomRightRadius = ensureNumeric(processed.borderBottomRightRadius);
    
    return processed;
  };

  const countryPickerStyle = {
    ...themeStyle,
    modal: [
      processStyle(themeStyle.modal),
      { height: height || '50%' },
      Platform.OS === 'web'
        ? { padding: 25, borderRadius: 15, margin: 'auto' }
        : {},
      processStyle(modalStyle?.modal),
    ],
    backdrop: { ...themeStyle.backdrop, ...processStyle(modalStyle?.backdrop) },
    textInput: {
      ...processStyle(themeStyle.textInput),
      ...processStyle(modalStyle?.searchInput),
    },
    line: { ...themeStyle.line, ...processStyle(modalStyle?.divider) },
    itemsList: {
      ...themeStyle.itemsList,
      ...processStyle(modalStyle?.countriesList),
    },
    countryButtonStyles: {
      ...processStyle(themeStyle.countryButtonStyles),
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
