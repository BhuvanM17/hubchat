import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';



const Auth = () => {
  const [loading,setLoading] = useState(false);

  let navigate_to_welcome =() =>{
    router.push("/(auth)/terms_agree")
  }

  let loading_timeout = () =>{
 setLoading(true);
 setTimeout(navigate_to_welcome,3000)
  } 

  useEffect(() =>{
    const timeout_id = setTimeout(loading_timeout,2000);

    return () => clearTimeout(timeout_id);
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <Image source={imagePath.bizzhub_logo} style={styles.logo_style}  resizeMode='contain'/>
        <Text style={styles.hubchat_text}>Hubchat</Text>
      </View>
      <View style={styles.footer}>
        {loading ?(
          <>
            <ActivityIndicator size={moderateScale(50)} color={"#24a6f0ff"} /> 
            <Text style={styles.loading_text}>Loading...</Text>
          </>
          ):(<>
        <Text style={styles.from_text}>From</Text>
        <Text style={styles.facebook_text}>BIZZHUB</Text>
        </>
      )}
      </View>
    </SafeAreaView>
  )
}

export default Auth

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:"space-between",
    padding:60,
  },
  header:{
  },
  body:{
   alignItems:"center",
   gap: verticalScale(12),

  },
  footer:{
    alignItems:"center",
    height:verticalScale(70),
    justifyContent:"flex-end"
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
  logo_style:{
    width:moderateScale(80),
    height:moderateScale(80),
    borderRadius:moderateScale(10), 
  },
  hubchat_text:{
      fontSize:moderateScale(35),
    color:'#24a6f0ff',    
    fontWeight:"bold"
  },
  loading_text:{
    fontSize:moderateScale(20),
    color:'#24a6f0ff',    
    fontWeight:"bold"
  },
})