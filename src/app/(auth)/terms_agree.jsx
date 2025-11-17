import { router } from 'expo-router'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import ButtonComponent from '../../components/atoms/ButtonComponent'
import imagePath from '../../constants/imagePath'

const TermsAgree = () => {
  const onAgree = () =>{
    router.push("/(auth)/login")
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <View style={styles.header}>
         <Text style={styles.welcome_text}>Welcome to HubChat</Text>
         <Image source={imagePath.welcome_image} style={styles.welcome_image}  resizeMode='contain'/>
         <Text style={styles.desc_text}>
          Read our <Text style={styles.link_text}> privacy policy</Text>. Tap "Agree and continue" to accept the <Text style={styles.link_text}>Terms of Service</Text>.
         </Text>
         <View style={{width:moderateScale(300)}}>
            <ButtonComponent title="AGREE AND CONTINUE" onPress={onAgree}/>
         </View>
         
      </View>
      <View style={styles.footer}>
         <Text style={styles.from_text}>From</Text>
         <Text style={styles.facebook_text}>BIZZHUB</Text>
      </View>
    </SafeAreaView>
  )
}

export default TermsAgree

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor:"white",
    paddingVertical:verticalScale(70),
     paddingHorizontal:scale(30)
  },
  header:{
    alignItems:"center",
    gap:moderateScale(25),

  },
  footer:{
    alignItems:"center"
  },
  from_text:{
    fontSize:moderateScale(12),
    color:"#867373"
  },
  facebook_text:{
    fontSize:moderateScale(15),
    color:"#24a6f0ff",
    fontWeight:"600"
  },
  welcome_text:{
    fontSize:moderateScale(30),
    fontWeight:"bold",
    color:"black",  
  },
  welcome_image:{
    height:moderateScale(300),
    width:moderateScale(300),
    borderRadius:moderateScale(200),
  },
  desc_text:{
    textAlign:"center",
    fontSize:moderateScale(13),
    color:"black",
  },
  link_text:{
    color:"#0C4",
  },
})
