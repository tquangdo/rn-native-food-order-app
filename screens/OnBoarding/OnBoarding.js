import React from 'react';
import {
    Image, View
} from 'react-native';
import { COLORS, images, SIZES } from '../../constants';

const OnBoarding = () => {
    function _renderHeaderLogo() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: SIZES.height > 800 ? 50 : 25,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={images.logo_02}
                    resizeMode='contain'
                    style={{
                        width: SIZES.width * 0.5,
                        height: 100,
                    }}
                />
            </View>
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            {_renderHeaderLogo()}
        </View>
    )
}

export default OnBoarding;