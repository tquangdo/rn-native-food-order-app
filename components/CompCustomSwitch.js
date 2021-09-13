import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'

const CompCustomSwitch = ({ propValue, propOnChange }) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => propOnChange(!propValue)}
        >
            <View
                style={{ flexDirection: 'row' }}
            >
                {/* switch */}
                <View
                    style={propValue ? styles.switchOnContainer : styles.switchOffContainer}
                >
                    <View
                        style={{
                            ...styles.dot,
                            backgroundColor: propValue ? COLORS.white : COLORS.gray
                        }}
                    />
                </View>
                {/* text */}
                <Text
                    style={{
                        color: propValue ? COLORS.primary : COLORS.gray,
                        marginLeft: SIZES.base,
                        ...FONTS.body4,
                    }}
                >
                    Luu password
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default CompCustomSwitch

const styles = StyleSheet.create({
    switchOnContainer: {
        width: 40,
        height: 20,
        paddingRight: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 10,
        backgroundColor: COLORS.primary
    },
    switchOffContainer: {
        width: 40,
        height: 20,
        paddingLeft: 2,
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.gray,
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
})
