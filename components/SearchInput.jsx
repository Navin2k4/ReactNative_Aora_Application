import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'

const SearchInput = ({ title, value, placeHolder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setshowPassword] = useState(false)
    return (
        <View className="flex flex-row items-center space-x-3 w-full h-16 px-3 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
            <TextInput
                className="text-base text-white flex-1 font-pmedium pb-4 tracking-widest"
                value={value}
                placeholder="Search for a video topic..."
                placeholderTextColor="#7B7B8B"
                onChangeText={handleChangeText}
                secureTextEntry={title === "Password" && !showPassword}
                {...props}
            />
            <TouchableOpacity>
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