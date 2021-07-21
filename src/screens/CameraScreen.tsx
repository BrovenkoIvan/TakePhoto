import React from 'react';
import {Platform} from 'react-native'
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParams';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type cameraScreenProp = StackNavigationProp<RootStackParamList, 'Camera'>;

const CameraScreen: React.FC = () => {
  const navigation = useNavigation<cameraScreenProp>();
  
  const takeImage = () => {
    launchCamera(
      {mediaType: 'photo'},
      (response: any) => {
        console.log(response)
        if (response.didCancel) {
          console.log('User cancelled image picker');
          navigation.navigate('Photo');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          navigation.navigate('Photo');
        } else {
          const sourse = {uri: response.assets[0].uri};
          storeData(sourse);
          navigation.navigate('Photo', {reload: true});
        }
      },
    );
  };

  const pickImage = () => {
    launchImageLibrary(
      {mediaType: 'photo', selectionLimit: 1},
      (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
          navigation.navigate('Photo');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
          navigation.navigate('Photo');
        } else {
          const sourse = {uri: response.assets[0].uri};
          storeData(sourse);
          navigation.navigate('Photo', {reload: true});
        }
      },
    );
  };
  const storeData = async (value: object) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@image', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  Platform.OS ==='ios' ?  pickImage() : takeImage()
  return null;
};

export default CameraScreen;
