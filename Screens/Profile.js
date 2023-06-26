import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Footer } from '../Components/Footer'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export function Profile({ navigation }) {

  const screen = 'Profile';

  const [fontsLoaded] = useFonts({
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'bookanti': require('../assets/fonts/bookanti.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.subCont}>
        <Text>
          This is Profile Screen.
        </Text>
      </View>
      <Footer navigation={navigation} screen={screen}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7f7eae',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  subCont: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(000, 000, 000, 0.4)',
    padding: 20,
    gap: 20,
    paddingBottom: 70,
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#000',
    zIndex: 999,
    width: '100%',
    alignSelf: 'center',
  }
})