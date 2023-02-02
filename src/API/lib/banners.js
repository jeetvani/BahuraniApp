import axiosClient from "../axiosClient";

export function getBanners() {
 return axiosClient
    .post("/getBanners")
    .then((response) => {
     
      return  response.data;
    })
    .catch((error) => {

      console.log(error);
      return error;
    });
}
