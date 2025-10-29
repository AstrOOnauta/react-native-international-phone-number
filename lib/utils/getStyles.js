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
