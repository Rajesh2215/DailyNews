import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Dimensions,
} from 'react-native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import React, {useEffect, useRef, useState} from 'react';
import BottomBar from '../components/BottomBar';
import {fetchNews} from '../services/appservices';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/styles';
import CustomHeader from '../components/CustomHeader';
// import SwipeableFlatList from 'react-native-swipeable-list'
const SearchScreen = (props: any) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [imageDimensions, setImageDimensions] = useState(null);
  const [imagePress, setImagePress] = useState(false)
  //
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
  useEffect(() => {
    res();
  }, []);

  const handleScroll = (event: { nativeEvent: { contentOffset: any; contentSize: any; layoutMeasurement: any; }; }) => {
    console.log('Handling Scroll');
    const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;

    // Calculate the maximum scroll position based on the content size and the layout measurement
    const maxScrollPosition = contentSize.height - layoutMeasurement.height;
    console.log('SIZES', contentOffset.y, ' ', maxScrollPosition);
    const epsilon = 0.1;
    // If the user has scrolled to the bottom, hide the bottom navigation bar
    if (contentOffset.y >= maxScrollPosition - epsilon) {
      console.log('Dont Show');
      setShowBottomBar(false);
    } else {
      console.log('Show');
      setShowBottomBar(true);
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
    <View>
      <TouchableOpacity
        onPress={() => {
          console.log('Click on Image');
          setShowBottomBar(!showBottomBar)
          setImagePress(!imagePress)
        }}>
        <Image
          source={{uri: item.urlToImage}}
          style={{width: wp(100), height:imagePress==true?hp(80):hp(35)}}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontWeight: '600',
          color: 'black',
          lineHeight: hp(3),
          fontSize: hp(3),
          marginTop: hp(1),
        }}>
        {item.title}
      </Text>
      <Text style={{marginTop: hp(2), fontSize: hp(3)}}>
        {item.content.substring(0, 200)}
        <TouchableOpacity>
          <Text style={{color: 'blue'}} onPress={() => open(item.url)}>
            Read More
          </Text>
        </TouchableOpacity>
      </Text>
      {/* <Text style={{marginTop:hp(2)}}>{item.content}</Text> */}
      <TouchableOpacity>{/* <Text>{item.url}</Text> */}</TouchableOpacity>
    </View>
  );
  return (
    <>
      <ScrollView onScroll={handleScroll}>
        <CustomHeader />
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
      </ScrollView>
      {showBottomBar && (
        <BottomBar active={'SearchScreen'} navigation={props.navigation} />
      )}
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
