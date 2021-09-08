import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const VerticalFoodCard = ({ propContainerStyle, propItem, propOnPress }) => {
    return (
        <TouchableOpacity
            style={{
                width: 200,
                padding: SIZES.radius,
                alignItems: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
                ...propContainerStyle,
            }}
            onPress={propOnPress}
        >
            <View
                style={{
                    flexDirection: 'row'
                }}
            >
                {/* Calo */}
                <View
                    style={{
                        flexDirection: 'row',
                        flex: 1,
                    }}
                >
                    <Image
                        source={icons.calories}
                        style={{
                            width: 30,
                            height: 30,
                        }}
                    />
                    <Text
                        style={{
                            color: COLORS.darkGray2,
                            ...FONTS.body5,
                        }}
                    >
                        {propItem.calories} Calo
                    </Text>
                </View>
                {/* Favorite */}
                <Image
                    source={icons.love}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: propItem.isFavourite ? COLORS.primary : COLORS.gray,
                    }}
                />
            </View>
            {/* Image */}
            <View
                style={{
                    height: 150,
                    width: 150,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={propItem.image}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            </View>
            {/* Info */}
            <View
                style={{
                    alignItems: 'center',
                    marginTop: -20,
                }}
            >
                <Text
                    style={{ ...FONTS.h3, }}
                >
                    {propItem.name}
                </Text>
                <Text
                    style={{
                        ...FONTS.body5,
                        color: COLORS.darkGray2,
                        textAlign: 'center'
                    }}
                >
                    {propItem.description}
                </Text>
                <Text
                    style={{
                        ...FONTS.h2,
                        marginTop: SIZES.base,
                    }}
                >
                    ${propItem.price}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default VerticalFoodCard