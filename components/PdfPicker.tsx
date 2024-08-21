import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import Tts from 'react-native-tts';

const PdfPicker = () => {
  const [pickedFile, setpickedFile] = useState<any>(null);
  const [selectedText, setselectedText] = useState('');
  const [startReading, setstartReading] = useState(false);
  const pickPdf = async () => {
    try {
      // Pick a single PDF file
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      // Log the file information
      console.log('Picked file:', res);
      setpickedFile(res);
      // Send the file to the API
      const formData = new FormData();
      formData.append('file', {
        uri: res[0].uri,
        type: res[0].type,
        name: res[0].name,
      });

      // Replace with your API URL
      const apiUrl = 'http://10.0.2.2:4000/get-text';

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle the response
      // console.log('Extracted text:', response.data);
      setselectedText(response.data);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      }
    }
  };
  console.log(pickedFile, 'pickedFile');
  const readPdfOutLoud = () => {
    Tts.speak(selectedText);
    setstartReading(true);
  };

  const stopReading = () => {
    Tts.stop();
    setstartReading(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickPdf}>
        {pickedFile !== null ? (
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
              {pickedFile[0].name}
            </Text>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 16}}>
              {pickedFile[0].size} KB
            </Text>
          </View>
        ) : (
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
            SELECT PDF
          </Text>
        )}
      </TouchableOpacity>
      {startReading ? (
        <TouchableOpacity
          style={{
            backgroundColor: 'blueviolet',
            height: 40,
            width: '100%',

            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            borderRadius: 4,
          }}
          onPress={stopReading}>
          <Text style={{color: 'white'}}>Stop reading</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: 'blueviolet',
            height: 40,
            width: '100%',

            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            borderRadius: 4,
          }}
          onPress={readPdfOutLoud}>
          <Text style={{color: 'white'}}>Read Pdf</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  button: {
    height: '50%',
    width: '99%',
    backgroundColor: 'gainsboro',
    borderStyle: 'dashed',
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PdfPicker;
