import AppStack from "../Navigators/AppStack";
import ProductDetails from "../screens/AppScreens/ProductDetails";
import CartScreen from "../screens/AppScreens/CartScreen";
import AccountScreen from "../screens/BottomTabScreens/AccountScreen";
import CategoryScreen from "../screens/BottomTabScreens/CategoryScreen";
import HomeScreen from "../screens/BottomTabScreens/HomeScreen";
import OptionScreen from "../screens/BottomTabScreens/OptionScreen";
import Wishlist from "../screens/BottomTabScreens/Wishlist";
import AccountDetails from "../screens/Profile/AccountDetails";
import OTPInput from "../screens/Profile/OTPInput";
import PhoneInput from "../screens/Profile/PhoneInput";
import AllProducts from "../screens/AppScreens/AllProducts";
import UserRegistrationForm from "../screens/Profile/UserRegisterationForm";
import AuthCheck from "../screens/Profile/AuthCheck";
import FinalizeOrder from "../screens/AppScreens/FinalizeOrder";
import OrderSuccess from "../screens/AppScreens/OrderSuccess";
import AddAddress from "../screens/AppScreens/AddAddress";
import Addresses from "../screens/Profile/Addresses";
import AdminUserChat from "../screens/AppScreens/AdminUserChat";
import Orders from "../screens/Profile/Orders";
import Coupons from "../screens/Profile/Coupons";
import ProductScreen from "../screens/AppScreens/ProductScreen";
import Referrals from "../screens/Profile/Referrals";
import NotificationSettings from "../screens/OptionScreen/NotificationSettings";
import EditProfile from "../screens/Profile/EditProfile";
import Policies from "../screens/AppScreens/Policies";
export const bottomTabScreens = {
  HomeScreen: {
    screen: AppStack,
    name: "HomeScreen",
  },
  OptionScreen: {
    screen: OptionScreen,
    name: "OptionScreen",
  },
  CategoryScreen: {
    screen: CategoryScreen,
    name: "CategoryScreen",
  },
  Wishlist: {
    screen: Wishlist,
    name: "Wishlist",
  },
  AccountScreen: {
    screen: AccountScreen,
    name: "AccountScreen",
  },
  
};

export const authStackScreens = {
  AuthCheck: {
    screen: AuthCheck,
    name: "AuthCheck",
  },
  Referrals: {
    screen: Referrals,
    name: "Referrals",
  },
  EditProfile: {
    name: "EditProfile",
    screen: EditProfile,
  },
  OTPInput: {
    screen: OTPInput,
    name: "OTPInput",
  },
  PhoneInput: {
    screen: PhoneInput,
    name: "PhoneInput",
  },
  AccountDetails: {
    screen: AccountDetails,
    name: "AccountDetails",
  },
  UserRegistrationForm: {
    screen: UserRegistrationForm,
    name: "UserRegistrationForm",
  },
  Addresses: {
    screen: Addresses,
    name: "Addresses",
  },
  Orders: {
    screen: Orders,
    name: "Orders",
  },
  Coupons: {
    screen: Coupons,
    name: "Coupons",
  },
};

export const appStackScreens = {
  ProductScreen: {
    screen: ProductScreen,
    name: "ProductScreen",
  },
  
  Policies :{
    screen: Policies,
    name: "Policies",
  },
  NotificationSettings: {
    screen: NotificationSettings,
    name: "NotificationSettings",
  },
  AdminUserChat: {
    screen: AdminUserChat,
    name: "AdminUserChat",
  },
  AllProducts: {
    screen: AllProducts,
    name: "AllProducts",
  },
  AddAddress: {
    screen: AddAddress,
    name: "AddAddress",
  },
  OrderSuccess: {
    screen: OrderSuccess,
    name: "OrderSuccess",
  },
  ProductDetails: {
    screen: ProductDetails,
    name: "ProductDetails",
  },
  CartScreen: {
    screen: CartScreen,
    name: "CartScreen",
  },
  HomeScreen: {
    screen: HomeScreen,
    name: "MainScreen",
  },
  FinalizeOrder: {
    screen: FinalizeOrder,
    name: "FinalizeOrder",
  },
};
