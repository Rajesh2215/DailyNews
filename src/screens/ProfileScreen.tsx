import { View, Text } from 'react-native'
import React from 'react'
import BottomBar from '../components/BottomBar'
import Button from '../components/Button'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/action'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = (props: any) => {
  const dispatch = useDispatch()
  return (
    <>
    <View>
      <Text>ProfileScreen</Text>
    </View>
    <Button
        title={'Linking'}
        action={() => {
          console.log('working');
          dispatch(logout())
          props.navigation.navigate('SignupScreen');
        }}
      />
    <BottomBar active={'ProfileScreen'} navigation={props.navigation} />
    </>
  )
}

export default ProfileScreen