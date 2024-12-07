import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const Training = ({ navigation }) => {
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome, Jake</Text>
      </View>

      {/* Training Overview Section */}
      <Text style={styles.trainingOverview}>Training Overview</Text>
      <Text style={styles.description}>
        Complete your training using the course below and upload your certificate of completion.
      </Text>
      <Text style={styles.linkText}>Disability Inclusion Basics - General Staff</Text>

      {step === 1 && (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => navigation.navigate('UploadScreen')}
        >
          <Text style={styles.uploadButtonText}>
            Upload a PDF of your Understood Disability Inclusion Basics - General Staff Certificate
          </Text>
        </TouchableOpacity>
      )}

      {step === 2 && (
        <View style={styles.fileUploadedContainer}>
          <Text style={styles.fileUploadedText}>File Uploaded</Text>
          <TouchableOpacity>
            <Text style={styles.deleteFileText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <Text style={styles.pendingText}>Submitted, pending confirmation</Text>
      )}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={step === 3 ? () => navigation.navigate('VolunteerHome') : handleNextStep}
      >
        <Text style={styles.nextButtonText}>{step === 3 ? 'Go to Next Screen' : 'Submit'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
  },
  headerContainer: {
    width: Dimensions.get('window').width, // Ensures full screen width
    backgroundColor: '#174864',
    paddingVertical: 20,
    alignItems: 'left',
    justifyContent: 'left', // Ensures text is centered vertically
    marginBottom: 20,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
     padding: 20,
    fontWeight: '600',
    textAlign: 'left', // Centers text horizontally
  },
  trainingOverview: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 10,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
    paddingHorizontal: 20,
  },
  linkText: {
    fontSize: 14,
    color: '#174864',
    marginBottom: 30,
    textDecorationLine: 'underline',
    paddingHorizontal: 20,
  },
  uploadButton: {
    backgroundColor: '#174864',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
    margin: 20,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  fileUploadedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#174864',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  fileUploadedText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  deleteFileText: {
    color: '#FF6347',
    fontSize: 14,

  },
  pendingText: {
    fontSize: 14,
    color: '#FF6347',
    textAlign: 'center',
    marginBottom: 30,
  },
  nextButton: {
    backgroundColor: '#174864',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default Training;