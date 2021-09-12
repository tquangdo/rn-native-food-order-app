import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import CompFormInput from '../../components/CompFormInput';
import { COLORS, icons, SIZES } from '../../constants';
import utils from '../../utils/Utils';
import AuthLayout from './AuthLayout';

const SignIn = () => {
    const [staEmail, setStaEmail] = useState('')
    const [staPassword, setStaPassword] = useState('')
    const [staEmailError, setStaEmailError] = useState('')
    const [staShowPass, setStaShowPass] = useState(false)
    return (
        <AuthLayout
            propTitle="Dang ky"
            propSubtitle='Xin chao ban den voi thu tuc dang ky'
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
                    // pAutoCompleteType='email'
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
                    pAutoCompleteType='password'
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
                {/* sign in */}
                {/* sign up */}
            </View>
        </AuthLayout>
    )
}

export default SignIn;