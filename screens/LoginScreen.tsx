import { FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

import { User } from '../model/UserModel';
import UserModel from '../model/UserModel';
import { saveToStorage } from '../services/asyncStoraage.service';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';
export const LoginScreen: FC<{
  route: any;
  navigation: any;
  loadUser?: any;
}> = ({ route, navigation, loadUser }) => {
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    name: '',
    image: '',
  });
  const [msg, setMsg] = useState('');
  //   GoogleSignin.configure({
  //     webClientId:
  //       '710942905986-qaehumf27ft2m1ipg7s1tvtnbvmq9osg.apps.googleusercontent.com',
  //     iosClientId:
  //       '710942905986-li8m30nlbdf7tkivdmemklkg5h8q1cd0.apps.googleusercontent.com',
  //   });
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const handleSubmit = async () => {
    if (mode === 'login') {
      if (!user.email || !user.password) {
        setMsg('Must fill Both Fields');
        return;
      }
      const res = await UserModel.login(user);
      console.log('inside login', { res });
      if (res?.err) {
        setMsg(res.err);
      } else {
        setMsg('');
        const { accessToken, refreshToken } = res;
        await saveToStorage('accessToken', accessToken);
        await saveToStorage('refreshToken', refreshToken);
        loadUser();
      }
    } else {
      if (!user.email || !user.password || !user.name) {
        setMsg('Must fill All Fields');
        return;
      }
      const res: any = await UserModel.register(user);
      console.log('inside register', res.data);
      if (!res?.data?.err) {
        setMode('login');
        setMsg('');
      }else{
        setMsg(res?.data?.err);

      }
      resetForm();
    }
  };

  function resetForm() {
    setUser({ email: '', password: '', name: '' });
  }

  useEffect(() => {
    resetForm();
    setMsg('');
  }, [mode]);

  const openCamera = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const image = res.assets[0].uri;
        setUser({ ...user, image });
      }
    } catch (err) {
      console.log('open camera error:' + err);
    }
  };

  const openGallery = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const image = res.assets[0].uri;
        setUser({ ...user, image });
      }
    } catch (err) {
      console.log('open camera error:' + err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ width: '80%', alignSelf: 'center' }}>
        {mode === 'register' && (
          <View>
            {!user.image && (
              <Image
                source={require('../assets/ava.png')}
                style={styles.avatar}
              ></Image>
            )}
            {user.image && (
              <Image source={{ uri: user.image }} style={styles.avatar}></Image>
            )}
            <TouchableOpacity onPress={openCamera}>
              <Ionicons name={'camera'} style={styles.cameraButton} size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={openGallery}>
              <Ionicons name={'image'} style={styles.galleryButton} size={50} />
            </TouchableOpacity>
          </View>
        )}
        {mode === 'register' && (
          <TextInput
            style={styles.input}
            value={user.name}
            placeholder='Enter Name'
            onChangeText={(name: string) => setUser({ ...user, name })}
          />
        )}
        <TextInput
          placeholder='Enter Email'
          value={user.email}
          style={styles.input}
          onChangeText={(email: string) => setUser({ ...user, email })}
        />

        <TextInput
          style={styles.input}
          value={user.password}
          placeholder='Enter Password'
          onChangeText={(password: string) => setUser({ ...user, password })}
        />
        {msg && <Text style={styles.err}>{msg} </Text>}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>{mode}</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginRight: 15 }}>
            {mode === 'login'
              ? 'Dont have an account?'
              : 'Already Have Account?'}
          </Text>
          <Text
            style={{
              textTransform: 'capitalize',
              color: 'blue',
              fontWeight: 'bold',
            }}
            onPress={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'register' : 'login'}
          </Text>
        </View>

        {/* <TouchableOpacity style={styles.button} onPress={onGoogleButtonPress}>
          <Text style={styles.buttonText}>Sign In With Google</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  err: {
    color: 'red',
    fontSize: 14,
    marginHorizontal: 12,
  },
  avatar: {
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '100%',
  },
  cameraButton: {
    position: 'absolute',
    bottom: -10,
    left: 10,
    width: 50,
    height: 50,
  },
  galleryButton: {
    position: 'absolute',
    bottom: -10,
    right: 10,
    width: 50,
    height: 50,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  buttonesContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 12,
    padding: 12,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});

async function onGoogleButtonPress() {
  console.log('here onGoogleButtonPress ');
  try {
    // const userInfo = await GoogleSignin.signIn();
    // console.log({ userInfo });
  } catch (error: any) {
    console.log({ error });
  }
}
