import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import MessageCard from './MessageCard';

const Chats = () => {
  const data = [
  {
    image: imagePath.bizzhub_logo,
    name: 'Reena',
    message: 'today, 7:29 pm',
  },
  {
    image: imagePath.bizzhub_logo,
    name: 'Adheera',
    message: 'today, 6:59 pm',
  },
  {
    image: imagePath.bizzhub_logo,
    name: 'Vijayendra Ingalagi',
    message: 'today, 4:00 pm',
  },
  {
    image: imagePath.bizzhub_logo,
    name: 'Garuda',
    message: 'toda, 8:00 am',
  },
  
];


  return (
    <View style={styles.container}>
      <MessageCard 
          name={'Rocky'}
          message={'Tap to add status update'}
          image={imagePath.bizzhub_logo}
          logoComponent={<View style={styles.logoComponentContainer}>
            <Ionicons name="add-outline" size={moderateScale(21)} color="white" />
          </View>}
          />;
      <View style={styles.divider} />
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>Recent updates</Text>
        </View>

      <FlatList
        data={data}
        renderItem={({item}) => {
          return <MessageCard 
          name={item?.name}
          message={item?.message}
          image={item?.image}
          />;
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap:scale(10),
  },
  logoComponentContainer:{
    width:moderateScale(25),
    height:moderateScale(25),
    borderRadius:moderateScale(50),
    backgroundColor:'#24a6f0',
    position:'absolute',
    bottom:scale(-5),
    right:scale(-5),
    borderWidth:2,
    borderColor:'white'
  },
    divider: {
    backgroundColor: '#f2f2f2',
    height: moderateScale(1),
    width: '100%',
  },

  sectionWrapper: {
    backgroundColor: 'white',
    paddingHorizontal: scale(15),
    paddingVertical: scale(2),
  },

  sectionTitle: {
    fontSize: moderateScale(13),
    fontWeight: 'bold',
    color: 'grey',
  },
});
