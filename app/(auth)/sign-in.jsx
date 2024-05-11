import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React,{useState} from 'react'
import {images} from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

const SignIn = () => {
  const [from, setFrom] = useState(
    {
      email: '',
      password: ''
    }
  )
  const [isSumbitting, setIsSumbitting] = useState(false)

  const submit = () => {

  }

  return (
<SafeAreaView className='bg-primary h-full'>
    <ScrollView>
      <View className='w-full justify-center min-h-[90vh] px-4 my-6'>
        <Image 
          source={images.logo}
          resizeMode='contain'
          className='w-[115px] h-[35px]'
        />
        <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>Log in to Aora</Text>
        
          <FormField
            title="Email"
            value={from.email}
            handleChangeText={(e) => setFrom({ ...from, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />        
          <FormField
            title="Password"
            value={from.password}
            handleChangeText={(e) => setFrom({ ...from, password: e })}
            otherStyles='mt-7'
          />
          <CustomButton 
            title="Sign In"
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSumbitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
          <Text className='text-lg text-gray-100 font-pregular'>Don't have an Account?</Text>
          <Link href='/sign-up' className='text-lg font-psemibold text-secondary-200'>Sign Up</Link>
          </View>
      
      </View>
    </ScrollView>
</SafeAreaView>
  )
}

export default SignIn