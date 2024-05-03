import { useState } from "react";
import OtpInput from "react-otp-input";

const OTPInput = () => {
  const [otpValues, setOtpValues] = useState("");
  return (
    <div>
      <OtpInput
        containerStyle="flex justify-between"
        value={otpValues}
        name="OTP"
        onChange={(e) => setOtpValues(e)}
        numInputs={6}
        focusStyle={false}
        isInputNum={true}
        className="border-2 mb-2 p-3"
      />
    </div>
  );
};

export default OTPInput;
