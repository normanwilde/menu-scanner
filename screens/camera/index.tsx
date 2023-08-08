import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from 'react-native'
import { Camera } from 'expo-camera'
import { useRef } from 'react'
import { Entypo } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  BottomTabParamList,
  RootStackParamList,
} from '../../typings/navigators'
import { useMenu } from '../../contexts/menu'
import useVision from '../../hooks/useVision'

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>

export default function CameraModal({ navigation }: Props) {
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const cameraRef = useRef<Camera>(null)
  const { dispatch } = useMenu()
  const { visualize } = useVision()

  if (!permission) {
    // Camera permissions are still loading
    return <View />
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    )
  }

  /* Handlers */
  const takePhoto = async () => {
    const data = await cameraRef?.current?.takePictureAsync({
      quality: 0.5,
      base64: true,
    })
    if (data && data.base64) {
      visualize(data.uri, data.base64)
      goToMenuGallery()
    }
  }

  const goToMenuGallery = () => {
    navigation.navigate('MenuStack', { screen: 'MenuGallery' })
  }

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={goBack}>
        <Entypo name="circle-with-cross" size={24} color="black" />
      </Pressable>
      <Camera style={styles.camera} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
})
