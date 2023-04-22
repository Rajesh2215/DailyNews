import React, {useState, useRef, useEffect} from 'react';
import {Text, View, FlatList, Image, Alert, Share} from 'react-native';
import NavBar from '../../components/Navbar';
import CustomHeader from '../../components/CustomHeader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import styles from '../../styles/styles';
import {CategoryNews, fetchNews, saveNews} from '../../services/appservices';
import {useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SVGComponent from '../../../assets/svg/DN';
import Bookmarks from '../../../assets/svg/Bookmarks';
import Toast from 'react-native-simple-toast';
import ShareIcon from '../../../assets/svg/ShareIcon';

// import ShareIcon from '../../../assets/svg/Share';
import Download from '../../../assets/svg/Download';
import {useIsFocused} from '@react-navigation/native';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';

const General = (props: any) => {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const [imagePress, setImagePress] = useState(false);
  const [savedItem, setSavedItem] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [downloadImg, setDownloadImg] = useState('');
  const [picName, setPicName] = useState('');
  const isFirstRender = useRef(true);
  const isFocused = useIsFocused();

  const user = useSelector(state => state.myReducer);

  const sendSavedNews = async (savedItem: boolean) => {
    try {
      const res = await saveNews(savedItem);
      console.log('res', res);
    } catch (error) {
      console.log('error', error);
    }
  };

  const res = async (category: string | undefined) => {
    try {
      const resp = await CategoryNews(category);
      const itemsWithIds = resp.map((item: any, index: any) => ({
        userEmail: user.data.email,
        ...item,
        id: index,
      }));
      setData(itemsWithIds);
      setRefresh(false);
      setLoad(false);
      return resp;
    } catch (error) {
      console.log('error', error);
    }
  };

  const onShare = async (title: any) => {
    try {
      Toast.show('HEYYYYYYYYYYYYYYY...', 1000);
      const result = await Share.share({
        message: title,
      });
    } catch (error: any) {
      Alert.alert(error.message);
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
  const saveImageToPhone = async (imageUrl: string, imageName: string) => {
    console.log('picture', picName, ' ', picture);

    console.log('function worked', imageUrl);
    try {
      console.log('function called');
      if (!imageUrl) {
        console.log('Invalid imageUrl parameter');
        return false;
      }

      const response = await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'jpg',
      }).fetch('GET', imageUrl);

      console.log('1');
      const filePath = response.path();
      const options = {
        type: 'photo',
        album: 'MyApp',
        photoFileName: imageName,
      };

      const res = await RNFetchBlob.fs.writeFile(
        `${RNFetchBlob.fs.dirs.DownloadDir}/${imageName}`,
        filePath,
        'uri',
      );

      // setImagePress(false),
      console.log('scanning file', res);
      await RNFetchBlob.fs.scanFile([{path: filePath}]);
      Toast.show('Image Downloaded Successfully', 1000);

      console.log('Stored successfully');
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };
  useEffect(() => {
    if (!isFocused && savedItem) {
      // sendSavedNews(savedItem)
      setSavedArticles([]);
      setSavedItem(false);
      setPicName('');
    } else {
      console.log('User is not viewing this General screen');
    }
  }, [isFocused]);

  useEffect(() => {
    res('general');
  }, []);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // toggle flag after first render/mounting
      return;
    }
    // saveImageToPhone(downloadImg, picName);
  }, [downloadImg, picName]);
  const renderItem = ({item}) => {
    return (
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

            <TouchableOpacity
              style={{
                position: 'absolute',
                alignSelf: 'flex-end',
                marginTop: hp(32),
                width: wp(10),
              }}>
              <Bookmarks
                onPress={() => {
                  sendSavedNews(item);
                  setSavedItem(item);
                  console.log('item.id', item.id);
                  setSavedArticles(savedItems => {
                    if (savedItems.includes(item.id)) {
                      Toast.show('Removed from Bookmarks', 1000);

                      return savedItems.filter(id => id !== item.id);
                    } else {
                      Toast.show('Added to Bookmarks', 1000);

                      return [...savedItems, item.id];
                    }
                  });
                }}
                data={savedArticles.includes(item.id)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginTop: hp(-5),
                alignSelf: 'flex-end',
                marginRight: wp(15),
              }}
              onPress={() => {
                onShare(item.url);
              }}>
              <ShareIcon />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                margin: wp(5),
                position: 'absolute',
                padding: wp(5),
              }}
              onPress={async () => {
                console.log('pressed to download', picture);
                console.log('item.urlToimage', item.urlToImage);
                // setPicture(item.urlToImage);
                setDownloadImg(item.urlToImage);
                console.log('picture', picture);
                const imageName = item.urlToImage.split('/').pop();
                setPicName(imageName);
                Toast.show('Downloading...', 1000);

                //  await saveImageToPhone(picture, picName);
              }}>
              <Download />
            </TouchableOpacity>
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
              marginTop: hp(2),
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
  };

  return (
    <>
      
      {/* <Bookmarks data={item}/> */}
      <View>
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
            onRefresh={async () => {
              setRefresh(true);
              setLoad(true);
              console.log('refresh');
              res('general');
            }}
            refreshing={refresh}
          />
        )}
      </View>
    </>
  );
};

export default General;
