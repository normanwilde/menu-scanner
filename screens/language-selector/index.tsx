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
    }, 500)
  }

  return (
    <View>
      <StyledText size="HEADING_XS" style={styles.headerText}>
        Translate menu to
      </StyledText>
      <FlatList
        data={languageArray}
        renderItem={({ item }) =>
          renderItem(item, state.targetLanguage, selectLanguage)
        }
        keyExtractor={(item) => item.code}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparatorComponent}
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
              ? COLOR.primaryLight
              : COLOR.backgroundWhite,
          },
        ]}
      >
        <StyledText size="XL">{item.languageName}</StyledText>
        <Entypo name="chevron-right" size={24} color="black" />
      </View>
    </Pressable>
  )
}

const ItemSeparatorComponent = () => {
  return <View style={styles.itemSeparator} />
}

const styles = StyleSheet.create({
  headerText: {
    paddingVertical: SPACING.M,
    paddingHorizontal: SPACING.M,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.M,
    paddingVertical: SPACING.S,
  },
  itemSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
  },
})
