import React, { useEffect, useRef } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { COLORS, constants, dummyData, FONTS, icons, SIZES } from '../constants';
import { setSelectedTab } from '../stores/tab/tabActions';
import CartTab from './Cart/CartTab';
import Home from './Home/Home';
import Notification from './Notification/Notification';

const TabButton = ({ propLabel, propIcon, propIsFocused, propOnPress, propOuterContStyle, propInnerContStyle }) => {
    return (
        <TouchableWithoutFeedback onPress={propOnPress}>
            <Animated.View
                style={[styles.styTabBtn
                    , propOuterContStyle
                ]}
            >
                <Animated.View
                    style={[styles.styTabBtnAnimate
                        , propInnerContStyle
                    ]}
                >
                    <Image
                        source={propIcon}
                        style={[
                            styles.styTabBtnImg
                            , { tintColor: propIsFocused ? COLORS.white : COLORS.gray, }
                        ]}
                    />
                    {propIsFocused && <Text
                        numberOfLines={1}
                        style={[
                            styles.styTabBtnTxt
                            , { color: propIsFocused ? COLORS.white : COLORS.gray, }
                        ]}
                    >
                        {propLabel}
                    </Text>}
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}
const MainLayout = ({ propDrawerAnimationStyle, navigation, sta2PropSelectedTab, dis2PropSetSelectedTab }) => {
    const flatListRef = useRef()
    // Reanimated Shared Value
    const homeTabFlex = useSharedValue(1)
    const cartTabFlex = useSharedValue(1)
    const notificationTabFlex = useSharedValue(1)
    const homeTabColor = useSharedValue(COLORS.white)
    const cartTabColor = useSharedValue(COLORS.white)
    const notificationTabColor = useSharedValue(COLORS.white)
    // Reanimated Animated Style
    const homeFlexStyle = useAnimatedStyle(() => {
        return { flex: homeTabFlex.value }
    })
    const homeColorStyle = useAnimatedStyle(() => {
        return { backgroundColor: homeTabColor.value }
    })
    const cartFlexStyle = useAnimatedStyle(() => {
        return { flex: cartTabFlex.value }
    })
    const cartColorStyle = useAnimatedStyle(() => {
        return { backgroundColor: cartTabColor.value }
    })
    const notificationFlexStyle = useAnimatedStyle(() => {
        return { flex: notificationTabFlex.value }
    })
    const notificationColorStyle = useAnimatedStyle(() => {
        return { backgroundColor: notificationTabColor.value }
    })
    useEffect(() => {
        if (sta2PropSelectedTab === constants.screens.home) {
            flatListRef?.current?.scrollToIndex({
                index: 0,
                animated: false,
            })
            homeTabFlex.value = withTiming(4, { duration: 300 })
            homeTabColor.value = withTiming(COLORS.primary, { duration: 300 })
        } else {
            homeTabFlex.value = withTiming(1, { duration: 300 })
            homeTabColor.value = withTiming(COLORS.white, { duration: 300 })
        }
        if (sta2PropSelectedTab === constants.screens.cart) {
            flatListRef?.current?.scrollToIndex({
                index: 2,
                animated: false,
            })
            cartTabFlex.value = withTiming(4, { duration: 300 })
            cartTabColor.value = withTiming(COLORS.primary, { duration: 300 })
        } else {
            cartTabFlex.value = withTiming(1, { duration: 300 })
            cartTabColor.value = withTiming(COLORS.white, { duration: 300 })
        }
        if (sta2PropSelectedTab === constants.screens.notification) {
            flatListRef?.current?.scrollToIndex({
                index: 4,
                animated: false,
            })
            notificationTabFlex.value = withTiming(4, { duration: 300 })
            notificationTabColor.value = withTiming(COLORS.primary, { duration: 300 })
        } else {
            notificationTabFlex.value = withTiming(1, { duration: 300 })
            notificationTabColor.value = withTiming(COLORS.white, { duration: 300 })
        }
    }, [sta2PropSelectedTab])
    useEffect(() => {
        dis2PropSetSelectedTab(constants.screens.home) //default init = "home"
    }, [])
    let var_prop_title = (sta2PropSelectedTab.toUpperCase() === 'CART') ? 'GIO HANG' : (sta2PropSelectedTab.toUpperCase() === 'NOTIFICATION') ? 'THONG BAO' : sta2PropSelectedTab.toUpperCase()
    return (
        <Animated.View
            style={[
                styles.styAnimateView,
                { ...propDrawerAnimationStyle, }
            ]}
        >
            {/* Header */}
            <Header
                propContainerStyle={styles.styHeader}
                propTitle={var_prop_title}
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
                <FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment='center'
                    // phai co cai nay thi navigate: SignIn => Home > move Home->Cart > Dang xuat => SignIn => quay lai "Home" chu ko phai "Cart"!
                    initialScrollIndex={0}
                    onScrollToIndexFailed={() => {
                        const wait = new Promise(resolve => setTimeout(resolve, 500));
                        wait.then(() => {
                            flatListRef.current?.scrollToIndex({ index: 0, animated: true });
                        });
                    }}
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={styles.styContentView}
                            >
                                {item.label === constants.screens.home && <Home />}
                                {item.label === constants.screens.cart && <CartTab />}
                                {item.label === constants.screens.notification && <Notification />}
                            </View>
                        )
                    }}
                />
            </View>
            {/* Footer */}
            <View
                style={styles.styFooter}
            >
                {/* Shadow */}
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 10 }}
                    colors={[
                        COLORS.transparent,
                        COLORS.lightGray1,
                    ]}
                    style={styles.styGradient}
                />
                {/* Tabs */}
                <View
                    style={styles.styTab}
                >
                    <TabButton
                        propLabel={constants.screens.home}
                        propIcon={icons.home}
                        propIsFocused={sta2PropSelectedTab === constants.screens.home}
                        propOuterContStyle={homeFlexStyle}
                        propInnerContStyle={homeColorStyle}
                        propOnPress={() => dis2PropSetSelectedTab(constants.screens.home)}
                    />
                    <TabButton
                        propLabel={'Gio hang'}
                        propIcon={icons.cart}
                        propIsFocused={sta2PropSelectedTab === constants.screens.cart}
                        propOuterContStyle={cartFlexStyle}
                        propInnerContStyle={cartColorStyle}
                        propOnPress={() => dis2PropSetSelectedTab(constants.screens.cart)}
                    />
                    <TabButton
                        propLabel={'Thong bao'}
                        propIcon={icons.notification}
                        propIsFocused={sta2PropSelectedTab === constants.screens.notification}
                        propOuterContStyle={notificationFlexStyle}
                        propInnerContStyle={notificationColorStyle}
                        propOnPress={() => dis2PropSetSelectedTab(constants.screens.notification)}
                    />
                </View>
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
    styContentView: {
        height: SIZES.height,
        width: SIZES.width,
    },
    styAnimateView: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    styTabBtnTxt: {
        marginLeft: SIZES.base,
        ...FONTS.h3,
    },
    styTabBtnImg: {
        width: 20,
        height: 20,
    },
    styTabBtnAnimate: {
        flexDirection: 'row',
        width: '80%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
    },
    styTabBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    styTab: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: SIZES.radius,
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: COLORS.white,
    },
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
