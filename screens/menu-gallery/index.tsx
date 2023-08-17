import {
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  SectionList,
} from 'react-native'
import { Image } from 'expo-image'
import { useMenu } from '../../contexts/menu'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { IMenuPage } from '../../typings/data'
import { StyledText } from '../../components'
import { CameraIcon } from './camera-icon'
import { SPACING } from '../../constants/styles'
import { groupMenuPages } from '../../utils/menu-grouper'

type Props = NativeStackScreenProps<RootStackParamList, 'MenuGallery'>

const { width } = Dimensions.get('screen')

export default function MenuGallery({ navigation }: Props) {
  const { state } = useMenu()

  const goToMenu = (page: IMenuPage) => {
    navigation.navigate('MenuPage', { page: page })
  }

  if (state.pages && state.pages.length === 0 && !state.loading) {
    return (
      <View>
        <StyledText size="HEADING_S">Your menu gallery is empty.</StyledText>
        <StyledText size="L">
          Take a photo of a menu and wait for the results.
        </StyledText>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupMenuPages(state.pages)}
        renderItem={({ item }) => renderItem(item, goToMenu)}
        keyExtractor={(item) => item.photoUrl}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderSectionHeader={renderSectionHeader}
      />
      <CameraIcon />
    </View>
  )
}

const renderItem = (
  menuPage: IMenuPage,
  handlePress: (menuPage: IMenuPage) => void
) => {
  return (
    <Pressable
      onPress={() => handlePress(menuPage)}
      key={menuPage.photoUrl}
      style={styles.itemContainer}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: menuPage.photoUrl }} style={styles.image} />
      </View>
    </Pressable>
  )
}

const renderSectionHeader = ({
  section: { title },
}: {
  section: { title: string }
}) => {
  const date = new Date(Number(title))
  const visibleDate = date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  })
  return (
    <View style={styles.sectionHeaderWrapper}>
      <StyledText size="L">{visibleDate}</StyledText>
    </View>
  )
}

const ItemSeparatorComponent = () => {
  return <View style={styles.itemSeparator} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemSeparator: {
    // height: 20,
  },
  itemContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.L,
  },
  imageWrapper: {
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    overflow: 'hidden',
  },
  image: {
    width: width * 0.8,
    aspectRatio: 3 / 4,
  },
  sectionHeaderWrapper: {
    paddingHorizontal: SPACING.M,
  },
})
