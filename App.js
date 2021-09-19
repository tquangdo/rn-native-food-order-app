import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import CustomDrawer from "./navigation/CustomDrawer";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './stores/rootReducer'
import {
    OnBoarding,
    SignIn,
    SignUp,
    ForgotPassword,
    Otp
} from './screens'
import AsyncStorage from '@react-native-community/async-storage';
// import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();
const cst_store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)
const App = () => {
    // useEffect(() => {
    //     SplashScreen.hide();
    // }, [])
    const [staIs1stLaunch, setStaIs1stLaunch] = useState(null) // staIs1stLaunch=null
    useEffect(() => {
        AsyncStorage.getItem('ASTO_LAUNCHED').then(item_val => {
            if (item_val == null) { // item_val=null
                AsyncStorage.setItem('ASTO_LAUNCHED', 'true')
                setStaIs1stLaunch(true) // staIs1stLaunch=true
            } else {
                setStaIs1stLaunch(false)
            }
        })
    }, [])
    let tmp_route_name
    if (staIs1stLaunch === null) {
        return null;
    } else if (staIs1stLaunch == true) {
        tmp_route_name = 'OnBoarding'; // --> this!!!
    } else {
        tmp_route_name = 'SignIn';
    }
    return (
        <Provider store={cst_store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={tmp_route_name}
                >
                    <Stack.Screen
                        name="Home"
                        component={CustomDrawer}
                    />
                    <Stack.Screen
                        name="OnBoarding"
                        component={OnBoarding}
                    />

                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                    />

                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                    />

                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPassword}
                    />

                    <Stack.Screen
                        name="Otp"
                        component={Otp}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App