import React from 'react';
import styles from './styles';
import {ActivityIndicator, Dimensions, View} from 'react-native';
import colors from '../../constants/colors';

const Loader = () => {
  return (
    <View
      style={{
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '100%',
      }}>
      <View style={styles.indicatorStyle}>
        <ActivityIndicator size={'large'} color={colors.WHITE} />
      </View>
    </View>
  );
};

export default Loader;
