import React, { useState } from "react";
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, StatusBar, ActivityIndicator, ToastAndroid, AsyncStorage, Platform } from "react-native";
import colors from "../config/colors";
import axios from 'axios'
import { api_token } from "../config/config";


const LoginScreen = ({ navigation, route }) => {

  const [authData, setData] = useState({
    email: "",
    password: ""
  })

  const [indicator, setIndicator] = useState(false)


  const onChangeEmail = (val) => {
    setData({
      ...authData,
      email: val
    })
  }



  const onChangePassword = (val) => {
    setData({
      ...authData,
      password: val
    })
  }



  function handleLogin() {
    setIndicator(true)

    console.log(route.params.deviceToken)


    console.log(authData.email, authData.password)

    var data = {
      "email": authData.email,
      "password": authData.password,
      "api_token": api_token,
      "device_token": route.params.deviceToken,
      "device_type": Platform.OS
    }


    console.log("data", authData)

    var config = {
      method: 'post',
      url: 'https://dataxphilippines.com/api/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        setIndicator(false)
        if (response.data.success == false) {
          ToastAndroid.showWithGravity(response.data.message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
        }
        else {

          AsyncStorage.setItem("token", response.data.access_token)

          AsyncStorage.setItem("user_type", response.data.data.user_type)

          if (response.data.data.user_type == "user") {
            navigation.navigate("Root", {
              "token": response.data.access_token,
              "user_type": response.data.data.user_type
            })


          }
          else {
            navigation.navigate("RootAdmin", {
              "token": response.data.access_token,
              "user_type": response.data.data.user_type
            })


          }


        }
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        setIndicator(false)
        console.log(error.response.data);
      });
  }



  return (

    <View style={{ width: '100%', height: '100%', backgroundColor: colors.white }}>
      <StatusBar backgroundColor={colors.white} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', start: 20 }}>
          <Image style={{ width: 30, height: 30, }} source={require('../assets/IconLeft.png')} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, color: colors.black, textAlign: 'center' }}>
          Login
        </Text>
      </View>

      <Text style={{ fontSize: 16, color: colors.black, textAlign: 'center', marginTop: '20%' }}>
        Please enter you credentials to continue.
      </Text>

      <View style={{
        width: '90%', marginEnd: '5%', marginStart: '5%',
        borderRadius: 5, backgroundColor: '#fff',
        elevation: 3, marginTop: '15%', flexDirection: 'row', alignItems: 'center',
      }}>

        <TextInput
          style={{ paddingStart: 10, paddingEnd: 10, color: '#000', flex: 1 }}
          placeholderTextColor={colors.grey}
          placeholder="Email Address"
          onChangeText={onChangeEmail}
        />
        <Image style={{ width: 24, height: 24, resizeMode: 'contain', end: 10 }} source={require('../assets/mail.png')} />
      </View>

      <View style={{
        width: '90%', marginEnd: '5%',
        marginStart: '5%', borderRadius: 5, elevation: 3,
        marginTop: '10%', flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
      }}>
        <TextInput
          style={{ paddingStart: 10, paddingEnd: 10, color: '#000', flex: 1 }}
          placeholder="Password"
          placeholderTextColor={colors.grey}
          onChangeText={onChangePassword}

        />

        <Image style={{ width: 24, height: 24, resizeMode: 'contain', end: 10 }} source={require('../assets/lock.png')} />
      </View>



      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")} style={{ width: '90%', marginEnd: '5%', marginStart: '5%' }}>
        <Text style={{ fontSize: 16, marginStart: 5, color: colors.yellow, textAlign: 'right', marginTop: 20 }}>
          Forgot Password?
        </Text>

      </TouchableOpacity>

      <TouchableOpacity onPress={() => handleLogin()} style={{
        width: '90%', marginEnd: '5%', marginStart: '5%', borderRadius: 5,
        backgroundColor: colors.yellow, marginTop: '5%'
      }}>
        <Text style={{ fontSize: 16, color: colors.black, textAlign: 'center', marginTop: 15, marginBottom: 15 }}>
          Sign In
        </Text>
      </TouchableOpacity>

      <View style={{ position: 'relative', bottom: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '25%' }}>
        <Text style={{ fontSize: 16, color: colors.black, textAlign: 'center' }}>
          Don't have an Account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("NewSignup", {
        })}>
          <Text style={{ fontSize: 20, color: colors.brown, marginStart: 5, color: colors.yellow, marginTop: '2%' }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>


      {
        indicator ?
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'small'} color={colors.yellow} />
          </View> :

          null

      }

    </View>
  )
}

const styles = StyleSheet.create({

  header: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    elevation: 3,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});

export default LoginScreen;