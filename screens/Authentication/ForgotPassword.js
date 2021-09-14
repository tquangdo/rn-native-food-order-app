import React, { useState } from 'react';
import {
    Image, View
} from 'react-native';
import CompFormInput from '../../components/CompFormInput';
import CompTextButton from '../../components/CompTextButton';
import { COLORS, icons, SIZES } from '../../constants';
import utils from '../../utils/Utils';
import AuthLayout from './AuthLayout';

const ForgotPassword = ({ route, navigation }) => {
    const [staEmail, setStaEmail] = useState('')
    const [staEmailError, setStaEmailError] = useState('email ko hop le!!!')
    function _isEnableSendMail() {
        return staEmailError === ''
    }
    const { nav_email } = route?.params
    return (
        <AuthLayout
            propTitle='Lay lai Password'
            propSubtitle={`Hay nhap email de lay lai Password. Email o screen truoc ban dang nhap la: ${nav_email}`}
            propTitleContainerStyle={{ marginTop: SIZES.padding * 2 }}
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
            </View>
            {/* button */}
            <CompTextButton
                propLabel='Gui mail'
                propDisabled={_isEnableSendMail() ? false : true}
                propButtonContainerStyle={{
                    height: 55,
                    alignItems: 'center',
                    marginTop: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: _isEnableSendMail() ? COLORS.primary : COLORS.transparentPrimray,
                }}
                propOnPress={() => navigation.goBack()}
            />
        </AuthLayout>
    )
}

export default ForgotPassword;