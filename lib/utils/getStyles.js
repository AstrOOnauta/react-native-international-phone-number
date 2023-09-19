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

  const countryPickerStyle = {
    ...themeStyle,
    modal: {
      ...themeStyle.modal,
      height: height || '50%',
      ...modalStyle?.modal,
    },
    backdrop: { ...themeStyle.backdrop, ...modalStyle?.backdrop },
    textInput: {
      ...themeStyle.textInput,
      ...modalStyle?.searchInput,
    },
    line: { ...themeStyle.line, ...modalStyle?.divider },
    itemsList: {
      ...themeStyle.itemsList,
      ...modalStyle?.countriesList,
    },
    countryButtonStyles: {
      ...themeStyle.countryButtonStyles,
      ...modalStyle?.countryButton,
    },
    countryMessageContainer: {
      ...themeStyle.countryMessageContainer,
      ...modalStyle?.noCountryContainer,
    },
    searchMessageText: {
      ...themeStyle.searchMessageText,
      ...modalStyle?.noCountryText,
    },
    flag: { ...themeStyle.flag, ...modalStyle?.flag },
    dialCode: { ...themeStyle.dialCode, ...modalStyle?.callingCode },
    countryName: {
      ...themeStyle.countryName,
      ...modalStyle?.countryName,
    },
  };

  return countryPickerStyle;
}
