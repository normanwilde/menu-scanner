import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../typings/navigators'
import { LANGUAGES } from '../../constants/data'
import { StyledText } from '../../components'
import { Entypo } from '@expo/vector-icons'
import { COLOR, SPACING } from '../../constants/styles'
import { useMenu } from '../../contexts/menu'
import { Language, LanguageCode } from '../../typings/data'

type Props = NativeStackScreenProps<RootStackParamList, 'LanguageSelector'>

interface ILanguageItem {
  code: LanguageCode
  languageName: string
}

export default function LanguageSelector({ navigation }: Props) {
  const { state, dispatch } = useMenu()

  const languageArray = Object.entries(LANGUAGES).map(
    ([code, languageName]) => {
      return {
        code,
        languageName,
      }
    }
  ) as ILanguageItem[]

  const selectLanguage = (language: LanguageCode) => {
    dispatch({ type: 'SET_LANGUAGE', payload: language })
    setTimeout(() => {
      navigation.goBack()
    }, 200)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={languageArray}
        renderItem={({ item }) =>
          renderItem(item, state.targetLanguage, selectLanguage)
        }
        keyExtractor={(item) => item.code}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={styles.flatListContent}
        contentInsetAdjustmentBehavior="automatic" // Used for largeHeaderTitle
      />
    </View>
  )
}

const renderItem = (
  item: ILanguageItem,
  selectedItemCode: LanguageCode,
  selectLanguage: (languageName: LanguageCode) => void
) => {
  const isSelected = selectedItemCode === item.code
  return (
    <Pressable onPress={() => selectLanguage(item.code)}>
      <View
        style={[
          styles.row,
          {
            backgroundColor: isSelected
              ? COLOR.accentPrimary
              : COLOR.backgroundPrimary,
          },
        ]}
      >
        <StyledText size="XL">{item.languageName}</StyledText>
        <Entypo name="chevron-right" size={24} color={COLOR.textPrimary} />
      </View>
    </Pressable>
  )
}

const ItemSeparatorComponent = () => {
  return <View style={styles.itemSeparator} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    paddingVertical: SPACING.L,
    paddingHorizontal: SPACING.M,
  },
  flatListContent: {
    paddingBottom: SPACING.L,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLOR.textPrimary,
  },
})
