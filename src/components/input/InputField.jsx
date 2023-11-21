import React from 'react';
import {View, Image, TextInput} from 'react-native';
import styles from './styles';
import images from '../../constants/images';

const InputField = ({
  value,
  onChangeText,
  onEndEditing,
  placeholder,
  keyboardType,
  placeholderTextColor,
}) => (
  <View style={styles.input}>
    <Image source={images.search} style={styles.imageStyle} />
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onEndEditing={onEndEditing}
      keyboardType={keyboardType}
      placeholderTextColor={placeholderTextColor}
    />
  </View>
);

export default InputField;
