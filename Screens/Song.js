import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { Footer } from '../Components/Footer'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import db from '../firebaseConfig'
import { doc, getDoc } from "firebase/firestore";
import { Audio } from "expo-av"

const backIcon = require('../assets/icons/arrow2.png');
const play = require('../assets/icons/play.png');
const pause = require('../assets/icons/pause.png');

SplashScreen.preventAutoHideAsync();

export function Song({ navigation, route }) {

  const screen = 'Song';
  const { musicId } = route.params;
  const [currentMusic, setCurrentMusic] = useState({});

  useEffect(() => {
    const getMusic = async () => {
      const docRef = doc(db, "musics", musicId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCurrentMusic(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };
    getMusic();
  }, [])

  const [sound, setSound] = useState();

  const [musicState, setMusicState] = useState(false);

  const playSound = async () => {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync({
      uri: currentMusic.musicFile
    });
    setSound(sound);
    console.log('Playing Sound');
    if (musicState === false) {
      await sound.playAsync();
      setMusicState(true);
    } else {
      await sound.pauseAsync();
      setMusicState(false);
    }
  }

  const [fontsLoaded] = useFonts({
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Medium': require('../assets/fonts/Raleway-Medium.ttf'),
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

        <View style={styles.srchHeader}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={backIcon} style={[styles.imgIcons, { marginRight: 10, }]} />
          </TouchableOpacity>
        </View>

        <View style={styles.shortLine}>
        </View>

        <View style={styles.bigBox}>
          <View style={styles.smallBox}>
            <Image source={{ uri: currentMusic.coverImg }} style={styles.smallBoxImg} />
          </View>
        </View>

        <Text style={styles.headText}>
          {currentMusic.music}
        </Text>

        <Text style={styles.subheadText}>
          {currentMusic.singer}
        </Text>

        <View style={styles.row}>
          <TouchableOpacity>
            <Image source={backIcon} style={styles.imgIcons} />
          </TouchableOpacity>

          <TouchableOpacity onPress={playSound}>
            <View style={styles.playBtn}>
              <Image source={musicState === true ? play : pause} style={[styles.imgIcons, { tintColor: '#000' }]} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={backIcon} style={[styles.imgIcons, { transform: [{ rotate: '180deg' }] }]} />
          </TouchableOpacity>


        </View>

        <View style={[styles.rowFull, { justifyContent: 'flex-start', gap: 15, }]}>
          <Text style={[styles.subheadText, { color: '#909090' }]}>0.24</Text>
          <Text style={[styles.subheadText, { color: '#909090' }]}>0.24</Text>
        </View>

      </View>
      <Footer navigation={navigation} screen={screen} />
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
    alignContent: 'center',
    alignItems: 'center',
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#000',
    zIndex: 999,
    width: '100%',
    alignSelf: 'center',
  },
  srchHeader: {
    height: 50,
    width: '100%',
    marginTop: 45,
    flexDirection: 'row',
    gap: 15,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imgIcons: {
    height: 30,
    width: 30,
    tintColor: '#fff',
  },
  hdrItems: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
  },
  shortLine: {
    height: 4,
    width: 80,
    backgroundColor: '#fff',
    marginTop: -20,
    borderRadius: 2,
  },
  bigBox: {
    height: '35%',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 40,
  },
  smallBox: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
  },
  smallBoxImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headText: {
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    fontSize: 28,
  },
  subheadText: {
    fontFamily: 'Raleway-Medium',
    color: '#fff',
    fontSize: 16,
    marginTop: -10,
  },
  row: {
    marginTop: 20,
    width: '60%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowFull: {
    marginTop: 20,
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  miniRow: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  playBtn: {
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  }
})