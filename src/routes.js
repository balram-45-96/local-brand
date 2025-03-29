import {
    Login,
    Signup,
    Home,
    Category,
    Details,
    TopProduct,
    Wishlist,
    Payment,
    EditProfile,
    ContactUs,
    ProductDetail,
    ClassifiedDetail,
    ClassifiedProduct,
    ForgetPassword,
    UpdatePassword
} from "./Pages";

export const routes = [
    {
        path: "/login",
        element: Login,
        exact: true,
        isPrivate: 2
    },
    {
        path: "/forgetPassword",
        element: ForgetPassword,
        exact: true,
        isPrivate: 2
    },
    {
        path: "/updatePassword",
        element: UpdatePassword,
        exact: true,
        isPrivate: 2
    },
    {
        path: "/signup",
        element: Signup,
        exact: true,
        isPrivate: 2
    },
    {
        path: "/",
        element: Home,
        exact: true,
        isPrivate: 1
    },
    {
        path: "/*",
        element: Home,
        exact: true,
        isPrivate: 1
    },
    {
        path: "/category/:id/:title",
        element: Category,
        exact: true,
        isPrivate: 2
    },  
    {
        path: "/details/:variantId",
        element: Details,
        exact: true,
        isPrivate: 2
    },
    {
        path: "/top-product/:categoryId",
        element: TopProduct,
        exact: true,
        isPrivate: 2
    },
    {
        path: "/wishlist",
        element: Wishlist,
        exact: true,
        isPrivate: 2
    },
    {
        path:"/payment",
        element: Payment,
        exact: true,
        isPrivate: 2
    },
    {
        path:"/edit-profile",
        element:EditProfile,
        exact:true,
        isPrivate: 2
    },
    {
        path:"/contact-us",
        element:ContactUs,
        exact:true,
        isPrivate: 2
    },
    {
        path:"/product-detail",
        element:ProductDetail,
        exact:true,
        isPrivate: 2
    },
    {
        path:"/classified-detail",
        element:ClassifiedDetail,
        exact:true,
        isPrivate: 2
    },
    {
        path:"/classified-product/:id",
        element:ClassifiedProduct,
        exact:true,
        isPrivate: 2
    }
];