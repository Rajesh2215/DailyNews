import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.2,
    borderColor: 'black',
    width: wp(80),
    alignSelf: 'center',
  },
  formInput: {
    alignSelf: 'center',
    marginTop: hp(3),
  },
  labelInput: {
    fontSize: wp(5.1),
    fontFamily: 'Sofia Pro',
    fontWeight: '400',
  },
  textInputStyle: {
    marginTop: hp(-1),
    lineHeight: hp(2),
    fontSize: hp(2.5),
    fontWeight: 'bold',
    justifyContent:'flex-start'
    // alignItems:'center'
  },
  errorText:{
    marginTop:hp(2),
    alignSelf:'center',
    color:'red'
  },
  customToastContainer: {
    width: wp(90),
    height: hp(8),
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#30C0E9',
    borderWidth: wp(0.5),
    borderRadius: wp(5),
    marginBottom: hp(3),
    flexDirection: 'row',
    marginTop:hp(2),
    marginHorizontal:wp(5),
    color:'black'
  },
  customToastText: {
    justifyContent: 'center',
    color: '#2C4030',
    fontSize: wp(3.7),
    lineHeight: wp(5),
    fontWeight: '400',
  },

  //  .btn-grad {
  //     background-image: linear-gradient(to right, #00d2ff 0%, #3a7bd5  51%, #00d2ff  100%);
  //     margin: 10px;
  //     padding: 15px 45px;
  //     text-align: center;
  //     text-transform: uppercase;
  //     transition: 0.5s;
  //     background-size: 200% auto;
  //     color: white;
  //     box-shadow: 0 0 20px #eee;
  //     border-radius: 10px;
  //     display: block;
  //   }

  //   .btn-grad:hover {
  //     background-position: right center; /* change the direction of the change here */
  //     color: #fff;
  //     text-decoration: none;
  //   }
});
export default styles;
