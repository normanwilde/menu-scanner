import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { COLOR, SPACING } from '../../constants/styles'
import { useMenu } from '../../contexts'
import { IMenuPage } from '../../typings/data'
import { Entypo } from '@expo/vector-icons'
import { impactAsync, ImpactFeedbackStyle } from 'expo-haptics'
import { deleteImageFromDocumentDirectory, menuStorage } from '../../utils'
import { documentDirectory } from 'expo-file-system'

const { width } = Dimensions.get('screen')

type Props = {
  menuPage: IMenuPage
  handlePress: (menuPage: IMenuPage) => void
}

export function PageCard({ menuPage, handlePress }: Props) {
  const { dispatch } = useMenu()

  const deletePage = () => {
    dispatch({ type: 'DELETE_PAGE', payload: { pageId: menuPage.id } })
    menuStorage.delete(menuPage.id)
    deleteImageFromDocumentDirectory(menuPage.photoFilePath)
  }

  const onPress = () => {
    impactAsync(ImpactFeedbackStyle.Light)
    handlePress(menuPage)
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      key={menuPage.photoFilePath}
      style={styles.container}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: documentDirectory + menuPage.photoFilePath }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.iconButton} onPress={deletePage}>
          <View style={styles.iconWrapper}>
            <Entypo
              name="cross"
              size={SPACING.XL}
              color={COLOR.backgroundInverse}
            />
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SPACING.L,
  },
  imageWrapper: {
    borderRadius: SPACING.XL,
    overflow: 'hidden',
  },
  image: {
    width: width * 0.8,
    aspectRatio: 3 / 4,
  },
  iconButton: {
    position: 'absolute',
    right: SPACING.L,
    top: SPACING.L,
  },
  iconWrapper: {
    backgroundColor: COLOR.backgroundTertiary,
    borderRadius: 100,
    opacity: 0.7,
    padding: SPACING.XS,
  },
})
