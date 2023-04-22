
import { Text ,View,TextInput} from 'react-native'
import { heightPercentageToDP as hp,widthPercentageToDP as wp } from 'react-native-responsive-screen'
const ProfileInput = (props:any) => {
    console.log('PROPS in INPUt',props)
    return (
        <>
        <View
        style={{
          marginTop: hp(12),
          position: 'relative',
          alignItems: 'center',
        }}>
        <View style={{position: 'absolute'}}>
          <Text style={{marginBottom:hp(1)}}>{props.text}</Text>
          <TextInput
            //   placeholder="Email / Phone number"
            editable={false}
            style={{
              borderColor: '#A6A6A6',
              borderRadius: wp(1),
              borderWidth: wp(0.5),
              padding: wp(2),
              width: wp(90),
              fontWeight: '500',
              fontSize: wp(5),
              zIndex: 2,
              color: '#000000',
            }}>
            {props.data}
          </TextInput>
        </View>
      </View></>
    )
}

export default ProfileInput