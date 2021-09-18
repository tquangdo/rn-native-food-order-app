import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity, View
} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import CompCustomSwitch from '../../components/CompCustomSwitch';
import CompFormInput from '../../components/CompFormInput';
import CompTextButton from '../../components/CompTextButton';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import utils from '../../utils/Utils';
import AuthLayout from './AuthLayout';
import { firebase, auth, WEB_CLIENT_ID } from './fbaseConfig'
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
})

const SignIn = ({ navigation }) => {
    const [staEmail, setStaEmail] = useState('')
    const [staPassword, setStaPassword] = useState('')
    const [staEmailError, setStaEmailError] = useState('email ko hop le!!!')
    const [staPasswordError, setStaPasswordError] = useState('password phai > 5 ki tu!!!')
    const [staShowPass, setStaShowPass] = useState(false)
    const [staSaveMe, setStaSaveMe] = useState(false)
    async function _onLoginGG() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn()
            .catch(err => {
                alert(err)
            })
        // Create a Google credential with the token
        const tmp_gg_credentail = firebase.auth.GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
        auth().signInWithCredential(tmp_gg_credentail)
            .then(currentUser => {
                const { additionalUserInfo } = currentUser
                alert(`Google login with user : ${additionalUserInfo?.profile?.email}`)
                navigation.navigate('Home', {
                    nav_email: additionalUserInfo?.profile?.email,
                })
            })
            .catch(err => {
                alert(`Google login fail with error: ${err}`)
            })
    }
    _onLoginFB = () => {
        LoginManager
            .logInWithPermissions(['public_profile', 'email'])
            .then(result => {
                if (result.isCancelled) {
                    return Promise.reject(new Error('Ban da cancel login FB!!!'))
                }
                return AccessToken.getCurrentAccessToken()
            })
            .then(data => {
                const tmp_fb_credentail = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
                return auth().signInWithCredential(tmp_fb_credentail)
            })
            .then(currentUser => {
                const { additionalUserInfo } = currentUser
                alert(`Facebook login with user : ${additionalUserInfo?.profile?.email}`)
                navigation.navigate('Home', {
                    nav_email: additionalUserInfo?.profile?.email,
                })
            })
            .catch(err => {
                alert(`Facebook login fail with error: ${err}`)
            })
    }
    function _isEnableSignIn() {
        return staEmailError === '' && staPasswordError === ''
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
                        propOnPress={() => navigation.navigate('ForgotPassword', {
                            nav_email: staEmail,
                        })}
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
            {/* footer */}
            <View>
                {/* fb */}
                <TouchableOpacity
                    style={{
                        ...styles.btn,
                        height: 50,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.blue,
                    }}
                    onPress={() => _onLoginFB()}
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
                    onPress={() => _onLoginGG()}
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