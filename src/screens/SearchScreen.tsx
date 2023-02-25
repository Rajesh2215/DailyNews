import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  FlatList,
  Image,
} from 'react-native';
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
  data.map(e => {
    console.log(e.author);
  });
  console.log('load', load);
  useEffect(() => {
    res();
    console.log('working useffect');
  }, []);
  
  const renderItem = ({item}) => (
    <View>
      <Image
        source={{uri: item.urlToImage}}
        style={{width: 400, height: 400}}
      />
      <Text>{item.author}</Text>
      <Text>{item.description}</Text>
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
