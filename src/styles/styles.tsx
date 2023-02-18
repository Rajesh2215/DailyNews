import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: wp(80),
    alignSelf: 'center',
  },
  formInput: {
    alignSelf: 'flex-start',
    marginTop: hp(5),
  },
  labelInput:{
    fontSize: wp(5.1),
    fontFamily: 'Sofia Pro',
    fontWeight: '400',
  },
  textInputStyle:{
    marginTop:hp(-1),
    lineHeight:hp(2),
    fontSize:hp(2.5),
    fontWeight:'bold'
}
         
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
