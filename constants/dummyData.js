import { icons, images } from "./";

const myProfile = {
    name: "DoTQ",
    profile_image: images.profile,
    address: "Japan, Tokyo"
}

const categories = [
    {
        id: 1,
        name: "All",
        icon: icons.burger
    },
    {
        id: 2,
        name: "Rau",
        icon: icons.cherry
    },
    {
        id: 3,
        name: "Gao",
        icon: icons.rice
    }
]

const hamburger = {
    id: 1,
    name: "Ham bo go",
    description: "Bánh hamburger gà",
    categories: [1, 2],
    price: 15.99,
    calories: 70,
    isFavourite: true,
    image: require("../assets/dummyData/hamburger.png")
}

const hotTacos = {
    id: 2,
    name: "Tacos nóng",
    description: "Bánh tortilla Mexico",
    categories: [1, 3],
    price: 65,
    calories: 65,
    isFavourite: false,
    image: require("../assets/dummyData/hot_tacos.png")
}

const vegBiryani = {
    id: 3,
    name: "Veg Biryani",
    description: "Biryani rau Ấn Độ",
    categories: [1, 2, 3],
    price: 49,
    calories: 49,
    isFavourite: true,
    image: require("../assets/dummyData/veg_biryani.png")
}

const wrapSandwich = {
    id: 4,
    name: "bọc bánh mì sandwich",
    description: "Bánh mì kẹp rau củ nướng",
    categories: [1, 2],
    price: 33,
    calories: 33,
    isFavourite: true,
    image: require("../assets/dummyData/wrap_sandwich.png")
}

const menu = [
    {
        id: 1,
        name: "Dac diem",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 2,
        name: "Gan ban",
        list: [
            hamburger, vegBiryani,
        ]
    },
    {
        id: 3,
        name: "Noi tieng",
        list: [
            hotTacos, wrapSandwich,
        ]
    },
    {
        id: 4,
        name: "Moi nhat",
        list: [
            hamburger, hotTacos, vegBiryani,
        ]
    },
    {
        id: 5,
        name: "Xu huong",
        list: [
            hamburger, wrapSandwich,
        ]
    },
    {
        id: 6,
        name: "Gioi thieu",
        list: [
            hamburger, hotTacos,
        ]
    },

]


export default {
    myProfile,
    categories,
    menu,
}