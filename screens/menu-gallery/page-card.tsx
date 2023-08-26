import {
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native'
import { Image } from 'expo-image'
import { COLOR, SPACING } from '../../constants/styles'
import { StyledText } from '../../components'
import { useMenu } from '../../contexts/menu'
import { IMenuPage } from '../../typings/data'
import { Entypo } from '@expo/vector-icons'

const { width } = Dimensions.get('screen')

type Props = {
  menuPage: IMenuPage
  handlePress: (menuPage: IMenuPage) => void
}

export function PageCard({ menuPage, handlePress }: Props) {
  const { dispatch } = useMenu()

  const deletePage = () => {
    console.log('hole')
    dispatch({ type: 'DELETE_PAGE', payload: { pageId: menuPage.id } })
  }
  return (
    <TouchableHighlight
      onPress={() => handlePress(menuPage)}
      key={menuPage.photoUrl}
      style={styles.container}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: menuPage.photoUrl }} style={styles.image} />
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
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SPACING.L,
  },
  imageWrapper: {
    borderColor: COLOR.backgroundSecondary,
    borderWidth: 1,
    borderRadius: 40,
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
