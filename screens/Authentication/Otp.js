import React, { useEffect, useState } from 'react';
import {
    View,
    Text
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants';
import AuthLayout from './AuthLayout';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CompTextButton from '../../components/CompTextButton';

const Otp = ({ route }) => {
    const { nav_email } = route?.params
    const [staTimer, setStaTimer] = useState(6)
    useEffect(() => {
        let tmp_interval = setInterval(() => {
            setStaTimer(prev_timer => {
                if (prev_timer > 0) {
                    return prev_timer - 1
                } else {
                    return prev_timer
                }
            })
        }, 1000);
        return () => clearInterval(tmp_interval)
    }, [])
    return (
        <AuthLayout
            propTitle='Kiem chung OTP'
            propSubtitle={`1 ma code kiem chung se duoc gui toi: ${nav_email}`}
            propTitleContainerStyle={{ marginTop: SIZES.padding * 2 }}
        >
            <View
                style={{ flex: 1, marginTop: SIZES.padding * 2, }}
            >
                <OTPInputView
                    pinCount={4}
                    style={{
                        width: '100%',
                        height: 50,
                    }}
                    codeInputFieldStyle={{
                        width: 65,
                        height: 65,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2,
                        color: COLORS.black,
                        ...FONTS.h3,
                    }}
                    onCodeFilled={item_code => alert(item_code)}
                />
                {/* coutodown timer */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: SIZES.padding,
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.darkGray,
                            ...FONTS.body3,
                        }}
                    >
                        Ban chua nhan duoc code?
                    </Text>
                    <CompTextButton
                        propLabel={`Gui lai (${staTimer}s)`}
                        propDisabled={staTimer === 0 ? false : true}
                        propButtonContainerStyle={{
                            marginLeft: SIZES.base,
                            backgroundColor: null
                        }}
                        propLabelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3
                        }}
                        propOnPress={() => setStaTimer(6)}
                    />
                </View>
            </View>
            {/* footer */}
            <View>
                <CompTextButton
                    propLabel='Tiep tuc'
                    propButtonContainerStyle={{
                        height: 50,
                        alignItems: 'center',
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary,
                    }}
                    propOnPress={() => alert('Tiep tuc')}
                />
                <View
                    style={{
                        marginTop: SIZES.padding,
                        alignItems: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.darkGray,
                            ...FONTS.body3,
                        }}
                    >
                        Ban se OK dieu khoan cua chung toi:
                    </Text>
                    <CompTextButton
                        propLabel='Dieu khoan'
                        propButtonContainerStyle={{
                            marginLeft: 3,
                            backgroundColor: null
                        }}
                        propLabelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3,
                        }}
                        propOnPress={() => alert('Dieu khoan')}
                    />
                </View>
            </View>
        </AuthLayout>
    )
}

export default Otp;