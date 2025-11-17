import { Feather } from '@expo/vector-icons'
import Entypo from '@expo/vector-icons/Entypo'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import { useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Calls from '../../components/molecules/Calls'
import Chats from '../../components/molecules/Chats'
import Status from '../../components/molecules/Status'


const Main = () => {
  const [currentPage,setCurrentPage] = useState('chat')

  const openCameraAlert = () => {
  alert("📸 Work in progress...");
};

  const ActivePage =()=>{
    switch(currentPage){
      case "chat":
        return <Chats />
      case "status":
        return <Status />
      case "calls":
        return <Calls />
      default :
          return <Chats />
    }
  }
  const HubChatHeader = () =>{
    return(
      <View style={styles.hubChatHeaderStyle}>
        <Text style={styles.hubChatText}>HubChat</Text>
        <View style={styles.iconContainer}>
          <EvilIcons name="search" size={32}  style={[styles.headerIcon, { fontSize: 30 }]}  />
          <Entypo name="dots-three-vertical" style={styles.headerIcon} />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} >
      <StatusBar backgroundColor={"#24a6f0ff"} style="light"/>
      <HubChatHeader />
      <View style={styles.topBarContainer}>
        <TouchableOpacity
    onPress={openCameraAlert}
    style={[styles.topBarButton, { flex: 0, alignItems: 'flex-start' }]}
  >
    <Feather name="camera" size={20} color="white" />
  </TouchableOpacity>
        {
          ["chats","status","calls"].map((item,index)=>{
            return <TouchableOpacity key={index}
            onPress={()=>setCurrentPage(item)}
            style={[styles.topBarButton,item == currentPage && { borderColor:'white'},]}
            >
              <Text style={styles.topBarText}>{item}</Text>
            </TouchableOpacity>
          })
        }
      </View>
      {ActivePage()}
    </SafeAreaView>
  )
}

export default Main

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  topBarContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: scale(20),
    backgroundColor:"#24a6f0ff",
    gap:scale(10),
  },
  topBarButton:{
    flex:1,
    alignItems:'center',
    borderBottomWidth:scale(3),
    paddingBottom:verticalScale(10),
    borderColor:"#24a6f0ff",
  } ,
  topBarText:{
    fontSize:moderateScale(15),
    fontWeight:'bold',
    color:'white',
    textTransform:'uppercase'
  },
  headerIcon:{
    fontSize:moderateScale(24),
    color:'white',
  },
  hubChatHeaderStyle:{
    backgroundColor:'#24a6f0ff',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:scale(15),
    paddingBottom:verticalScale(17),
    paddingTop:verticalScale(10),
  },
  iconContainer:{
    flexDirection:'row',
    gap:scale(8),
  },
  hubChatText:{
    fontSize:moderateScale(28),
    fontWeight:'bold',
    color:'white',
    paddingHorizontal:verticalScale(5),
  },
})

