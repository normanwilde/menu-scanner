import { StyleSheet, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import DishCard from './dish-card'
import { IMenuItem } from '../../typings/data'
import { COLOR, SPACING } from '../../constants/styles'
import { useMenu } from '../../contexts/menu'
import { useMemo } from 'react'
import { CenteredLoader } from '../../components'
import Animated from 'react-native-reanimated'

type Props = NativeStackScreenProps<RootStackParamList, 'MenuPage'>

export default function MenuPage({ route }: Props) {
  const { pageId } = route.params
  const { state } = useMenu()
  const menuItems = useMemo(() => {
    return state.pages.find((page) => page.id === pageId)?.menuItems
  }, [pageId, state.pages])

  if (state.loading) {
    return <CenteredLoader />
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={menuItems}
        renderItem={({ item }) => renderItem(pageId, item)}
        style={styles.flatList}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  )
}

const renderItem = (pageId: string, menuItem: IMenuItem) => {
  return <DishCard pageId={pageId} menuItem={menuItem} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.backgroundPrimary,
  },
  flatList: {
    flex: 1,
  },
  flatListContent: {
    paddingVertical: SPACING.L,
    paddingHorizontal: SPACING.S,
  },
})
