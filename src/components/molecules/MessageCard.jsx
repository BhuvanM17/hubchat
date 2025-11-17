import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const MessageCard = ({
  name,
  message,
  time,
  count,
  image,
  logoComponent,
  rightIcon,
  descriptionIcon,
  onPress,
  isRead = false 
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      
      <View style={styles.leftContainer}>
        <View>
          <Image source={image} style={styles.image} />
          {logoComponent}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.name}>{name}</Text>

          <View style={styles.flexRow}>
            {descriptionIcon}
            <Text 
              style={[
                styles.message,
                count > 0 && styles.unreadMessage 
              ]}
              numberOfLines={1}
            >
              {message}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.rightContainer}>

        {time && (
          <Text style={[
            styles.time,
            count > 0 && styles.unreadTime 
          ]}>
            {time}
          </Text>
        )}

        {!!count && count > 0 && (
          <View style={styles.messageCountContainer}>
            <Text style={styles.messageCount}>{count}</Text>
          </View>
        )}

        {rightIcon && <View>{rightIcon}</View>}

      </View>

    </TouchableOpacity>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(10),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
  },
  image: {
    height: moderateScale(53),
    width: moderateScale(53),
    borderRadius: moderateScale(53),
  },
  textContainer: {
    flex: 1,
    marginLeft: moderateScale(10),
  },
  name: {
    fontWeight: 'bold',
    fontSize: moderateScale(14),
    color: 'black'
  },
  message: {
    fontSize: moderateScale(13),
    color: '#889095',
    fontWeight: '500',
    flex: 1,
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: '#000',
  },
  time: { 
    color: '#8e9599ff',
    fontWeight: '500',
    fontSize: moderateScale(12),
  },
  unreadTime: {
    fontWeight: 'bold',
    color: '#24a6f0ff',
  },
  messageCount: {
    color: 'white',
    fontSize: moderateScale(12),
    fontWeight: 'bold',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightContainer: {
    alignItems: 'flex-end',
    gap: verticalScale(5)
  },
  messageCountContainer: {
    backgroundColor: '#24a6f0ff',
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: moderateScale(22),
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: moderateScale(22),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
    flex: 1,
  },
});