import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  Image,
  TouchableOpacity,
  Linking, Alert
} from 'react-native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import React, {useEffect, useRef, useState} from 'react';
import BottomBar from '../components/BottomBar';
import {fetchNews} from '../services/appservices';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/styles';
// import SwipeableFlatList from 'react-native-swipeable-list'
const SearchScreen = (props: any) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  const res = async () => {
    try {
      const resp = await fetchNews();
      setData(resp.data.articles);
      setRefresh(false);
      setLoad(false);
      return resp;
    } catch (error) {
      console.log('error', error);
    }
  };
;
  useEffect(() => {
    res();
  }, []);
  
  const open =async (url:any)=>{
    if (await InAppBrowser.isAvailable()) {
      console.log('Inappbrowser available')
      const result = await InAppBrowser.open(url,{
        showTitle: true,
        toolbarColor: '#6200EE',
        navigationBarColor: 'black',
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right'
        },
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
      })
    }
    else Linking.openURL(url)
  }
  const renderItem = ({item}) => (
    
    <View>
      <Image
        source={{uri: item.urlToImage}}
        style={{width: wp(100), height: hp(35),marginTop:hp(2)}}
      />
      <Text style={{fontWeight:'600',color:'black',lineHeight:hp(3),fontSize:hp(3),marginTop:hp(1)}}>{item.title}</Text>
      <Text style={{marginTop:hp(2),fontSize:hp(3)}}>{(item.content).substring(0,200)}<TouchableOpacity><Text style={{color:'blue'}} onPress={()=>open(item.url)} >Read More</Text></TouchableOpacity></Text>
      {/* <Text style={{marginTop:hp(2)}}>{item.content}</Text> */}
      <TouchableOpacity>
      {/* <Text>{item.url}</Text> */}
      </TouchableOpacity>
    </View>
  );
  return (
    <>
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
            style={styles.container}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                onRefresh={async () => {
                  setRefresh(true);
                  setLoad(true);
                  console.log('refresh');
                  res();
                }}
                refreshing={refresh}
              />
            }
            renderItem={renderItem}
          />
        )}
      </View>
      <BottomBar active={'SearchScreen'} navigation={props.navigation} />
    </>
  );
};

export default SearchScreen;

{
  /* <ScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.container}
        style={{margin: 20}}
        refreshControl={
          <RefreshControl
            onRefresh={async () => {
              setRefresh(true);
              setLoad(true);
              console.log('refresh');
              res();
            }}
            refreshing={refresh}
          />
        }
        showsVerticalScrollIndicator={false}>
        <>
          <Text style={{textAlign: 'center'}}>New News for you</Text>
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
          {!load &&
            data.map((e, index) => {
              return (
                <View key={index}>
                  <Text style={{textAlign: 'center'}}>{e.author}</Text>
                </View>
              );
            })}
        </>
      </ScrollView> */
}
