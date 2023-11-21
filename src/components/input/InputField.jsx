import React from 'react';
import {View, Image, TextInput} from 'react-native';
import styles from './styles';
import images from '../../constants/images';

const InputField = ({
  value,
  onChangeText,
  onSubmitEditing,
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
      onSubmitEditing={onSubmitEditing}
      keyboardType={keyboardType}
      placeholderTextColor={placeholderTextColor}
    />
  </View>
);

export default InputField;
