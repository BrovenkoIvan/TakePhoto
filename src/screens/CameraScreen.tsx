import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParams';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

type cameraScreenProp = StackNavigationProp<RootStackParamList, 'Camera'>;

const CameraScreen: React.FC = () => {
  const navigation = useNavigation<cameraScreenProp>();
  
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
  pickImage();
  return null;
};

export default CameraScreen;
