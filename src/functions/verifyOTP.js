import firebase from "@react-native-firebase/app";

const verifyOTP = async (verificationId, OTP) => {
  return new Promise(async (resolve, reject) => {
    if (OTP.length < 6) {
      reject("OTP must be 6 digits long");
    } else {
      const credential = await firebase.auth.PhoneAuthProvider.credential(
        verificationId,
        OTP
      );
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          // Do something with the results here
          console.log(result);
          resolve(result);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    }
  });
};
export default verifyOTP;
