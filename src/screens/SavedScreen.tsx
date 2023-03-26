import React, {useState, useEffect} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Linking,
  FlatList,
} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector} from 'react-redux';
import BackIcon from '../../assets/svg/back';
import SVGComponent from '../../assets/svg/DN';
import SaveIcon from '../../assets/svg/save';
// import {} from 'react-native-svg';
import BottomBar from '../components/BottomBar';
import CustomHeader from '../components/CustomHeader';
import {
  DeleteSavedNews,
  fetchNews,
  fetchSavedNews,
} from '../services/appservices';
import styles from '../styles/styles';
import Delete from '../../assets/svg/Delete';
import LoginSuccess from '../components/LoginSuccess';

const SavedScreen = (props: any) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [imagePress, setImagePress] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const user = useSelector(state => state.myReducer);
  console.log('user.data.email', user.data.email);
  useEffect(() => {
    res(user.data.email);
  }, []);
  const res = async (email: string | undefined) => {
    try {
      const resp = await fetchSavedNews(email);
      setData(resp);
      setRefresh(false);
      setLoad(false);
      return resp;
    } catch (error) {
      console.log('error', error);
    }
  };

  const open = async (url: any) => {
    if (await InAppBrowser.isAvailable()) {
      console.log('Inappbrowser available');
      const result = await InAppBrowser.open(url, {
        showTitle: true,
        toolbarColor: '#6200EE',
        navigationBarColor: 'black',
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
      });
    } else Linking.openURL(url);
  };
  const renderItem = ({item}) => (
    <>
      <View>
        <TouchableOpacity
          onPress={() => {
            setShowBottomBar(!showBottomBar);
            setImagePress(!imagePress);
          }}>
          {/* {console.log('item.urlToImage', item.urlToImage)} */}
          {item.urlToImage == null ? (
            <SVGComponent
              style={{
                width: wp(100),
                height: imagePress == true ? hp(80) : hp(35),
                marginTop: hp(2),
                position: 'relative',
              }}
            />
          ) : (
            <Image
              source={{uri: item.urlToImage}}
              style={{
                width: wp(100),
                height: imagePress == true ? hp(80) : hp(35),
                marginTop: hp(2),
                position: 'relative',
              }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: '600',
            color: '#30C0E9',
            lineHeight: hp(3),
            fontSize: hp(3),
            marginTop: hp(1),
          }}>
          {item.title}
        </Text>
        <Text style={{marginTop: hp(2), fontSize: hp(3)}}>
          {/* {console.log('item.content.length au,us,de')} */}
          {item.content == null
            ? 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore voluptatum nesciunt numquam officia obcaecati non dignissimos? Nesciunt asperiores hic quam distinctio est magnam explicabo. Eaque repellat sint ipsum.'
            : item.content.substring(0, 200)}
          <TouchableOpacity>
            <Text style={{color: 'blue'}} onPress={() => open(item.url)}>
              Read More
            </Text>
          </TouchableOpacity>
        </Text>
        {/* <Text style={{marginTop:hp(2)}}>{item.content}</Text> */}
        <TouchableOpacity>{/* <Text>{item.url}</Text> */}</TouchableOpacity>
      </View>
    </>
  );

  const deleteData = async (email: any) => {
    try {
      console.log('EMAIL', email);
      if(data.length==0){
        return
      }
      console.log('data.length', data.length)
      const resp = await DeleteSavedNews(email);
      console.log('resp', resp);
      if (resp == 201) {
        setDeleted(true);
      }
      setTimeout(() => {
        props.navigation.goBack();
      }, 1000);
    } catch (error) {
      console.log('error', error);
    }
  };
  console.log('data', data);
  return (
    <>
      {deleted && <LoginSuccess text={'Removed News From Favourites'} />}
      <View
        style={{
          padding: wp(3),
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: wp(95),
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <BackIcon />
        </TouchableOpacity>
        <Text
          style={{
            borderBottomWidth: 3,
            fontSize: hp(3),
            fontWeight: '800',
            color: '#000000',
            borderBottomColor: '#30C0E9',
            textAlign: 'center',
          }}>
          Your Favourites
        </Text>
        <Delete
          onPress={() => {
            deleteData(user.data.email);
          }}
        />
      </View>

      <View style={{marginBottom: hp(2)}}>
        {load && (
          <View
            style={{
              height: hp(50),
              width: wp(90),
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>Loading...</Text>
          </View>
        )}
        {!load && (
          <FlatList
            data={data}
            style={{width: '100%', padding: 16}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            onRefresh={async () => {
              setRefresh(true);
              setLoad(true);
              console.log('refresh');
              res(user.data.email);
            }}
            refreshing={refresh}
          />
        )}

        {data.length == 0 && (
          <View style={{alignSelf:'center',marginTop:hp(30)}}>
            <Text style={{color:'#000000',fontSize:hp(2.5)}}>Tap on the Icon to Save to BookMarks</Text>
          </View>
        )}
      </View>
    </>
  );
};
export default SavedScreen;
