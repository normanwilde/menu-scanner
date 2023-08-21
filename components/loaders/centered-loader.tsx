import { ActivityIndicator, View, StyleSheet } from 'react-native'

export const CenteredLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
