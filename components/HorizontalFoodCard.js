import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONTS, icons, SIZES } from '../constants'

const HorizontalFoodCard = ({ propContainerStyle, propImageStyle, propItem, propOnPress }) => {
    return (
        <TouchableOpacity
            style={[
                styles.styBtn
                , { ...propContainerStyle, }
            ]}
        >
            <Image
                source={propItem.image}
                style={propImageStyle}
            />
            <View
                style={styles.styInfo}
            >
                <Text
                    style={styles.styName}
                >
                    {propItem.name}
                </Text>
                <Text
                    style={styles.styDesc}
                >
                    {propItem.description}
                </Text>
                <Text
                    style={styles.styPrice}
                >
                    ${propItem.price}
                </Text>
            </View>
            <View
                style={styles.styCalo}
            >
                <Image
                    source={icons.calories}
                    style={styles.styCaloImg}
                />
                <Text
                    style={styles.styCaloTxt}
                >
                    {propItem.calories} Calo
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default HorizontalFoodCard

const styles = StyleSheet.create({
    styInfo: {
        flex: 1
    },
    styCaloTxt: {
        color: COLORS.darkGray2,
        ...FONTS.body5,
    },
    styCaloImg: {
        width: 30,
        height: 30,
    },
    styCalo: {
        flexDirection: 'row',
        position: 'absolute',
        top: 5,
        right: SIZES.radius,
    },
    styPrice: {
        ...FONTS.h2,
        marginTop: SIZES.base,
    },
    styDesc: {
        ...FONTS.body4,
        color: COLORS.darkGray2,
    },
    styName: {
        ...FONTS.h3,
        fontSize: 17,
    },
    styBtn: {
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
    },
})
