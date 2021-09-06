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
import { COLORS, dummyData, FONTS, icons, SIZES } from '../../constants';
import { setSelectedTabSuccess } from '../../stores/tab/tabActions';

const Home = () => {
    const [staSelCategoryId, setStaSelCategoryId] = useState(1)
    const [staSelMenuType, setStaSelMenuType] = useState(1)
    const [staMenuList, setStaMenuList] = useState([])
    useEffect(() => {
        _handleChangeCategory(staSelCategoryId, staSelMenuType)
    }, [])
    function _handleChangeCategory(arg_category_id, arg_menu_type_id) {
        const selMenu = dummyData.menu.find(item => item.id === arg_menu_type_id)
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
    styHFCImg: {
        marginTop: 20,
        height: 110,
        width: 110,
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