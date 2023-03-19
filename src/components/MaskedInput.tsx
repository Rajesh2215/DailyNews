import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
} from 'react-native-confirmation-code-field';

const MaskedInput: React.FC<{
  editable?: boolean;
  title: string;
  data: string;
  mask: number;
  error: boolean;
  setData: (arg: any) => any;
}> = ({
  editable = true,
  title = '',
  data = '',
  mask = 5,
  error = false,
  setData = (arg: any) => {},
}) => {
  //const ref = useBlurOnFulfill({data, cellCount: mask});
  return (
    <View style={styles.container}>
      <Text style={styles.textInput}>{title}</Text>
      <CodeField
        editable={editable}
      value={data}
        onChangeText={setData}
        cellCount={mask}
        rootStyle={styles.input}
        keyboardType="number-pad"
        autoFocus={true}
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            style={[
              styles.cell,
              !error ? styles.normalCell : styles.errorCell,
            ]}>
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default MaskedInput;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: hp(5),
    height: hp(5),
    borderWidth: 0,
    borderBottomWidth: 2,
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    paddingTop: wp(5),
    width: '100%',
  },
  input: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp(4),
  },
  textInput: {
    fontFamily: 'Sofia Pro',
    fontSize: wp(2.8),
    lineHeight: wp(5.3),
    color: 'rgba(128, 131, 133, 1)',
  },
  cell: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    height: wp(11),
  },
  cellText: {
    fontWeight: '400',
    color: 'black',
    fontSize: wp(5),
    fontFamily: 'Sofia Pro',
  },
  normalCell: {
    borderBottomColor: '#E0E2E5',
  },
  errorCell: {
    borderBottomColor: 'red',
  },
});
