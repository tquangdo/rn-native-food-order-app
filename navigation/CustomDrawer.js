import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated'
import { COLORS, constants, dummyData, FONTS, icons, SIZES } from '../constants';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { MainLayout } from '../screens';
import { connect } from 'react-redux'
import { setSelectedTab } from '../stores/tab/tabActions';

const Drawer = createDrawerNavigator()
const { width } = Dimensions.get('screen')
const CustomDrawerItem = ({ propLabel, propIcon, propIsFocused, propOnPress }) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                marginBottom: SIZES.base,
                alignItems: 'center',
                paddingLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: propIsFocused ? COLORS.transparentBlack1 : null,
            }}
            onPress={propOnPress}
        >
            <Image
                source={propIcon}
                style={styles.styCloseImg}
            />
            <Text
                style={styles.styItemTxt}
            >{propLabel} </Text>
        </TouchableOpacity>
    )
}
const CustomDrawerContent = ({ propNavigation, propSelectedTab, propSetSelectedTab }) => {
    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={styles.styContContainer}>
            <View
                style={styles.styContView}
            >
                {/* Close */}
                <View
                    style={styles.styClose}
                >
                    <TouchableOpacity
                        style={styles.styCloseBtn}
                        onPress={() => propNavigation.closeDrawer()}
                    >
                        <Image
                            source={icons.cross}
                            style={styles.styCloseImg}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Profile */}
            <TouchableOpacity
                style={styles.styProfileBtn}
                onPress={() => alert('Profile')}
            >
                <Image
                    source={dummyData?.myProfile?.profile_image}
                    style={styles.styProfileImg}
                />
                <View
                    style={styles.styProfileView}
                >
                    <Text
                        style={styles.styProfileTxt1}
                    >{dummyData?.myProfile?.name} </Text>
                    <Text
                        style={styles.styProfileTxt2}
                    >Xem profile cua ban</Text>
                </View>
            </TouchableOpacity>
            {/* Drawer Items */}
            <View
                style={styles.styItemView}
            >
                <CustomDrawerItem
                    propLabel={constants.screens.home}
                    propIcon={icons.home}
                    propIsFocused={propSelectedTab === constants.screens.home}
                    propOnPress={() => {
                        propSetSelectedTab(constants.screens.home)
                        propNavigation.navigate("MainLayout")
                    }}
                />
                <CustomDrawerItem
                    propLabel={constants.screens.notification}
                    propIcon={icons.notification}
                    propIsFocused={propSelectedTab === constants.screens.notification}
                    propOnPress={() => {
                        propSetSelectedTab(constants.screens.notification)
                        alert('Thong bao')
                    }}
                />
                {/* Line */}
                <View
                    style={styles.styLine}
                />
                <CustomDrawerItem
                    propLabel='Tuy chinh'
                    propIcon={icons.setting}
                    propIsFocused={propSelectedTab === constants.screens.setting}
                    propOnPress={() => {
                        propSetSelectedTab(constants.screens.setting)
                        propNavigation.navigate("MainLayout") // --> ERR!!!
                    }}
                />
            </View>
            <View
                style={styles.styItemLogout}
            >
                <CustomDrawerItem
                    propLabel='Dang xuat'
                    propIcon={icons.logout}
                />
            </View>
        </DrawerContentScrollView>
    )
}
const CustomDrawer = ({ sta2PropSelectedTab, dis2PropSetSelectedTab }) => {
    const [staProgress, setStaProgress] = useState(new Animated.Value(0.5))
    const scale = Animated.interpolateNode(staProgress, {
        inputRange: [0, 1],
        outputRange: [1, 0.8],
    })
    const borderRadius = Animated.interpolateNode(staProgress, {
        inputRange: [0, 1],
        outputRange: [0, 26],
    })
    const animated_style = { borderRadius, transform: [{ scale }] } // varname phai la "borderRadius/scale" vi no la key trong JSON
    return (
        <View style={styles.styView} >
            <Drawer.Navigator
                drawerType="slide"
                overlayColor="transparent"
                drawerStyle={styles.styDrawer}
                sceneContainerStyle={styles.stySceneContainer}
                initialRouteName="MainLayout"
                drawerContent={arg_props => {
                    setTimeout(() => {
                        setStaProgress(arg_props.progress) // varname phai la "progress" vi no la KW trong "drawerContent"
                    }, 0)
                    return <CustomDrawerContent
                        propNavigation={arg_props.navigation}
                        propSelectedTab={sta2PropSelectedTab}
                        propSetSelectedTab={dis2PropSetSelectedTab}
                    />
                }}
            >
                <Drawer.Screen name="MainLayout">
                    {props => <MainLayout {...props}
                        propDrawerAnimationStyle={animated_style}
                    />}
                </Drawer.Screen>
            </Drawer.Navigator>
        </View>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const styles = StyleSheet.create({
    styItemLogout: {
        marginBottom: SIZES.padding,
    },
    styLine: {
        height: 1,
        marginVertical: SIZES.radius,
        marginLeft: SIZES.radius,
        backgroundColor: COLORS.lightGray1,
    },
    styItemView: {
        flex: 1,
        marginTop: SIZES.padding,
    },
    styItemTxt: {
        marginLeft: 15,
        color: COLORS.white,
        ...FONTS.h3,
    },
    styProfileTxt1: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    styProfileTxt2: {
        color: COLORS.white,
    },
    styProfileView: {
        marginLeft: SIZES.radius,
    },
    styProfileImg: {
        height: 50,
        width: 50,
        borderRadius: SIZES.radius,
    },
    styCloseImg: {
        height: 35,
        width: 35,
        tintColor: COLORS.white
    },
    styClose: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    styProfileBtn: {
        flexDirection: 'row',
        marginTop: SIZES.radius,
        alignItems: 'center',
        marginLeft: SIZES.radius,
    },
    styCloseBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    styView: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    styDrawer: {
        width: 2 * width / 3,
        paddingRight: 20,
        backgroundColor: 'transparent',
    },
    stySceneContainer: {
        backgroundColor: 'transparent',
    },
    styContContainer: {
        flex: 1,
    },
    styContView: {
        paddingHorizontal: SIZES.radius,
    }
})
