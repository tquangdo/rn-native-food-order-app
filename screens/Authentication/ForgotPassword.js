import React from 'react';
import {
    View,
    Text
} from 'react-native';
import AuthLayout from './AuthLayout';
import { COLORS, FONTS, SIZES } from '../../constants';

const ForgotPassword = ({ route }) => {
    const { nav_email } = route?.params
    return (
        <AuthLayout
            propTitle='Lay lai Password'
            propSubtitle={`Hay nhap email de lay lai Password. Email o screen truoc ban dang nhap la: ${nav_email}`}
            propTitleContainerStyle={{ marginTop: SIZES.padding * 2 }}
        >

        </AuthLayout>
    )
}

export default ForgotPassword;