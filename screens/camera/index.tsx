import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import { Camera } from 'expo-camera'
import { useRef } from 'react'
import { Entypo } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import useVision from '../../hooks/useVision'
import { SPACING } from '../../constants/styles'

const { width } = Dimensions.get('screen')

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>

export default function CameraModal({ navigation }: Props) {
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const cameraRef = useRef<Camera>(null)
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
      quality: 0.1,
      base64: true,
    })
    if (data && data.base64) {
      visualize(data.uri, data.base64)
      goToMenuGallery()
    }
  }

  const goToMenuGallery = () => {
    navigation.navigate('MenuGallery')
  }

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraWrapper}>
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.backButtonContainer}>
            <Pressable onPress={goBack}>
              <Entypo name="circle-with-cross" size={48} color="black" />
            </Pressable>
          </View>
        </Camera>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <View style={styles.cameraButton} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: SPACING.M,
    paddingTop: SPACING.M,
  },
  cameraWrapper: {
    width,
    aspectRatio: 3 / 4,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraButton: {
    height: 75,
    width: 75,
    backgroundColor: 'red',
    borderRadius: 50,
  },
})
