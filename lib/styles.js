import { Platform, StyleSheet, I18nManager } from 'react-native';

const containerBase = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 8,
  width: '100%',
};

const flagContainerBase = {
  justifyContent: 'center',
  height: '100%',
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderTopLeftRadius: 7,
  borderBottomLeftRadius: 7,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
};

const caretBase = {
  width: 0,
  height: 0,
  borderWidth: 7,
  borderBottomWidth: 0,
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
};

const dividerBase = {
  width: 1,
  height: '100%',
  marginHorizontal: 4,
};

const flagTextBase = {
  fontSize: 16,
  fontWeight: '500',
};

const inputBase = {
  flex: 1,
  width: '100%',
  height: '100%',
  paddingVertical: 8,
  paddingHorizontal: 16,
  fontSize: 16,
  writingDirection: 'ltr',
  textAlign: I18nManager.isRTL ? 'right' : 'left',
};

const styles = StyleSheet.create({
  lightContainer: {
    ...containerBase,
    backgroundColor: '#FFFFFF',
    borderColor: '#AAAAAA',
  },
  darkContainer: {
    ...containerBase,
    backgroundColor: '#575757',
    borderColor: '#F3F3F3',
  },
  lightFlagButton: {
    ...flagContainerBase,
    backgroundColor: '#F3F3F3',
  },
  darkFlagButton: {
    ...flagContainerBase,
    backgroundColor: '#808080',
  },
  flag: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily:
      Platform.OS === 'web'
        ? typeof navigator !== 'undefined' &&
          navigator?.userAgent?.includes('Win')
          ? 'TwemojiMozilla'
          : 'System'
        : 'System',
  },
  lightCaret: {
    ...caretBase,
    borderTopColor: '#0A0A0A',
  },
  darkCaret: {
    ...caretBase,
    borderTopColor: '#F3F3F3',
  },
  lightDivider: {
    ...dividerBase,
    backgroundColor: '#AAAAAA',
  },
  darkDivider: {
    ...dividerBase,
    backgroundColor: '#F3F3F3',
  },
  lightFlagText: {
    ...flagTextBase,
    color: '#0A0A0A',
  },
  darkFlagText: {
    ...flagTextBase,
    color: '#F3F3F3',
  },
  lightInput: {
    ...inputBase,
    color: '#0A0A0A',
  },
  darkInput: {
    ...inputBase,
    color: '#F3F3F3',
  },
});

export default styles;
