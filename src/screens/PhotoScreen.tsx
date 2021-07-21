import React, {useState, useEffect} from 'react';
import {Button, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {useNavigation, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParams';
import AsyncStorage from '@react-native-async-storage/async-storage';

type photoScreenProp = StackNavigationProp<RootStackParamList, 'Photo'>;
type photoScreenRouteProp = RouteProp<RootStackParamList, 'Photo'>;

type Props = {
  route: photoScreenRouteProp;
};

const PhotoScreen: React.FC<Props> = ({route}) => {
  const navigation = useNavigation<photoScreenProp>();
  const {container, imageContainer, imageWrap} = styles;
  const [image, setImage] = useState({});

  useEffect(() => {
    getData();
  }, [route.params]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@image');
      if (jsonValue) {
        setImage(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={container}>
      <Button
        title="Open Camera"
        onPress={() => navigation.navigate('Camera')}
      />
      <View style={imageContainer}>
        <Image source={image} style={imageWrap} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  imageContainer: {
    width: '85%',
    height: '85%',
  },
  imageWrap: {
    width: '100%',
    height: '100%',
  },
});

export default PhotoScreen;
