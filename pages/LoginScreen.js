import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation(); // Hook to access the navigation object

  const handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        Alert.alert('Cancelled', 'Facebook login was cancelled');
        navigation.navigate('Login'); // Navigate back to the login screen if cancelled
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        Alert.alert('Error', 'Unable to obtain access token');
        return;
      }

      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      await auth().signInWithCredential(facebookCredential);
      Alert.alert('Success', 'Logged in with Facebook');
      navigation.navigate('UserManagement'); // Navigate to the next screen upon success
    } catch (error) {
      Alert.alert('Error', error.message);
      navigation.navigate('Login'); // Navigate back to the login screen if an error occurs
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TouchableOpacity style={styles.facebookButton} onPress={handleFacebookLogin}>
        <FontAwesome name="facebook" size={24} color="white" />
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton}>
        <FontAwesome name="google" size={24} color="white" />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Already a member? <Text style={styles.loginText}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8AABFF',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '400',
    marginBottom: 40,
    color: 'white',
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    paddingVertical: 12,
    marginBottom: 20,
    width: '90%',
    justifyContent: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#db4a39',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 40,
    width: '90%',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
    marginLeft: 10,
  },
  footerText: {
    fontSize: 20,
    color: 'white',
  },
  loginText: {
    color: '#0A74DA',
    fontWeight: '600',
  },
});
