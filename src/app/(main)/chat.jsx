import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';

const ChatScreen = () => {
  const { name, image, messages: messagesParam } = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef(null);

  useEffect(() => {
    if (messagesParam) {
      try {
        const parsedMessages = JSON.parse(messagesParam);
        setMessages(parsedMessages.map(msg => ({
          ...msg,
          createdAt: new Date(msg.createdAt),
        })));
      } catch (error) {
        console.error('Error parsing messages:', error);
      }
    }
  }, [messagesParam]);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      _id: Math.random().toString(36).substring(7),
      text: inputText.trim(),
      createdAt: new Date(),
      user: { _id: 1, name: "You" },
    };

    setMessages(previousMessages => [...previousMessages, newMessage]);
    setInputText('');
    
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }) => {
    const isCurrentUser = item.user._id === 1;
    
    return (
      <View style={[
        styles.messageContainer,
        isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
      ]}>
        {!isCurrentUser && (
          <Text style={styles.userName}>{item.user.name}</Text>
        )}
        <View style={[
          styles.messageBubble,
          isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble
        ]}>
          <Text style={[
            styles.messageText,
            isCurrentUser ? styles.currentUserText : styles.otherUserText
          ]}>
            {item.text}
          </Text>
        </View>
        <Text style={styles.timeText}>
          {item.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
    );
  };

  const handleBack = () => {
    router.back();
  };

  const handleCall = () => {
    console.log('Call button pressed');
    alert(`Calling ${name}`);
  };

  const handleMenu = () => {
    console.log('Menu button pressed');
    alert('Menu options');
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#24a6f0ff" barStyle="light-content" />
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={moderateScale(24)} color="white" />
          </TouchableOpacity>
          
          <Image 
            source={imagePath.bizzhub_logo} 
            style={styles.profileImage}
          />
          
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{name}</Text>
            <Text style={styles.userStatus}>online</Text>
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon} onPress={handleCall}>
            <Ionicons name="call" size={moderateScale(20)} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerIcon} onPress={handleMenu}>
            <Ionicons name="ellipsis-vertical" size={moderateScale(20)} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item._id}
          style={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
          showsVerticalScrollIndicator={false}
        />
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              placeholderTextColor="#889095"
              multiline
              maxLength={500}
            />
            <TouchableOpacity 
              style={[
                styles.sendButton, 
                inputText.trim() === '' && styles.sendButtonDisabled
              ]} 
              onPress={handleSend}
              disabled={inputText.trim() === ''}
            >
              <Ionicons 
                name="send" 
                size={moderateScale(20)} 
                color={inputText.trim() === '' ? '#8e9599ff' : 'white'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#24a6f0ff',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(12),
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + verticalScale(12) : verticalScale(12),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: moderateScale(8),
    marginRight: scale(8),
  },
  profileImage: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(40),
    marginRight: scale(12),
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  userStatus: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: moderateScale(12),
    fontWeight: '500', 
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    padding: moderateScale(8),
    marginLeft: scale(16),
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(8),
  },
  messageContainer: {
    marginVertical: verticalScale(4),
    maxWidth: '80%',
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: moderateScale(12),
    color: '#666',
    marginBottom: verticalScale(2),
    marginLeft: scale(12),
    fontWeight: '500',
  },
  messageBubble: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
    marginBottom: verticalScale(2),
    maxWidth: '100%',
  },
  currentUserBubble: {
    backgroundColor: '#9dd7f6ff', 
    borderBottomRightRadius: moderateScale(4),
  },
  otherUserBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  messageText: {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
  },
  currentUserText: {
    color: '#000000',
    fontWeight: '500', 
  },
  otherUserText: {
    color: '#000000',
    fontWeight: '500', 
  },
  timeText: {
    fontSize: moderateScale(11),
    color: '#8e9599ff', 
    marginHorizontal: scale(12),
    marginTop: verticalScale(2),
    fontWeight: '500', 
  },
  inputContainer: {
    padding: moderateScale(16),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(10),
    marginRight: scale(12),
    maxHeight: moderateScale(100),
    backgroundColor: '#F2F2F7',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    color: '#000000', 
    fontWeight: '500', 
  },
  sendButton: {
    backgroundColor: '#24a6f0ff',
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
});