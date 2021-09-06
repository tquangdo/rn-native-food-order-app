import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CustomDrawer from "./navigation/CustomDrawer";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './stores/rootReducer'

const Stack = createStackNavigator();
const cst_store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)
const App = () => {
    return (
        <Provider store={cst_store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'Home'}
                >
                    <Stack.Screen
                        name="Home"
                        component={CustomDrawer}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App