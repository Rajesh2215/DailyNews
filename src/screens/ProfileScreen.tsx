import { View, Text } from 'react-native'
import React from 'react'
import BottomBar from '../components/BottomBar'
import Button from '../components/Button'

const ProfileScreen = (props: any) => {
  return (
    <>
    <View>
      <Text>ProfileScreen</Text>
    </View>
    <Button
        title={'Linking'}
        action={() => {
          console.log('working');
          props.navigation.navigate('SignupScreen');
        }}
      />
    <BottomBar active={'ProfileScreen'} navigation={props.navigation} />
    </>
  )
}

export default ProfileScreen