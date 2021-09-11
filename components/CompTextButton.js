import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS } from '../constants'

const CompTextButton = ({ propLabel, propLabelStyle, propButtonContainerStyle, propOnPress }) => {
    return (
        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                ...propButtonContainerStyle,
            }}
            onPress={propOnPress}
        >
            <Text
                style={{
                    color: COLORS.white,
                    ...FONTS.h3,
                    ...propLabelStyle
                }}
            >{propLabel}</Text>
        </TouchableOpacity>
    )
}

export default CompTextButton
