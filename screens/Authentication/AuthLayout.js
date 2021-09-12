import React from 'react'
import { View, Text, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { COLORS, FONTS, images, SIZES } from '../../constants'

const AuthLayout = ({ propTitle, propSubtitle, propTitleContainerStyle, children }) => {
    return (
        <View
            style={{
                flex: 1,
                paddingVertical: SIZES.padding,
                backgroundColor: COLORS.white,
            }}
        >
            <KeyboardAwareScrollView
                keyboardDismissMode='on-drag'
                contentContainerStyle={{
                    flex: 1,
                    paddingHorizontal: SIZES.padding,
                }}
            >
                {/* app icon */}
                <View
                    style={{ alignItems: 'center', }}
                >
                    <Image
                        source={images.logo_02}
                        resizeMode='contain'
                        style={{
                            height: 100,
                            width: 200,
                        }}
                    />
                </View>
                {/* title & subtitle */}
                <View
                    style={{
                        marginTop: SIZES.padding,
                        ...propTitleContainerStyle,
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            ...FONTS.h2,
                        }}
                    >
                        {propTitle}
                    </Text>
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLORS.darkGray,
                            marginTop: SIZES.base,
                            ...FONTS.body3,
                        }}
                    >
                        {propSubtitle}
                    </Text>
                </View>
                {/* content */}
                {children}
            </KeyboardAwareScrollView>
        </View>
    )
}

export default AuthLayout
