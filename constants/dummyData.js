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
    },
    {
        id: 4,
        name: "Banh Burgers",
        icon: icons.hamburger,
    },
    {
        id: 5,
        name: "Mi",
        icon: icons.noodle,
    },
    {
        id: 6,
        name: "Hot Dogs",
        icon: icons.hotdog,
    },
    {
        id: 7,
        name: "Pizza",
        icon: icons.pizza,
    },
    {
        id: 8,
        name: "Sushi",
        icon: icons.sushi,
    },
    {
        id: 9,
        name: "Trang Mieng",
        icon: icons.donut,
    },
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

const hbg1 = {
    id: 5,
    name: "Ham bơ gơ 1",
    image: require("../assets/dummyData/crispy-chicken-burger.jpg"),
    description: "Burger gà giòn, phô mai và rau diếp",
    categories: [1, 4],
    calories: 200,
    isFavourite: false,
    price: 10
}

const hbg2 = {
    id: 6,
    name: "Ham bơ gơ 2",
    image: require("../assets/dummyData/honey-mustard-chicken-burger.jpg"),
    description: "Burger gà giòn với xà lách trộn mù tạt mật ong",
    categories: [1, 4],
    calories: 250,
    isFavourite: true,
    price: 15
}

const ktc = {
    id: 7,
    name: "Khoai tây chiên",
    image: require("../assets/dummyData/baked-fries.jpg"),
    description: "Khoai tây chiên nướng giòn",
    calories: 194,
    price: 8,
    categories: [1, 4],
    isFavourite: false,
}

const pizza = {
    id: 8,
    name: "Pizza cà chua",
    image: require("../assets/dummyData/pizza.jpg"),
    description: "Cà chua tươi, rau húng quế thơm và bocconcini nấu chảy",
    calories: 250,
    price: 20,
    categories: [1, 7],
    isFavourite: false,
}
const pasta = {
    id: 9,
    name: "Tomato Pasta",
    image: require("../assets/dummyData/tomato-pasta.jpg"),
    description: "Mì Ý với cà chua tươi",
    calories: 100,
    price: 10,
    categories: [1, 7],
    isFavourite: false,
}
const mixaxiu = {
    id: 10,
    name: "Mì xá xíu",
    image: require("../assets/dummyData/kolo-mee.jpg"),
    description: "Mì xá xíu",
    calories: 200,
    price: 5,
    categories: [1, 5],
    isFavourite: true,
}
const mixaotom = {
    id: 11,
    name: "Mì xào tôm",
    image: require("../assets/dummyData/sarawak-laksa.jpg"),
    description: "Bún đậu mắm tôm",
    calories: 300,
    price: 8,
    categories: [1, 5],
    isFavourite: true,
}
const comgachien = {
    id: 12,
    name: "Cơm gà chiên",
    image: require("../assets/dummyData/nasi-lemak.jpg"),
    description: "Một món cơm truyền thống của người Mã Lai",
    calories: 300,
    price: 8,
    categories: [1, 5],
    isFavourite: true,
}
const menu = [
    {
        id: 1,
        name: "Dac diem",
        list: [
            hbg2, hotTacos, hbg1, pasta
        ]
    },
    {
        id: 2,
        name: "Gan ban",
        list: [
            hamburger, ktc, pasta, mixaotom
        ]
    },
    {
        id: 3,
        name: "Noi tieng",
        list: [
            hotTacos, wrapSandwich, comgachien
        ]
    },
    {
        id: 4,
        name: "Moi nhat",
        list: [
            hbg1, ktc, vegBiryani, mixaotom
        ]
    },
    {
        id: 5,
        name: "Xu huong",
        list: [
            hbg2, wrapSandwich, pizza, mixaxiu
        ]
    },
    {
        id: 6,
        name: "Gioi thieu",
        list: [
            ktc, hotTacos, comgachien, mixaxiu
        ]
    },

]


export default {
    myProfile,
    categories,
    menu,
}