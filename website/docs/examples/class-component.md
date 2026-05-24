---
id: class-component
title: Class Component
description: Use PhoneInput inside a React class component with controlled phone number and country state.
sidebar_position: 1
keywords:
  - react native phone input class component
  - PhoneInput class
---

# Class Component

```tsx
import React from 'react';
import {Text, View} from 'react-native';
import PhoneInput, {ICountry} from 'rn-international-phone-number';

type State = {
  phone: string;
  country: ICountry | null;
};

export default class App extends React.Component {
  state: State = {
    phone: '',
    country: null,
  };

  render() {
    return (
      <View style={{width: '100%', flex: 1, padding: 24}}>
        <PhoneInput
          value={this.state.phone}
          onChangePhoneNumber={(next) => this.setState({phone: next})}
          country={this.state.country}
          onChangeCountry={(nextCountry) =>
            this.setState({country: nextCountry})
          }
        />

        <Text style={{marginTop: 12}}>
          {`Country: ${this.state.country?.name?.common || '-'}
National: ${this.state.phone}`}
        </Text>
      </View>
    );
  }
}
```
