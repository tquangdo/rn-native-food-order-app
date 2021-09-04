import React from 'react';
import {
    Text
} from 'react-native';
import Animated from 'react-native-reanimated';

const MainLayout = ({ propDrawerAnimationStyle }) => {
    return (
        <Animated.View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                ...propDrawerAnimationStyle,
            }}
        >
            <Text>MainLayout</Text>
        </Animated.View>
    )
}

export default MainLayout;