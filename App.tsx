import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import PdfPicker from './components/PdfPicker';

const App = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
      <Text
        style={{
          color: 'black',
          fontWeight: '900',
          fontSize: 20,
        }}>
        PDF TEXT TO SPEECH
      </Text>
      <PdfPicker />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
