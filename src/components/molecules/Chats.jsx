// src/components/molecules/Chats.jsx
import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import imagePath from '../../constants/imagePath';
import MessageCard from './MessageCard';

const Chats = () => {
  const router = useRouter();

  const data = [
    {
      id: '1',
      image: imagePath.bizzhub_logo,
      name: 'Rocky Bhai',
      message: 'Dheera… how are you?',
      time: '6:30 pm',
      messageCount: 3,
      messages: [
        {
          _id: '1',
          text: "Welcome to the chat!",
          createdAt: new Date(Date.now() - 3600000),
          user: { _id: 2, name: 'Rocky Bhai' },
        },
        {
          _id: '2',
          text: "Hi Rocky! I'm good, thanks!",
          createdAt: new Date(Date.now() - 3000000),
          user: { _id: 1, name: 'You' },
        },
        {
          _id: '3',
          text: "Dheera… how are you?",
          createdAt: new Date(Date.now() - 600000),
          user: { _id: 2, name: 'Rocky Bhai' },
        }
      ]
    },
    // Add more chats
  ];

  const handleChatPress = (item) => {
    router.push({
      pathname: '/chat',
      params: {
        name: item.name,
        image: item.image,
        messages: JSON.stringify(item.messages)
      }
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageCard
            name={item.name}
            message={item.message}
            image={item.image}
            time={item.time}
            count={item.messageCount}
            onPress={() => handleChatPress(item)}
          />
        )}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});