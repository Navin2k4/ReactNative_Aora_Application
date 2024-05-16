import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import {useGlobalContext} from '../../context/GlobalProvider'

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    thumbnail: null,
    video: null,
    prompt: '',
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ?  ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
  });
    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }
      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    }
  }


  const submit = async () => {
    if (!form.prompt || !form.title || !form.video || !form.thumbnail) {
      return Alert.alert("Please Fill in All the fields");
    }
    setUploading(true);
    try {
      await createVideo({
        ...form,
        userId: user.$id
      })

      Alert.alert("Success", "Post Uploaded successfully");
      router.push('/home')
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: '',
        thumbnail: null,
        video: null,
        prompt: '',
      })
      setUploading(false);
    }
  }

  return (
    <SafeAreaView className='h-full bg-primary'>
      <ScrollView className='px-4 my-6'>
        <Text className=' text-2xl font-psemibold text-white'>
          Upload Video
        </Text>
        <FormField
          title="Video Title"
          value={form.title}
          placeHolder='Give Your Video a catchy Title'
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles='mt-10'
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>Upload Video</Text>
          <TouchableOpacity
            onPress={() => openPicker('video')}>
            {
              form.video ?
                (
                  <Video
                    source={{ uri: form.video.uri }}
                    className='w-full h-64 rounded-2xl'
                    resizeMode={ResizeMode.COVER}
                  />
                )
                :
                (
                  <View className='w-full h-40 px-4 bg-black-100 rounded-2xl items-center justify-center'>
                    <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center rounded-lg items-center'>
                      <Image
                        source={icons.upload}
                        resizeMode='cotain'
                        className='w-1/2 h-1/2'
                      />
                    </View>
                  </View>
                )
            }
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>Thumbnail Image</Text>
          <TouchableOpacity
            onPress={() => openPicker('image')}>
            {
              form.thumbnail ?
                (
                  <Image
                    source={{ uri: form.thumbnail.uri }}
                    className='w-full h-64 rounded-2xl'
                    resizeMode={ResizeMode.COVER}
                  />
                )
                :
                (
                  <View className='w-full h-16 px-4 bg-black-100 rounded-2xl items-center justify-center border-2 border-black-200 flex-row space-x-2'>
                    <Image
                      source={icons.upload}
                      resizeMode='cotain'
                      className='w-5 h-5'
                    />
                    <Text className='text-sm text-gray-100 font-pmedium'>
                      Choose a file
                    </Text>
                  </View>
                )
            }
          </TouchableOpacity>
        </View>
        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeHolder='The Prompt you used to create this Video'
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles='mt-7'
        />
        <CustomButton
          title="Submit and Publish"
          handlePress={submit}
          containerStyles='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create