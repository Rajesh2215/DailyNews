import { View, Text } from 'react-native'
import React from 'react'
import BottomBar from '../components/BottomBar'

const SearchScreen = (props: any) => {
  return (
    <>
    <View>
      <Text>SearchScreen</Text>
    </View>
    <BottomBar active={'SearchScreen'} navigation={props.navigation} />
    </>
  )
}

export default SearchScreen