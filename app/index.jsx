import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect,router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants'
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
export default function App() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView
                contentContainerStyle={{
                    height: "100%",
                }}
            >
            <View className="w-full justify-center items-center min-h-[85vh] px-6 ">
                    <Image
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode='contain'
                    />
                    <Image
                        source={images.cards}
                        className="max-w-[380px] w-full h-[300px]"
                        resizeMode='contain'
                    />
                    <View
                        className='relative mt-5'>
                        <Text className='font-bold text-3xl text-white text-center'>
                            Discover Endless Possiblities with <Text className='text-secondary-200'>Aora</Text>
                        </Text>
                        <Image source={images.path} className='w-[136px] h-[15px] absolute -bottom-2 -right-8' resizeMode='contain' />
                    </View>
                    <Text className='text-sm text-gray-100 font-pregular mt-7 text-center'>Where Creativity meets innovation : embark on a journey of limitlessness with Aora</Text>
                    <CustomButton 
                        title="Continue with Email"
                        handlePress={()=>router.push('/sign-in')}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>
            
            {/* This one shows the StatusBar of the mobile visible */}
            <StatusBar
                backgroundColor='#161622'
                style='light'
            />

        </SafeAreaView>
    );
}

