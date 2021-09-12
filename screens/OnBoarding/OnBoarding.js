import React, { useRef, useState } from 'react';
import {
    Animated,
    Image, ImageBackground, Text, View
} from 'react-native';
import CompTextButton from '../../components/CompTextButton';
import { COLORS, constants, FONTS, images, SIZES } from '../../constants';

const OnBoarding = ({ navigation }) => {
    function _renderHeaderLogo() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: SIZES.height > 800 ? 50 : 25,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={images.logo_02}
                    resizeMode='contain'
                    style={{
                        width: SIZES.width * 0.5,
                        height: 100,
                    }}
                />
            </View>
        )
    }
    function _renderFooter() {
        return (
            <View
                style={{ height: 160, }}
            >
                {/* pagination/dots */}
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center'
                    }}
                >
                    <CompDots />
                </View>
                {/* button */}
                {/* neu scroll ngang flat list toi item cuoi thi se invisible button */}
                {staCurrentIndex < constants.onboarding_screens.length - 1 &&
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: SIZES.padding,
                            marginVertical: SIZES.padding,
                        }}
                    >
                        <CompTextButton
                            propLabel='Bo qua'
                            propButtonContainerStyle={{ backgroundColor: null }}
                            propLabelStyle={{ color: COLORS.darkGray2 }}
                            propOnPress={() => navigation.replace('SignIn')}
                        />
                        <CompTextButton
                            propLabel='Tiep tuc'
                            propButtonContainerStyle={{
                                height: 60,
                                width: 200,
                                borderRadius: SIZES.radius,
                            }}
                            propOnPress={() => {
                                // next item
                                flatListRef?.current?.scrollToIndex({
                                    index: staCurrentIndex + 1,
                                    animated: true,
                                })
                            }}
                        />
                    </View>
                }
                {
                    staCurrentIndex === constants.onboarding_screens.length - 1 &&
                    <View
                        style={{
                            paddingHorizontal: SIZES.padding,
                            marginVertical: SIZES.padding,
                        }}
                    >
                        <CompTextButton
                            propLabel='Bat dau!'
                            propButtonContainerStyle={{
                                height: 60,
                                borderRadius: SIZES.radius,
                            }}
                            propOnPress={() => navigation.replace('SignIn')}
                        />
                    </View>
                }
            </View>
        )
    }
    const scrollX = useRef(new Animated.Value(0)).current // KO co "ref={scrollX}"
    const flatListRef = useRef() // co "ref={flatListRef}"
    const [staCurrentIndex, setStaCurrentIndex] = useState(0)
    const _onViewChangeRef = useRef(({ viewableItems }) => {
        setStaCurrentIndex(viewableItems[0].index)
    })
    const CompDots = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {
                    constants.onboarding_screens.map((item, index) => {
                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.lightOrange, COLORS.primary, COLORS.lightOrange],
                            extrapolate: 'clamp',
                        })
                        const dotWidth = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [10, 30, 10],
                            extrapolate: 'clamp',
                        })
                        return (
                            <Animated.View
                                key={`${index}`}
                                style={{
                                    borderRadius: 5,
                                    marginHorizontal: 6,
                                    width: dotWidth,
                                    height: 10,
                                    backgroundColor: dotColor,
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
            }}
        >
            {_renderHeaderLogo()}
            <Animated.FlatList
                ref={flatListRef}
                horizontal
                pagingEnabled
                data={constants.onboarding_screens}
                scrollEventThrottle={16}
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{
                        nativeEvent: {
                            contentOffset: { x: scrollX }
                        }
                    }],
                    { useNativeDriver: false }
                )}
                // khi scroll ngang flatlist thi se auto update "_onViewChangeRef" > auto update "staCurrentIndex"
                onViewableItemsChanged={_onViewChangeRef.current}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{ width: SIZES.width }}
                        >
                            {/* header */}
                            <View
                                style={{ flex: 3 }}
                            >
                                <ImageBackground
                                    source={item.backgroundImage}
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        height: index === 1 ? '92%' : '100%',
                                        width: '100%',
                                    }}
                                >
                                    <Image
                                        source={item.bannerImage}
                                        resizeMode='contain'
                                        style={{
                                            width: SIZES.width * 0.8,
                                            height: SIZES.width * 0.8,
                                            marginBottom: -SIZES.padding,
                                        }}
                                    />
                                </ImageBackground>
                            </View>
                            {/* detail */}
                            <View
                                style={{
                                    flex: 1,
                                    marginTop: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingHorizontal: SIZES.radius,
                                }}
                            >
                                <Text
                                    style={{
                                        ...FONTS.h1,
                                        fontSize: 25,
                                    }}
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        marginTop: SIZES.radius,
                                        textAlign: 'center',
                                        color: COLORS.darkGray,
                                        paddingHorizontal: SIZES.padding,
                                    }}
                                >
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                    )
                }}
            />
            {_renderFooter()}
        </View>
    )
}

export default OnBoarding;