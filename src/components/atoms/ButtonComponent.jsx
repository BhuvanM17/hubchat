import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const ButtonComponent = ({title,onPress,style}) => {
  return (
    <TouchableOpacity style={[styles.container,style]} activeOpacity={0.8} onPress={onPress}>
      <Text style={styles.button_text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponent

const styles = StyleSheet.create({
  container:{
    backgroundColor:"#00A884",
    width:"100%",
    paddingVertical:verticalScale(10),
    paddingHorizontal:scale(10),
    borderRadius:moderateScale(4),
    alignItems:"center"
  },
  button_text:{
    fontSize:moderateScale(14),
    color:"white",
  },
})