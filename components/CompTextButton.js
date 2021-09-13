import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { COLORS, FONTS } from '../constants'

const CompTextButton = ({ propLabel, propDisabled = false, propLabelStyle, propButtonContainerStyle, propOnPress }) => {
    return (
        <TouchableOpacity
            disabled={propDisabled}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
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
