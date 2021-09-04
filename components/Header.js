import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FONTS } from '../constants'

const Header = ({ propContainerStyle, propTitle, propLeftComponent, propRightComponent }) => {
    return (
        <View
            style={{
                flexDirection: 'row', ...propContainerStyle,
            }}
        >
            {/* Left */}
            {propLeftComponent}
            {/* Title */}
            <View
                style={styles.styHeaderTitle}
            >
                <Text
                    style={styles.styHeaderTitleTxt}
                >{propTitle} </Text>
            </View>
            {/* Right */}
            {propRightComponent}
        </View>
    )
}

export default Header
const styles = StyleSheet.create({
    styHeaderTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    styHeaderTitleTxt: {
        ...FONTS.h3
    },
})

