import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList
} from 'react-native';
import HorizontalFoodCard from '../../components/HorizontalFoodCard';
import VerticalFoodCard from '../../components/VerticalFoodCard';
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../constants';
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
const Home = () => {
    const [staPopular, setStaPopular] = useState([])
    const [staRecommend, setStaRecommend] = useState([])
    const [staSelCategoryId, setStaSelCategoryId] = useState(1)
    const [staSelMenuType, setStaSelMenuType] = useState(1)
    const [staMenuList, setStaMenuList] = useState([])
    useEffect(() => {
        _handleChangeCategory(staSelCategoryId, staSelMenuType)
    }, [])
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
                {/* Filter Icon */}
                <TouchableOpacity>
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
                                height: 180,
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
    return (
        <View
            style={styles.styView}
        >
            {/* Search */}
            {_renderSearch()}
            {/* List */}
            <FlatList
                data={staMenuList}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
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
        height: 130,
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