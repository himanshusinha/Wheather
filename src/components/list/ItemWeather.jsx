import {View, Text, Image} from 'react-native';
import React from 'react';
import styles from './styles';

const ItemWheather = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Text>{item.key !== 'Icon' ? `${item.key}: ${item.value}` : null}</Text>
      {item.key === 'Icon' && item.value && (
        <View>
          <Image
            resizeMode="cover"
            source={{
              uri: `https://openweathermap.org/img/wn/${item.value}@2x.png`,
            }}
            style={styles.icon}
          />
        </View>
      )}
    </View>
  );
};

export default ItemWheather;
