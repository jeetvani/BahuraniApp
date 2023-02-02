import { firebase } from "@react-native-firebase/auth";

const generateOTP = async (phoneNumber) => {
  return new Promise((resolve, reject) => {
    if (phoneNumber.length < 10) {
      reject("Phone Number must be 10 digits long");
    } else {
      console.log("====================================");
      console.log("Generating OTP for: " + phoneNumber);
      console.log("====================================");
      firebase
        .auth()
        .verifyPhoneNumber(phoneNumber)
        .then((res) => {
          resolve({
            status: 200,
            message: "OTP sent successfully",
            verificationId: res.verificationId,
          });
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};
export default generateOTP;
