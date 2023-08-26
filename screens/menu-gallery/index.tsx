import {
  Pressable,
  View,
  StyleSheet,
  Dimensions,
  SectionList,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native'
import { Image } from 'expo-image'
import { useMenu } from '../../contexts/menu'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { IMenuPage } from '../../typings/data'
import { CenteredLoader, StyledText } from '../../components'
import { CameraIcon } from './camera-icon'
import { COLOR, SPACING } from '../../constants/styles'
import { groupMenuPages } from '../../utils/menu-grouper'
import { useMemo } from 'react'
import { StyledButton } from '../../components/styled-button'
import { PageCard } from './page-card'

type Props = NativeStackScreenProps<RootStackParamList, 'MenuGallery'>

export default function MenuGallery({ navigation }: Props) {
  const { state, dispatch } = useMenu()

  const goToMenu = (page: IMenuPage) => {
    navigation.navigate('MenuPage', { pageId: page.id })
  }

  const clearPages = () => {
    dispatch({ type: 'CLEAR_PAGES' })
  }

  const sections = useMemo(() => {
    return groupMenuPages(state.pages)
  }, [state.pages])

  if (state.loading) {
    return <CenteredLoader />
  }

  return (
    <View style={styles.container}>
      {!state.pages.length && !state.loading ? (
        <View style={{ flex: 1 }}>
          <StyledText size="HEADING_S">Your menu gallery is empty.</StyledText>
          <StyledText size="L">
            Take a photo of a menu and wait for the results.
          </StyledText>
        </View>
      ) : (
        <>
          <StyledButton title="Clear Pages" onPress={clearPages} />
          <SectionList
            sections={sections}
            renderItem={({ item }) => renderItem(item, goToMenu)}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderSectionHeader={renderSectionHeader}
          />
        </>
      )}

      <CameraIcon />
    </View>
  )
}

const renderItem = (
  menuPage: IMenuPage,
  handlePress: (menuPage: IMenuPage) => void
) => {
  return <PageCard menuPage={menuPage} handlePress={handlePress} />
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
    backgroundColor: COLOR.backgroundPrimary,
  },
  itemSeparator: {
    // height: 20,
  },

  sectionHeaderWrapper: {
    paddingHorizontal: SPACING.M,
  },
})
