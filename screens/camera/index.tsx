import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import { CameraView, useCameraPermissions } from 'expo-camera'
import { useRef } from 'react'
import { Entypo } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import useVision from '../../hooks/useVision'
import { COLOR, SPACING } from '../../constants/styles'
import * as Linking from 'expo-linking'

const { width } = Dimensions.get('screen')

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>

export default function CameraModal({ navigation }: Props) {
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef<CameraView>(null)
  const { visualize } = useVision()

  if (!permission) {
    // Camera permissions are still loading
    return <View />
  }

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

  const getPermission = () => {
    if (permission.canAskAgain) {
      requestPermission()
    } else {
      Linking.openSettings()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.backButtonContainer}>
        <Pressable onPress={goBack}>
          <Entypo name="cross" size={SPACING.XXL} color={COLOR.textPrimary} />
        </Pressable>
      </View>
      <View style={styles.cameraWrapper}>
        {permission.granted ? (
          <CameraView style={styles.camera} ref={cameraRef} />
        ) : (
          <Button
            color={COLOR.textSecondary}
            onPress={getPermission}
            title="Allow camera access"
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={takePhoto}
          disabled={!permission.granted}
        >
          <View
            style={[
              styles.cameraButton,
              {
                backgroundColor: permission.granted
                  ? 'red'
                  : COLOR.backgroundSecondary,
              },
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundPrimary,
  },
  backButtonContainer: {
    paddingLeft: SPACING.M,
  },
  cameraWrapper: {
    justifyContent: 'center',
    width,
    aspectRatio: 3 / 4,
    backgroundColor: COLOR.backgroundSecondary,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
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
