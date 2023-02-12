import { View, Text } from 'react-native'
import React from 'react'
import BottomBar from '../components/BottomBar'

const ProfileScreen = (props: any) => {
  return (
    <>
    <View>
      <Text>ProfileScreen</Text>
    </View>
    <BottomBar active={'ProfileScreen'} navigation={props.navigation} />
    </>
  )
}

export default ProfileScreen