import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity, View
} from 'react-native';
import CompCustomSwitch from '../../components/CompCustomSwitch';
import CompFormInput from '../../components/CompFormInput';
import CompTextButton from '../../components/CompTextButton';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import utils from '../../utils/Utils';
import AuthLayout from './AuthLayout';

const SignIn = ({ navigation }) => {
    const [staEmail, setStaEmail] = useState('')
    const [staPassword, setStaPassword] = useState('')
    const [staEmailError, setStaEmailError] = useState('')
    const [staShowPass, setStaShowPass] = useState(false)
    const [staSaveMe, setStaSaveMe] = useState(false)
    function _isEnableSignIn() {
        return staEmail !== '' && staPassword !== '' && staEmailError === ''
    }
    return (
        <AuthLayout
            propTitle="Dang nhap"
            propSubtitle='Xin chao ban den voi thu tuc dang nhap'
        >
            <View
                style={{
                    flex: 1,
                    marginTop: SIZES.padding * 2,
                }}
            >
                {/* form input */}
                <CompFormInput
                    pLabel='email'
                    pOnChange={item_value => {
                        utils.validateEmail(item_value, setStaEmailError)
                        setStaEmail(item_value)
                    }}
                    pErrorMsg={staEmailError}
                    pAppendComponent={
                        <View
                            style={{ justifyContent: 'center', }}
                        >
                            <Image
                                source={staEmail === '' || (staEmail !== '' && staEmailError === '') ? icons.correct : icons.cross}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: staEmail === '' || (staEmail !== '' && staEmailError === '') ? COLORS.green : COLORS.red,
                                }}
                            />
                        </View>
                    }
                />
                <CompFormInput
                    pLabel='password'
                    pSecureTextEntry={!staShowPass}
                    pContainerStyle={{ marginTop: SIZES.radius, }}
                    pOnChange={item_value => {
                        setStaPassword(item_value)
                    }}
                    pAppendComponent={
                        <TouchableOpacity
                            style={{
                                width: 40,
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                            }}
                            onPress={() => setStaShowPass(!staShowPass)}
                        >
                            <Image
                                source={staShowPass ? icons.eye_close : icons.eye}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: COLORS.gray,
                                }}
                            />
                        </TouchableOpacity>
                    }
                />
                {/* save & forgot PW */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        justifyContent: 'space-between'
                    }}
                >
                    <CompCustomSwitch
                        propValue={staSaveMe}
                        propOnChange={item_val => setStaSaveMe(item_val)}
                    />
                    <CompTextButton
                        propLabel='Quen password'
                        propButtonContainerStyle={{ backgroundColor: null }}
                        propLabelStyle={{
                            color: COLORS.gray,
                            ...FONTS.body4,
                        }}
                        propOnPress={() => navigation.navigate('ForgotPassword')}
                    />
                </View>
                {/* sign in */}
                <CompTextButton
                    propLabel='Dang nhap'
                    propDisabled={_isEnableSignIn() ? false : true}
                    propButtonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: _isEnableSignIn() ? COLORS.primary : COLORS.transparentPrimray,
                    }}
                    propOnPress={() => navigation.navigate('Home', {
                        nav_email: staEmail,
                    })}
                />
                {/* sign up */}
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.radius,
                        justifyContent: 'center',
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.darkGray,
                            ...FONTS.body3,
                        }}
                    >
                        Ban chua co tai khoan?
                    </Text>
                    <CompTextButton
                        propLabel='Dang ky'
                        propButtonContainerStyle={{
                            marginLeft: 3,
                            backgroundColor: null
                        }}
                        propLabelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3,
                        }}
                        propOnPress={() => navigation.navigate('SignUp')}
                    />
                </View>
            </View>
            <View>
                {/* fb */}
                <TouchableOpacity
                    style={{
                        ...styles.btn,
                        height: 50,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.blue,
                    }}
                    onPress={() => alert('Dang ky bang Facebook')}
                >
                    <Image
                        source={icons.fb}
                        style={{
                            ...styles.image,
                            tintColor: COLORS.white,
                        }}
                    />
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginLeft: SIZES.radius,
                            color: COLORS.white,
                        }}
                    >
                        Dang ky bang Facebook
                    </Text>
                </TouchableOpacity>
                {/* gg */}
                <TouchableOpacity
                    style={{
                        ...styles.btn,
                        height: 50,
                        marginTop: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.lightGray2,
                    }}
                    onPress={() => alert('Dang ky bang Google')}
                >
                    <Image
                        source={icons.google}
                        style={{
                            ...styles.image,
                            tintColor: null,
                        }}
                    />
                    <Text
                        style={{
                            ...FONTS.body3,
                            marginLeft: SIZES.radius,
                        }}
                    >
                        Dang ky bang Google
                    </Text>
                </TouchableOpacity>
            </View>
        </AuthLayout>
    )
}

export default SignIn;
const styles = StyleSheet.create({
    image: {
        marginLeft: 5,
        width: 20,
        height: 20,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})