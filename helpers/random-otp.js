const otpGenerator = require('otp-generator')
function randomOtp(){
const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
console.log(otp);
return otp;
}
module.exports = randomOtp;
