import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosClient from "../axiosClient";

export function getCategories() {
  return axiosClient.get("/GetCategories");
}

export function getCategoryProducts(catId) {
  return axiosClient.post("/GetCategoryProducts", {
    id: catId,
  });
}

export function getProductById(productId) {
  return axiosClient.get("/GetProductById/" + productId);
}

//function to add to cart product

//api to increase the quantity of product in cart
export async function increaseProductQuantityAPI(productObj) {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/increaseProductQuantity", {
    ProductId: productObj.ProductId,
    UserId: UserId,
  });
}
export async function decreaseProductQuantityAPI(productObj) {
  const UserId = await AsyncStorage.getItem("UserId");
  console.log(`Decreasing Quantity of ${productObj.ProductId} `);
  return axiosClient.post("/decreaseProductQuantity", {
    ProductId: productObj.ProductId,
    UserId: UserId,
  });
}
//api to delete product from cart
export async function deleteProductFromCartAPI(productObj) {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/deleteFromCart", {
    ProductId: productObj.ProductId,
    UserId: UserId,
  });
}

export async function addToCartAPI(productObj) {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/addToCart", {
    ProductId: productObj.ProductId,
    Quantity: 1,
    VariantId: productObj.VariantId,
    UserId: UserId,
  });
}

//function to check product in cart
export async function checkProductInCartAPI(ProductId) {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/checkProductExitsInCart", {
    ProductId: ProductId,
    UserId: UserId,
  });
}

export function getPreferableProducts() {
  return axiosClient.post("/getPreferableProducts");
}

export async function checkProductInWishlistAPI(ProductId) {
  const UserId = await AsyncStorage.getItem("UserId");
  return axiosClient.post("/checkProductExitsInWishlist", {
    ProductId: ProductId,
    UserId: UserId,
  });
}