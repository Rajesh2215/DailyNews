import { View, Text } from 'react-native'
import React from 'react'
import BottomBar from '../components/BottomBar'

const HomeScreen = (props: any) => {
  return (
    <>
    <View>
      <Text>HomeScreen</Text>
    </View>
    <BottomBar active={'HomeScreen'} navigation={props.navigation} />
    </>
  )
}

export default HomeScreen