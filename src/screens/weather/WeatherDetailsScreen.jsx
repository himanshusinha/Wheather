// WeatherDetailsScreen.js
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';
import {useRoute} from '@react-navigation/core';
import styles from './styles';
import colors from '../../constants/colors';
import {fetchWeatherMonthlyData, fetchWeatherWeeklyData} from '../../api/api';
import Loader from '../../components/loader/Loader';
import images from '../../constants/images';

const WeatherDetailsScreen = () => {
  const route = useRoute();
  const apiData = route.params?.data || {};
  const [weatherData, setWeatherData] = useState([]);
  const [monthlyData, setMonthlyData] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDefaultWeatherData();
    fetchDefaultMonthlyData();
  }, []);

  const fetchDefaultWeatherData = async () => {
    try {
      const cityName = 'Indore';
      const data = await fetchWeatherWeeklyData(cityName);

      console.log('Weekly Weather Data:', JSON.stringify(data));

      if (data && data.list) {
        setWeatherData(data.list);
        setLoading(false);
      } else {
        setWeatherData([]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching default weather data:', error);
      setWeatherData([]);
      setLoading(false);
    }
  };

  const fetchDefaultMonthlyData = async () => {
    try {
      const cityName = 'Indore';
      const data = await fetchWeatherMonthlyData(cityName);

      console.log('Weekly Weather Data:', JSON.stringify(data));

      if (data && data.list) {
        setMonthlyData(data.list);
        setLoading(false);
      } else {
        setMonthlyData([]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching default weather data:', error);
      setMonthlyData([]);
      setLoading(false);
    }
  };

  const convertToCelsius = kelvin => {
    return (kelvin - 273.15).toFixed(2);
  };
  const formatDateString = dateString => {
    const options = {day: 'numeric', month: 'numeric', year: 'numeric'};
    const formattedDate = new Date(dateString).toLocaleDateString(
      'en-GB',
      options,
    );
    return formattedDate;
  };
  const renderItem = ({item}) => (
    <View
      style={{
        padding: 10,
        marginTop: 20,
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: colors.WHITE,
        marginHorizontal: 10,
        height: 200,
      }}>
      <Image
        resizeMode="contain"
        source={{
          uri: `https://openweathermap.org/img/wn/${apiData.weather[0]?.icon}@2x.png`,
        }}
        style={{
          width: 100,
          height: 100,
          alignSelf: 'center',
        }}
      />
      <Text>Date: {formatDateString(item.dt_txt)}</Text>
      <Text>Temperature: {convertToCelsius(item.main.temp)} C</Text>
      <Text>Weather: {item.weather[0].description}</Text>
      <Text>City: {apiData.name}</Text>
    </View>
  );

  const renderMonthlyItem = ({item}) => (
    <View
      style={{
        padding: 10,
        marginTop: 20,
        borderBottomColor: '#ccc',
        backgroundColor: colors.WHITE,
        marginHorizontal: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        height: 200,
        borderRadius: 10,
      }}>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${apiData.weather[0]?.icon}@2x.png`,
        }}
        style={{
          width: 100,
          height: 100,
          alignSelf: 'center',
        }}
      />
      <Text>Date: {formatDateString(item.dt_txt)}</Text>
      <Text>Temperature: {convertToCelsius(item.main.temp)} C</Text>
      <Text>Weather: {item.weather[0].description}</Text>
      <Text>City: {apiData.name}</Text>
    </View>
  );

  return (
    <ImageBackground blurRadius={5} source={images.image2} style={{flex: 1}}>
      <View>
        {loading ? (
          <Loader /> // Replace with your actual Loader component
        ) : (
          <>
            <View style={{margin: 20, marginTop: 20}}>
              <View>
                <Image
                  source={{
                    uri:
                      apiData.weather &&
                      apiData.weather[0] &&
                      apiData.weather[0]?.icon
                        ? `https://openweathermap.org/img/wn/${apiData.weather[0]?.icon}@2x.png`
                        : 'default_image_url', // Replace 'default_image_url' with a fallback image URL or handle it as needed
                  }}
                  style={{
                    width: 100,
                    height: 100,
                    alignSelf: 'center',
                    tintColor: colors.WHITE,
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  marginTop: 10,
                  top: Dimensions.get('window').height * 0.17,
                }}>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: colors.WHITE}}>Name</Text>
                    <Text style={{color: colors.WHITE}}>{apiData.name}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: colors.WHITE}}>Temperature</Text>

                    <Text style={{color: colors.WHITE}}>
                      {apiData.main?.temp}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: colors.WHITE}}>Humidity</Text>

                    <Text style={{color: colors.WHITE}}>
                      {apiData.main?.humidity}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: colors.WHITE}}>Description</Text>

                    <Text style={{color: colors.WHITE}}>
                      {apiData.weather[0]?.description}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginHorizontal: 10, top: 160}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.WHITE,
                }}>
                Weekly Forecast
              </Text>
            </View>
            {weatherData.length > 0 ? (
              <FlatList
                contentContainerStyle={{marginTop: 150}}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={weatherData}
                renderItem={renderItem}
                keyExtractor={item => item.dt.toString()}
              />
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  color: colors.RED,
                  marginHorizontal: 10,
                  marginTop: 10,
                }}>
                No weekly forecast data available
              </Text>
            )}
            {monthlyData.length > 0 && (
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginTop: 10,
                    color: colors.WHITE,
                    marginHorizontal: 10,
                  }}>
                  Next 16 Days Forecast
                </Text>
                <FlatList
                  contentContainerStyle={{
                    marginBottom: 20,
                    bottom: 10,
                  }}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={monthlyData}
                  renderItem={renderMonthlyItem}
                  keyExtractor={item => item.dt.toString()}
                />
              </View>
            )}
          </>
        )}
      </View>
    </ImageBackground>
  );
};

export default WeatherDetailsScreen;
