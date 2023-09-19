import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IModalStyle {
  // Styles for whole modal [View]
  modal?: StyleProp<ViewStyle>;
  // Styles for modal backdrop [View]
  backdrop?: StyleProp<ViewStyle>;
  // Styles for search input [TextInput]
  searchInput?: StyleProp<TextStyle>;
  // Styles for the divider between the input and the countries list [View]
  divider?: StyleProp<ViewStyle>;
  // Styles for countries list [FlatList]
  countriesList?: StyleProp<ViewStyle>;
  // Styles for country button [TouchableOpacity]
  countryButton?: StyleProp<ViewStyle>;
  // Styles for country not found message container [View]
  noCountryContainer?: StyleProp<ViewStyle>;
  // Styles for country not found message [Text]
  noCountryText?: StyleProp<TextStyle>;
  // Flag styles [Text]
  flag?: StyleProp<TextStyle>;
  // Calling/Dial code styles [Text]
  callingCode?: StyleProp<TextStyle>;
  // Country name styles [Text]
  countryName?: StyleProp<TextStyle>;
}
