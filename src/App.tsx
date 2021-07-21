import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PhotoScreen from './screens/PhotoScreen';
import CameraScreen from './screens/CameraScreen';
import { RootStackParamList } from './screens/RootStackParams';
import 'react-native-gesture-handler';


const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Photo' component={PhotoScreen}/>
            <Stack.Screen name='Camera' component={CameraScreen} options={{header: () => false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
