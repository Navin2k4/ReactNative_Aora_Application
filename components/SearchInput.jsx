import { View, Alert, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery }) => {

    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || "")

    return (
        <View className="w-full h-15 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
            <TextInput
                className="flex-1 my-3 text-white font-plight text-base tracking-widest"
                value={query}
                placeholder="Search for a video topic..."
                placeholderTextColor="#CDCDE0"
                onChangeText={(e)=>setQuery(e)}
            />
            <TouchableOpacity
                onPress={()=>{
                    if(!query){
                        return Alert.alert('Missing Query','Please input something To search result across database');
                    }
                    if(pathname.startsWith('/search')) router.setParams({query})
                    else router.push(`/search/${query}`)
                }}
            >
                <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput