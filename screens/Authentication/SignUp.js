import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import CompFormInput from '../../components/CompFormInput';
import AuthLayout from './AuthLayout';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import utils from '../../utils/Utils';
import CompTextButton from '../../components/CompTextButton';

const SignUp = ({ navigation }) => {
    const [staEmail, setStaEmail] = useState('')
    const [staUsername, setStaUsername] = useState('')
    const [staPassword, setStaPassword] = useState('')
    const [staShowPass, setStaShowPass] = useState(false)
    const [staEmailError, setStaEmailError] = useState('email ko hop le!!!')
    const [staUsernameError, setStaUsernameError] = useState('username phai > 1 ki tu!!!')
    const [staPasswordError, setStaPasswordError] = useState('password phai > 5 ki tu!!!')
    function _isEnableSignUp() {
        return staEmailError === '' && staUsernameError === '' && staPasswordError === ''
    }

    return (
        <AuthLayout
            propTitle='Bat dau'
            propSubtitle='Tao 1 tai khoan de tiep tuc'
            propTitleContainerStyle={{ marginTop: SIZES.radius }}
        >
            <View
                style={{ flex: 1, marginTop: SIZES.padding, }}
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
                                source={(staEmail !== '' && staEmailError === '') ? icons.correct : icons.cross}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: (staEmail !== '' && staEmailError === '') ? COLORS.green : COLORS.red,
                                }}
                            />
                        </View>
                    }
                />
                <CompFormInput
                    pLabel='username'
                    pContainerStyle={{ marginTop: SIZES.radius }}
                    pOnChange={item_value => {
                        utils.validateUsername(item_value, setStaUsernameError)
                        setStaUsername(item_value)
                    }}
                    pErrorMsg={staUsernameError}
                    pAppendComponent={
                        <View
                            style={{ justifyContent: 'center', }}
                        >
                            <Image
                                source={(staUsername !== '' && staUsernameError === '') ? icons.correct : icons.cross}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: (staUsername !== '' && staUsernameError === '') ? COLORS.green : COLORS.red,
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
                        utils.validatePassword(item_value, setStaPasswordError)
                        setStaPassword(item_value)
                    }}
                    pErrorMsg={staPasswordError}
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
                {/* sign up */}
                <CompTextButton
                    propLabel='Dang ky'
                    propDisabled={_isEnableSignUp() ? false : true}
                    propButtonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: _isEnableSignUp() ? COLORS.primary : COLORS.transparentPrimray,
                    }}
                    propOnPress={() => navigation.navigate('Otp', {
                        nav_email: staEmail,
                    })}
                />
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
                        Ban da co tai khoan?
                    </Text>
                    <CompTextButton
                        propLabel='Dang nhap'
                        propButtonContainerStyle={{
                            marginLeft: 3,
                            backgroundColor: null
                        }}
                        propLabelStyle={{
                            color: COLORS.primary,
                            ...FONTS.h3,
                        }}
                        propOnPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </AuthLayout>
    )
}

export default SignUp;