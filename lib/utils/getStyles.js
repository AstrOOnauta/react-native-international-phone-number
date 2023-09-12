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

export function getCountryPickerStyle(theme, height) {
  return theme === 'dark'
    ? {
        ...styles.darkCountryPicker,
        modal: {
          ...styles.darkCountryPicker.modal,
          height: height || '50%',
        },
      }
    : {
        ...styles.lightCountryPicker,
        modal: {
          ...styles.lightCountryPicker.modal,
          height: height || '50%',
        },
      };
}
