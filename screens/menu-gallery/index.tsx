import { View, StyleSheet, SectionList, ScrollView } from 'react-native'
import { useMenu } from '../../contexts'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { IMenuPage } from '../../typings/data'
import { CenteredLoader, StyledText } from '../../components'
import { CameraIcon } from './camera-icon'
import { COLOR, SPACING } from '../../constants/styles'
import { groupMenuPages } from '../../utils/menu-grouper'
import { useCallback, useMemo } from 'react'
import { StyledButton } from '../../components/styled-button'
import { PageCard } from './page-card'

type Props = NativeStackScreenProps<RootStackParamList, 'MenuGallery'>

export default function MenuGallery({ navigation }: Props) {
  const { state, dispatch } = useMenu()

  const clearPages = () => {
    dispatch({ type: 'CLEAR_PAGES' })
  }

  const sections = useMemo(() => {
    return groupMenuPages(state.pages)
  }, [state.pages])

  const renderItem = useCallback(
    ({ item }: { item: IMenuPage }) => {
      const handlePress = () => {
        navigation.navigate('MenuPage', { pageId: item.id })
      }
      return <PageCard menuPage={item} handlePress={handlePress} />
    },
    [navigation]
  )

  if (state.loading) {
    return <CenteredLoader />
  }

  return (
    <View style={styles.container}>
      {!state.pages.length && !state.loading ? (
        <ScrollView contentContainerStyle={styles.emptyContainer}>
          <StyledText size="HEADING_S">Your menu gallery is empty.</StyledText>
          <StyledText size="L">
            Take a photo of a menu and wait for the results.
          </StyledText>
        </ScrollView>
      ) : (
        <>
          {/* <StyledButton title="Clear Pages" onPress={clearPages} /> */}
          <SectionList
            sections={sections}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderSectionHeader={renderSectionHeader}
          />
        </>
      )}

      <CameraIcon />
    </View>
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

const keyExtractor = (item: IMenuPage) => item.id

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundPrimary,
    paddingTop: SPACING.L,
  },
  itemSeparator: {
    // height: 20,
  },

  sectionHeaderWrapper: {
    paddingHorizontal: SPACING.M,
  },
  emptyContainer: {
    flex: 1,
    padding: SPACING.L,
  },
})
