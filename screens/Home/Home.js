import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    TouchableWithoutFeedback,
    Modal,
    Animated,
    ScrollView
} from 'react-native';
import CompTextButton from '../../components/CompTextButton';
import CompTwoPointSlider from '../../components/CompTwoPointSlider';
import HorizontalFoodCard from '../../components/HorizontalFoodCard';
import VerticalFoodCard from '../../components/VerticalFoodCard';
import { COLORS, constants, dummyData, FONTS, icons, SIZES } from '../../constants';
import { setSelectedTabSuccess } from '../../stores/tab/tabActions';

const CompSection = ({ propTitle, propOnPress, children }) => {
    return (
        <View>
            {/* Header */}
            <View
                style={styles.styHeader}
            >
                <Text
                    style={styles.styHeaderTxt1}
                >
                    {propTitle}
                </Text>
                <TouchableOpacity onPress={propOnPress}>
                    <Text
                        style={styles.styHeaderTxt2}
                    >Xem het</Text>
                </TouchableOpacity>
            </View>
            {/* Content */}
            {children}
        </View>
    )
}
const CompSectionFilter = ({ propTitle, propContainerStyle, children }) => {
    return (
        <View
            style={{
                marginTop: SIZES.padding,
                ...propContainerStyle,
            }}
        >
            <Text
                style={{ ...FONTS.h3 }}
            >
                {propTitle}
            </Text>
            {/* Content */}
            {children}
        </View>
    )
}
const Home = () => {
    const [staPopular, setStaPopular] = useState([])
    const [staRecommend, setStaRecommend] = useState([])
    const [staSelCategoryId, setStaSelCategoryId] = useState(1)
    const [staSelMenuType, setStaSelMenuType] = useState(1)
    const [staMenuList, setStaMenuList] = useState([])
    const [staShowFilterModal, setStaShowFilterModal] = useState(false)
    const [staDeliveryTime, setStaDeliveryTime] = useState(1)
    const [staRatings, setStaRatings] = useState(1)
    const [staTags, setStaTags] = useState(1)
    const [sta2PSliderDist, setSta2PSliderDist] = useState([5, 15])
    const [sta2PSliderPrice, setSta2PSliderPrice] = useState([5, 20])
    useEffect(() => {
        _handleChangeCategory(staSelCategoryId, staSelMenuType)
    }, [])
    const refModalAnimatedVal = useRef(new Animated.Value(0)).current
    useEffect(() => {
        if (staShowFilterModal) {
            Animated.timing(refModalAnimatedVal, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            }).start()
        } else {
            Animated.timing(refModalAnimatedVal, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => setStaShowFilterModal(false))
        }
    }, [staShowFilterModal])
    const modalY = refModalAnimatedVal.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 680],
    })
    function _handleChangeCategory(arg_category_id, arg_menu_type_id) {
        const selPopular = dummyData.menu.find(item => item.name === "Noi tieng")
        const selRecommend = dummyData.menu.find(item => item.name === "Gioi thieu")
        const selMenu = dummyData.menu.find(item => item.id === arg_menu_type_id)
        setStaPopular(selPopular?.list.filter(item => item.categories.includes(arg_category_id)))
        setStaRecommend(selRecommend?.list.filter(item => item.categories.includes(arg_category_id)))
        setStaMenuList(selMenu?.list.filter(item => item.categories.includes(arg_category_id)))
    }
    function _renderSearch() {
        return (
            <View
                style={styles.styRenderSearch}
            >
                {/* Icon */}
                <Image
                    source={icons.search}
                    style={styles.styRenderSearchImg}
                />
                {/* Text Input */}
                <TextInput
                    style={styles.styRenderSearchTxt}
                    placeholder='Tim mon...'
                />
                {/* Filter Button */}
                <TouchableOpacity
                    onPress={() => setStaShowFilterModal(true)}
                >
                    <Image
                        source={icons.filter}
                        style={styles.styRenderSearchImg}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    function _renderPopularSection() {
        return (
            <CompSection
                propTitle='Noi tieng'
                propOnPress={() => alert('Noi tieng')}
            >
                <FlatList
                    data={staPopular}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <VerticalFoodCard
                            propContainerStyle={{
                                marginLeft: index === 0 ? SIZES.padding : 18,
                                marginRight: (index === staPopular.length - 1) ? SIZES.padding : 0,
                            }}
                            propItem={item}
                            propOnPress={() => alert('VerticalFoodCard')}
                        />

                    )}
                />
            </CompSection>
        )
    }
    function _renderRecommendedSection() {
        return (
            <CompSection
                propTitle='Gioi thieu'
                propOnPress={() => alert('Gioi thieu')}
            >
                <FlatList
                    data={staRecommend}
                    horizontal
                    keyExtractor={item => `${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.styRMT}
                    renderItem={({ item, index }) => (
                        <HorizontalFoodCard
                            propContainerStyle={{
                                width: SIZES.width * 0.85,
                                marginLeft: index === 0 ? SIZES.padding : 18,
                                marginRight: (index === staRecommend.length - 1) ? SIZES.padding : 0,
                                paddingRight: SIZES.radius,
                                alignItems: 'center',
                            }}
                            propImageStyle={styles.styHFCImg1}
                            propItem={item}
                            propOnPress={() => alert('HorizontalFoodCard')}
                        />

                    )}
                />
            </CompSection>
        )
    }
    function _renderMenuTypes() {
        return (
            <FlatList
                data={dummyData.menu}
                horizontal
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.styRMT}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={[
                                styles.styRMTBtn,
                                { marginRight: index === dummyData.menu.length - 1 ? SIZES.padding : 0 },
                            ]}
                            onPress={() => {
                                setStaSelMenuType(item.id)
                                _handleChangeCategory(staSelCategoryId, item.id)
                            }}
                        >
                            <Text
                                style={{
                                    color: staSelMenuType === item.id ? COLORS.primary : COLORS.black,
                                    ...FONTS.h3,
                                }}
                            >{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }
    function _renderFoodCategories() {
        return (
            <FlatList
                data={dummyData.categories}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                height: 55,
                                marginTop: SIZES.padding,
                                marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                                marginRight: (index === dummyData.categories.length - 1) ? SIZES.padding : 0,
                                paddingHorizontal: 8,
                                borderRadius: SIZES.radius,
                                backgroundColor: staSelCategoryId === item.id ? COLORS.primary : COLORS.lightGray2
                            }}
                            onPress={() => {
                                setStaSelCategoryId(item.id)
                                _handleChangeCategory(item.id, staSelMenuType)
                            }}
                        >
                            <Image
                                source={item.icon}
                                style={{
                                    marginTop: 5,
                                    height: 50,
                                    width: 50,
                                }}
                            />
                            <Text
                                style={{
                                    alignSelf: 'center',
                                    marginRight: SIZES.base,
                                    color: staSelCategoryId === item.id ? COLORS.white : COLORS.darkGray,
                                    ...FONTS.h3,
                                }}
                            >{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }
    function _renderDeliveryTo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                }}
            >
                <Text
                    style={{
                        color: COLORS.primary,
                        ...FONTS.body3,
                    }}
                >
                    Chuyen toi:
                </Text>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop: SIZES.base,
                        alignItems: 'center',
                    }}
                    onPress={() => alert(dummyData?.myProfile?.address)}
                >
                    <Text
                        style={{ ...FONTS.h3 }}
                    >
                        {dummyData?.myProfile?.address}
                    </Text>
                    <Image
                        source={icons.down_arrow}
                        style={{
                            marginLeft: SIZES.base,
                            height: 20,
                            width: 20,
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }
    function _renderDistance() {
        return (
            <CompSectionFilter
                propTitle='Khoang cach'>
                <View
                    style={{ alignItems: 'center' }}
                >
                    <CompTwoPointSlider
                        propValues={sta2PSliderDist}
                        propMin={1}
                        propMax={20}
                        propPrefix=''
                        propPostfix='km'
                        propOnValuesChange={item_val => setSta2PSliderDist(item_val)}
                    />
                </View>
            </CompSectionFilter>
        )
    }
    function _renderDeliveryTime() {
        return (
            <CompSectionFilter
                propTitle='Thoi gian hang toi'
                propContainerStyle={{ marginTop: 40, }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: SIZES.radius,
                    }}
                >
                    {constants.delivery_time.map((item, index) => {
                        return (
                            <CompTextButton
                                key={`${index}`}
                                propLabel={item.label}
                                propLabelStyle={{
                                    color: item.id === staDeliveryTime ? COLORS.white : COLORS.gray,
                                }}
                                propButtonContainerStyle={{
                                    width: '30%',
                                    height: 50,
                                    margin: 5,
                                    borderRadius: SIZES.base,
                                    backgroundColor: item.id === staDeliveryTime ? COLORS.primary : COLORS.lightGray2
                                }}
                                propOnPress={() => setStaDeliveryTime(item.id)}
                            />
                        )
                    })}
                </View>
            </CompSectionFilter>
        )
    }
    function _renderPricingRange() {
        return (
            <CompSectionFilter
                propTitle='Gia tien'>
                <View
                    style={{ alignItems: 'center' }}
                >
                    <CompTwoPointSlider
                        propValues={sta2PSliderPrice}
                        propMin={1}
                        propMax={100}
                        propPrefix='$'
                        propPostfix=''
                        propOnValuesChange={item_val => setSta2PSliderPrice(item_val)}
                    />
                </View>
            </CompSectionFilter>
        )
    }
    function _renderRatings() {
        return (
            <CompSectionFilter
                propTitle='Danh gia'
                propContainerStyle={{ marginTop: 40, }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: SIZES.radius,
                    }}
                >
                    {constants.ratings.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={`${index}`}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    flex: 1,
                                    height: 50,
                                    margin: 5,
                                    alignItems: 'center',
                                    borderRadius: SIZES.base,
                                    backgroundColor: item.id === staRatings ? COLORS.primary : COLORS.lightGray2
                                }}
                                onPress={() => setStaRatings(item.id)}
                            >
                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        color: item.id === staRatings ? COLORS.white : COLORS.gray,
                                    }}
                                >
                                    {item.label}
                                </Text>
                                <Image
                                    source={icons.star}
                                    style={{
                                        marginLeft: 5,
                                        width: 20,
                                        height: 20,
                                        tintColor: item.id === staRatings ? COLORS.white : COLORS.gray,
                                    }}
                                />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </CompSectionFilter>
        )
    }
    function _renderTags() {
        return (
            <CompSectionFilter
                propTitle='Gan kem'
            // propContainerStyle={{ marginTop: 40, }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        marginTop: SIZES.radius,
                    }}
                >
                    {constants.tags.map((item, index) => {
                        return (
                            <CompTextButton
                                key={`${index}`}
                                propLabel={item.label}
                                propLabelStyle={{
                                    color: item.id === staTags ? COLORS.white : COLORS.gray,
                                }}
                                propButtonContainerStyle={{
                                    width: '30%',
                                    height: 50,
                                    margin: 5,
                                    borderRadius: SIZES.base,
                                    backgroundColor: item.id === staTags ? COLORS.primary : COLORS.lightGray2
                                }}
                                propOnPress={() => setStaTags(item.id)}
                            />
                        )
                    })}
                </View>
            </CompSectionFilter>
        )
    }
    return (
        <View
            style={styles.styView}
        >
            {/* Search */}
            {_renderSearch()}
            {/* Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={staShowFilterModal}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.transparentBlack7,
                    }}
                >
                    <TouchableWithoutFeedback
                        onPress={() => {
                            setStaShowFilterModal(false)
                        }
                        }
                    >
                        <View
                            style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                            }}
                        />
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={{
                            position: 'absolute',
                            top: modalY, left: 0,
                            width: '100%',
                            height: '100%',
                            padding: SIZES.padding,
                            borderTopRightRadius: SIZES.padding,
                            borderTopLeftRadius: SIZES.padding,
                            backgroundColor: COLORS.white,
                        }}
                    >
                        {/* Header */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{ flex: 1, ...FONTS.h3, fontSize: 18, }}
                            >Loc DK search</Text>
                            <TouchableOpacity
                                style={{
                                    borderWidth: 2,
                                    borderRadius: 10,
                                    borderColor: COLORS.gray2,
                                }}
                                onPress={() => setStaShowFilterModal(false)}
                            >
                                <Image
                                    source={icons.cross}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        tintColor: COLORS.gray2
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 250, }}
                        >
                            {/* distance */}
                            {_renderDistance()}
                            {/* delivery time */}
                            {_renderDeliveryTime()}
                            {/* price */}
                            {_renderPricingRange()}
                            {/* rating */}
                            {_renderRatings()}
                            {/* tag */}
                            {_renderTags()}
                            {/* submit */}
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: 150,
                                    left: 0,
                                    right: 0,
                                    height: 110,
                                    paddingHorizontal: SIZES.padding,
                                    paddingVertical: SIZES.radius,
                                    backgroundColor: COLORS.white,
                                }}
                            >
                                <CompTextButton
                                    propLabel='Ap dung loc'
                                    propButtonContainerStyle={{
                                        height: 50,
                                        borderRadius: SIZES.base,
                                        backgroundColor: COLORS.primary
                                    }}
                                    propOnPress={() => alert('Ap dung loc')}
                                />
                            </View>
                        </ScrollView>
                    </Animated.View>
                </View>
            </Modal>
            {/* List */}
            <FlatList
                data={staMenuList}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {_renderDeliveryTo()}
                        {_renderFoodCategories()}
                        {_renderPopularSection()}
                        {_renderRecommendedSection()}
                        {_renderMenuTypes()}
                    </View>
                }
                renderItem={({ item }) => {
                    return (
                        <HorizontalFoodCard
                            propContainerStyle={styles.styHFCContainer}
                            propImageStyle={styles.styHFCImg}
                            propItem={item}
                            propOnPress={() => alert('HorizontalFoodCard')}
                        />
                    )
                }}
                ListFooterComponent={
                    <View
                        style={{ height: 200 }}
                    />
                }
            />
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    styHeaderTxt1: {
        flex: 1,
        ...FONTS.h3,
    },
    styHeaderTxt2: {
        color: COLORS.primary,
        ...FONTS.body3,
    },
    styHeader: {
        flexDirection: 'row',
        marginHorizontal: SIZES.padding,
        marginTop: 30,
        marginBottom: 20,
    },
    styRMTBtn: {
        marginLeft: SIZES.padding,
    },
    styRMT: {
        marginTop: 30,
        marginBottom: 20,
    },
    styHFCImg: {
        marginTop: 20,
        height: 110,
        width: 110,
    },
    styHFCImg1: {
        marginTop: 35,
        height: 150,
        width: 150,
    },
    styHFCContainer: {
        alignItems: 'center',
        marginHorizontal: SIZES.padding,
        marginBottom: SIZES.radius,
    },
    styRenderSearchTxt: {
        flex: 1,
        marginLeft: SIZES.radius,
        ...FONTS.body3,
    },
    styView: {
        flex: 1,
    },
    styRenderSearch: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
    },
    styRenderSearchImg: {
        height: 20,
        width: 20,
        tintColor: COLORS.black,
    },
})