import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface IPhoneInputStyles {
  // Styles for whole modal [View]
  container?: StyleProp<ViewStyle>;
  // Styles for modal backdrop [View]
  flagContainer?: StyleProp<ViewStyle>;
  // Flag styles [Text]
  flag?: StyleProp<TextStyle>;
  // Caret (dropdown icon) styles [Text]
  caret?: StyleProp<TextStyle>;
  // Divider between caret and callingCode [View]
  divider?: StyleProp<ViewStyle>;
  // Calling/Dial code styles [Text]
  callingCode?: StyleProp<TextStyle>;
  // Styles for search input [TextInput]
  input?: StyleProp<TextStyle>;
}
