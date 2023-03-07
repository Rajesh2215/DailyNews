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
import {CData, fetchNews} from '../services/appservices';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../styles/styles';
import CustomHeader from '../components/CustomHeader';
import SVGComponent from '../../assets/svg/DN';
import SelectDropdown from 'react-native-select-dropdown';
// import SwipeableFlatList from 'react-native-swipeable-list'
const SearchScreen = (props: any) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [imageDimensions, setImageDimensions] = useState(null);
  const [imagePress, setImagePress] = useState(false);
  const [country, setCountry] = useState('India');
  // const [countries, setSountries] = useState('')
  const countries = [
    'Australia',
    'Argentina',
    'Austria',
    'Belgium',
    'Brazil',
    'Bulgaria',
    'UAE',
    'Canada',
    'China',
    'Colombia',
    'Cuba',
    'Czechia',
    'Switzerland',
    'Egypt',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'UK',
    'India',
    'Indonesia',
    'Ireland',
    'Israel',
    'Italy',
    'Japan',
    'Korea',
    'Latvia',
    'Lithuania',
    'Malaysia',
    'Mexico',
    'Morocco',
    'Nauru',
    'Netherlands',
    'Nigeria',
    'Philippines',
    'Poland',
    'Portugal',
    'Russia',
    'Serbia',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Sweden',
    'Taiwan',
    'Thailand',
    'Turkey',
    'USA',
    'Ukraine',
    'Venezuela',
    'HongKong',
    'SaudiArabia',
    'SouthAfrica',
    'NewZealand',
    'Romania',
  ];
  const res = async (country: string | undefined) => {
    try {
      const resp = await fetchNews(country);
      setData(resp.data.articles);
      setRefresh(false);
      setLoad(false);
      return resp;
    } catch (error) {
      console.log('error', error);
    }
  };

  // const CountryData = async()=>{
  //   try{
  //     console.log('Country Data')
  //     const Cdata = await CData()
  //     // console.log('data', Cdata.data)
  //     Object.keys(Cdata.data).map((e)=>{
  //       console.log('e', e)
  //       setSountries(e.slice(0,10))
  //     })
  //   }
  //   catch(error){
  //     console.log('error', error)
  //   }
  // }

  // useEffect(async()=>{
  //   await CountryData()
  // },[])
  // useEffect(()=>{
  //   console.log('UseEffect 1')
  //   const res = async ()=>{
  //     const data = await CountryData()
  //     // return data
  //   }
  //   // return res
  // },[])

  useEffect(() => {
    res(country);
  }, []);

  useEffect(() => {
    console.log('country', country);
    res(country);
  }, [country]);

  const handleScroll = (event: {
    nativeEvent: {contentOffset: any; contentSize: any; layoutMeasurement: any};
  }) => {
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
            }}
          />
        ) : (
          <Image
            source={{uri: item.urlToImage}}
            style={{
              width: wp(100),
              height: imagePress == true ? hp(80) : hp(35),
              marginTop: hp(2),
            }}
          />
        )}
        {/* <Image
          source={{
            uri:
              item.urlToImage == null ? (
                <SVGComponent width={50} height={50} />
              ) : (
                item.urlToImage
              ),
          }}
          style={{width: wp(100), height: imagePress == true ? hp(80) : hp(35)}}
        /> */}
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
  );
  return (
    <>
      <ScrollView
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            onRefresh={async () => {
              setRefresh(true);
              setLoad(true);
              console.log('refresh');
              res(country);
            }}
            refreshing={refresh}
          />
        }>
        <CustomHeader />
        <View
          style={{
            // height: hp(5),
            // width: wp(30),
            backgroundColor: 'transparent',
            alignSelf: 'flex-end',

            marginTop: hp(-3),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SelectDropdown
            defaultButtonText="Country"
            selectedRowStyle={{backgroundColor: '#269abe'}}
            // rowStyle={{borderRadius:wp(25)}}
            dropdownStyle={{
              backgroundColor: '#e0f0f5',
              borderRadius: wp(2),
              // maxHeight: hp(20),
            }}
            // dropdownOverlayColor='red'
            data={countries}
            buttonStyle={{
              backgroundColor: '#e0f0f5',
              borderRadius: wp(30),
              width: wp(30),
              height: hp(5),
              // marginLeft:wp(10)
              marginHorizontal: wp(5),
              borderColor: 'black',
            }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setCountry(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        </View>
        {/* <View
          style={{
            height: hp(5),
            width: wp(30),
            borderRadius: wp(30),
            borderColor: 'black',
            backgroundColor: 'red',
            alignSelf: 'flex-end',
            marginRight:wp(5),
            marginTop:hp(-5),
            alignItems:'center',
            justifyContent:'center'
          }}>
            <Text>Country</Text>
          </View> */}
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
