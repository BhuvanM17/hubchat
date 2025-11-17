import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import MessageCard from './MessageCard';

const Chats = () => {
  const data = [
  {
    image: imagePath.bizzhub_logo,
    name: 'Ramika Sen',
    message: 'today, 8:00 am',
    rightIcon:<FontAwesome name="video-camera" style={styles.callIcon} />,
    descriptionIcon:<Feather  name="arrow-up-right" style={styles.messageIcon} />
  },
  {
    image: imagePath.bizzhub_logo,
    name: 'Shivaji Rao',
    message: '13 aug, 7:29 pm',
    rightIcon:<Ionicons name="call" style={styles.callIcon} />,
    descriptionIcon:<Feather  name="arrow-down-left" style={[styles.messageIcon,{color:'red' } ]} />
  },
  {
    image: imagePath.bizzhub_logo,
    name: 'Andrews',
    message: '13 june, 12:00 pm',
    rightIcon:<FontAwesome name="video-camera" style={styles.callIcon} />,
    descriptionIcon:<Feather  name="arrow-up-right" style={styles.messageIcon} />
  },
  {
    image: imagePath.bizzhub_logo,
    name: 'Guru Pandian',
    message: '1 may,1:12 pm',
    rightIcon:<Ionicons name="call" style={styles.callIcon} />,
    descriptionIcon:<Feather  name="arrow-down-left" style={[styles.messageIcon,{color:'red' } ]} />
  },
];


  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return <MessageCard 
          name={item?.name}
          message={item?.message}
          image={item?.image}
          rightIcon={item?.rightIcon}
          descriptionIcon={item?.descriptionIcon}
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
  },
  callIcon:{
    color:'#24a6f0',
    fontSize:moderateScale(22),
  },
  messageIcon:{
    fontSize:moderateScale(15),
    color:'green'
  }
});
