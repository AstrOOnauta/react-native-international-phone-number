import { Dimensions, StyleSheet } from 'react-native';

const containerBase = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 8,
  width: '100%',
  height: 45,
};

const flagContainerBase = {
  justifyContent: 'center',
  height: '99.5%',
  paddingHorizontal: 20,
  borderTopLeftRadius: 6,
  borderBottomLeftRadius: 6,
  flexDirection: 'row',
  alignItems: 'center',
};

const flagTextBase = {
  fontSize: 16,
  fontWeight: '500',
};

const inputBase = {
  width: Dimensions.get('window').width,
  paddingVertical: 8,
  paddingHorizontal: 16,
  fontSize: 16,
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
    marginRight: 10,
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

  lightCountryPicker: {
    modal: {
      backgroundColor: '#FFFFFF',
    },
    backdrop: {},
    line: {
      backgroundColor: 'transparent',
    },
    itemsList: {},
    textInput: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#AAAAAA',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 12,
      height: 46,
    },
    countryButtonStyles: {
      borderWidth: 1,
      borderColor: '#AAAAAA',
      marginVertical: 4,
      paddingVertical: 0,
    },
    searchMessageText: {},
    countryMessageContainer: {},
    flag: {
      color: '#FFFFFF',
    },
    dialCode: {},
    countryName: {},
  },
  darkCountryPicker: {
    modal: {
      backgroundColor: '#333333',
      borderWidth: 1,
    },
    backdrop: {},
    line: {
      backgroundColor: 'transparent',
    },
    itemsList: {},
    textInput: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#F3F3F3',
      color: '#F3F3F3',
      backgroundColor: '#333333',
      paddingHorizontal: 12,
      height: 46,
    },
    countryButtonStyles: {
      borderWidth: 1,
      borderColor: '#F3F3F3',
      backgroundColor: '#666666',
      marginVertical: 4,
      paddingVertical: 0,
    },
    searchMessageText: {},
    countryMessageContainer: {},
    flag: {
      color: '#FFFFFF',
      fontSize: 20,
    },
    dialCode: {
      color: '#F3F3F3',
    },
    countryName: {
      color: '#F3F3F3',
    },
  },
});

export default styles;
