// WeatherScreen.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
import InputField from '../../components/input/InputField';
import styles from './styles';
import fetchWeatherData from '../../api/api';
import {useNavigation} from '@react-navigation/core';
import routes from '../../constants/routes';
import colors from '../../constants/colors';
import Loader from '../../components/loader/Loader';
import images from '../../constants/images';

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchDefaultWeatherData();
  }, []);

  const fetchDefaultWeatherData = async () => {
    try {
      const defaultCountry = 'Indore';
      const data = await fetchWeatherData(defaultCountry);

      console.log('Default Weather Data:', data);

      if (data) {
        setWeatherData(data);
        setApiData(data);
      } else {
        setWeatherData(null);
        setApiData(null);
      }
    } catch (error) {
      setWeatherData(null);
      setApiData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery === '') {
      setWeatherData(null);
    } else {
      try {
        const data = await fetchWeatherData(trimmedQuery);

        console.log('Search Weather Data:', data);

        if (data) {
          setWeatherData(data);
          setApiData(data);
        } else {
          setWeatherData(null);
          setApiData(null);
        }
      } catch (error) {
        setWeatherData(null);
        setApiData(null);
      }
    }
  };

  return (
    <ImageBackground blurRadius={5} source={images.image1} style={{flex: 1}}>
      <View>
        {loading ? (
          <Loader />
        ) : (
          <View style={{margin: 20, marginTop: 30}}>
            <InputField
              placeholder={'Search weather'}
              placeholderTextColor={colors.WHITE}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
              onEndEditing={handleSearch}
            />

            {apiData && weatherData ? (
              <FlatList
                contentContainerStyle={{
                  height: '100%',
                  position: 'relative',
                  bottom: Dimensions.get('window').height / 14,
                  justifyContent: 'flex-end',
                }}
                keyExtractor={(item, index) => `${item.key}_${index}`}
                data={[
                  {key: 'Place', value: apiData.name || 'N/A', title: 'Place'},
                  {
                    key: 'Temperature',
                    value: apiData.main?.temp || 'N/A',
                    title: 'Temperature',
                  },
                  {
                    key: 'Humidity',
                    value: apiData.main?.humidity || 'N/A',
                    title: 'Humidity',
                  },
                  {
                    key: 'Description',
                    value: apiData.weather[0]?.description || 'N/A',
                    title: 'Description',
                  },
                  {
                    key: 'Icon',
                    value: apiData.weather[0]?.icon || 'N/A',
                    title: 'Icon',
                  },
                ]}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(routes.WEATHER_DETAILS_SCREEN, {
                        data: apiData,
                      })
                    }>
                    <View>
                      {item.key === 'Icon' && (
                        <Image
                          source={{
                            uri: `https://openweathermap.org/img/wn/${item.value}@2x.png`,
                          }}
                          style={{
                            width: 100,
                            height: 100,
                            alignSelf: 'center',
                            bottom: Dimensions.get('window').height / 2.2,
                            tintColor: colors.WHITE,
                          }}
                        />
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        marginTop: 10,
                        top: Dimensions.get('window').height * 0.1,
                      }}>
                      <Text style={{color: colors.WHITE}}>
                        {item.key !== 'Icon' ? `${item.key}` : null}
                      </Text>
                      <Text style={{color: colors.WHITE}}>
                        {item.key !== 'Icon' ? ` ${item.value}` : null}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={{
                  height: Dimensions.get('window').height / 1.2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: colors.RED,

                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {weatherData === null
                    ? 'Error fetching data'
                    : 'No records found'}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default WeatherScreen;
