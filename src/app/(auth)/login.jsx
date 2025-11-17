import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import ButtonComponent from '../../components/atoms/ButtonComponent';


const Login = () => {

  const [visible,setVisible] =useState(false);
  const [countryName,setCountryName] = useState('India');
  const [countryCallingCode,setCountryCallingCode] =useState("+ 91");

  const onNextButtonClick =()=>{
    router.push('/(auth)/verify_otp')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.head_container} >
          <Text style={styles.heading_text}> Enter your phone number</Text>
          <Text style={styles.description}>
            HubChat will need to verify your phone number.
            <Text style={styles.link_description}> What's my number?</Text>
          </Text>
          <View style={styles.input_main_container}>
            <TouchableOpacity style={styles.dropDown_container} onPress={()=>setVisible(true)}>
              <View />
              <Text style={styles.dropDown_title}>{countryName}</Text>
              <AntDesign name="caret-down" size={moderateScale(18)} color="black" />
            </TouchableOpacity>
            <View style={styles.horizontal_line}/>
            <View style={styles.input_container}> 
              <View style={styles.country_code}>
                <Text style={styles.country_code_text}>{countryCallingCode} </Text>
                <View style={styles.horizontal_line}/>
              </View>
              <View style={{gap:verticalScale(10), flex:1}}> 
                <TextInput style={styles.input} placeholder='Enter Your Phone Number'/>
                <View style={styles.horizontal_line}/>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
      <ButtonComponent title="Next" style={styles.button} onPress={onNextButtonClick}/>
      </View>{
        visible &&(<CountryPicker visible={visible} 
          withFilter
          onClose={()=>setVisible(false)}
          onSelect={
            (e)=>{
            setCountryCallingCode(`+${e.callingCode[0]}`);
            setCountryName(e.name);
            }}
          />)
      }

    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
      flex:1,
    justifyContent:"space-between",
    paddingVertical: verticalScale(70),
    alignItems:"center",  
    paddingHorizontal:scale(40),
    backgroundColor: "white",
  },
  header:{
    width: "100%", 
    gap:verticalScale(50),
  },
  footer:{},
  head_container:{
    width:'100%',
    gap:verticalScale(20),
  },
  input_main_container:{

  },
   input_container:{
      paddingVertical:verticalScale(13),
      flexDirection:'row',
      alignItems:'center',
      gap: scale(20),
  },
  input:{
    flex:1,
    fontSize:moderateScale(16),
    paddingVertical:0,    
  },
  heading_text  :{
    fontSize:moderateScale(20),
    color:"black",
    fontWeight:"bold",
    textAlign:"center",
    
  },
  description:{
    textAlign:"center",
    fontSize:moderateScale(13),
    fontWeight:'400',
    color:"black",
    paddingBottom:moderateScale(50),
  },
  link_description:{
   color:'#24a6f0ff', 
  },
  button:{
    paddingHorizontal:20,
    backgroundColor:'#248fcdff', 
  },
  horizontal_line:{
    width:"100%",
    height:verticalScale(1.5),
    backgroundColor:'#248fcdff', 
  },
  dropDown_container:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:verticalScale(10),
    paddingHorizontal:scale(20),
  },
  dropDown_title:{
    fontSize:moderateScale(14),
    fontWeight:'500',
    color:'black'
  },
 
  country_code:{
    gap:verticalScale(10),
  },
  country_code_text:{
    fontSize:moderateScale(16),
    fontWeight:'400',
    color:'black'
  },

})