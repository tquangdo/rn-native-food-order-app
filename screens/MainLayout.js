import React, { useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { COLORS, constants, dummyData, icons, SIZES } from '../constants';
import { setSelectedTab } from '../stores/tab/tabActions';

const MainLayout = ({ propDrawerAnimationStyle, navigation, sta2PropSelectedTab, dis2PropSetSelectedTab }) => {
    useEffect(() => {
        dis2PropSetSelectedTab(constants.screens.home)
    }, [])
    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                ...propDrawerAnimationStyle,
            }}
        >
            {/* Header */}
            <Header
                propContainerStyle={styles.styHeader}
                propTitle={sta2PropSelectedTab.toUpperCase()}
                propLeftComponent={
                    <TouchableOpacity
                        style={styles.styHeaderLeftBtn}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image source={icons.menu} />
                    </TouchableOpacity>
                }
                propRightComponent={
                    <TouchableOpacity
                        style={styles.styHeaderRightBtn}
                    >
                        <Image source={dummyData?.myProfile?.profile_image}
                            style={styles.styHeaderImg}
                        />
                    </TouchableOpacity>
                }
            />
            {/* Content */}
            <View
                style={styles.styContent}
            >
                <Text>MainLayout</Text>
            </View>
            {/* Footer */}
            <View
                style={styles.styFooter}
            >
                {/* Shadow */}
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 4 }}
                    colors={[
                        COLORS.transparent,
                        COLORS.lightGray1,
                    ]}
                    style={styles.styGradient}
                />
            </View>
        </Animated.View>
    )
}

function mapStateToProps(state) {
    return {
        sta2PropSelectedTab: state.tabReducer.selectedTab
    }
}
function mapDispatchToProps(dispatch) {
    return {
        dis2PropSetSelectedTab: (arg_selected_tab) => {
            return dispatch(setSelectedTab(arg_selected_tab))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);

const styles = StyleSheet.create({
    styGradient: {
        position: 'absolute',
        top: -20,
        left: 0,
        right: 0,
        height: 100,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    styFooter: {
        height: 100,
        justifyContent: 'flex-end',
    },
    styHeaderImg: {
        height: 40,
        width: 40,
        borderRadius: SIZES.radius,
    },
    styHeaderRightBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: SIZES.radius,
    },
    styHeader: {
        height: 50,
        paddingHorizontal: SIZES.padding,
        marginTop: 40,
        alignItems: 'center',
    },
    styContent: {
        flex: 1
    },
    styHeaderLeftBtn: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.gray2,
        borderRadius: SIZES.radius,
    },
})
