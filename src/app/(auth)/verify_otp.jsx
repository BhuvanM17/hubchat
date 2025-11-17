import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import ButtonComponent from '../../components/atoms/ButtonComponent';
import { storage } from '../../utils/utils';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    const otpString = newOtp.join('');

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

 const onPressVerify = async () => {
  await storage.set('access_token', 'hub');
  router.replace('/(main)');
};




  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Ionicons name="arrow-back-outline" style={styles.backButton} />
        <Text style={styles.headTitle}>Enter OTP Code</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.otpSendText}>Code has been sent to +91 ********00</Text>
        
        <View style={styles.otpContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={ref => inputs.current[index] = ref}
              style={styles.otpInput}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              value={otp[index]}
              selectTextOnFocus
            />
          ))}
        </View>
        
        <Text style={styles.otpResendText}>
          Resend code in <Text style={styles.counterText}>56s</Text>
        </Text>
      </View>
      <View style={styles.footer}>
        <ButtonComponent 
          title="Verify"  
          onPress={onPressVerify} 
          style={styles.verifyButton} 
        />
      </View>
    </SafeAreaView>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingTop: verticalScale(30),
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10),
  },
  backButton: {
    fontSize: moderateScale(24),
    color: 'black',
    fontWeight: 'bold',
  },
  headTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: 'black',
  },
  body: {
    alignItems: 'center',
    gap: moderateScale(20),
  },
  otpSendText: {
    fontSize: moderateScale(16),
    color: '#333',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: moderateScale(8),
    width: moderateScale(50),
    height: moderateScale(50),
    textAlign: 'center',
    fontSize: moderateScale(18),
    backgroundColor: 'white',
  },
  counterText: {
    color: '#24a6f0ff',
  },
  otpResendText: {
    fontSize: moderateScale(13),
    color: '#24a6f0ff',
  },
  footer: {
    alignItems: 'center',
  },
  verifyButton: {
    backgroundColor: '#248fcdff',
    borderRadius: moderateScale(30),
  },
});