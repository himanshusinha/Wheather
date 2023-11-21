import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 20,
    borderRadius: 10,
    width: '100%',
  },
  textInput: {paddingStart: 10, color: colors.WHITE},
  imageStyle: {
    width: 20,
    height: 20,
    tintColor: colors.WHITE,
  },
});
export default styles;
