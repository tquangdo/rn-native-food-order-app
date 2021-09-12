import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { COLORS, FONTS, SIZES } from '../constants'

const CompFormInput = ({
    pContainerStyle,
    pLabel,
    pPlaceHolder,
    pInputStyle,
    pPrependComponent,
    pAppendComponent,
    pOnChange,
    pSecureTextEntry,
    pAutoCompleteType = 'off',
    pAutoCapitalize = 'none',
    pErrorMsg = '',
}) => {
    return (
        <View
            style={{ ...pContainerStyle }}
        >
            {/* label & err msg */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    style={{ color: COLORS.gray, ...FONTS.body4, }}
                >
                    {pLabel}
                </Text>
                <Text
                    style={{ color: COLORS.red, ...FONTS.body4, }}
                >
                    {pErrorMsg}
                </Text>
            </View>
            {/* text input */}
            <View
                style={{
                    flexDirection: 'row',
                    height: 55,
                    paddingHorizontal: SIZES.padding,
                    marginTop: SIZES.base,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray1,
                }}
            >
                {pPrependComponent}
                <TextInput
                    style={{ flex: 1, ...pInputStyle }}
                    placeholder={pPlaceHolder}
                    placeholderTextColor={COLORS.gray}
                    secureTextEntry={pSecureTextEntry}
                    autoCompleteType={pAutoCompleteType}
                    autoCapitalize={pAutoCapitalize}
                    onChangeText={item_text => pOnChange(item_text)}
                />
                {pAppendComponent}
            </View>
        </View>
    )
}

export default CompFormInput
