import React from "react";

const OtpInput = ({ length, handleInputChange, handleKeyDown, inputRefs, otp }) => {
  return (
    <div className="otpInputContainer">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          type="text"
          id={`otp-${index}`}
          name={`otp-${index}`}
          value={otp[index] || ""}
          onChange={(e) => handleInputChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={inputRefs[index]}
          className="otpBox"
          maxLength="1"
        />
      ))}
    </div>
  );
};

export default OtpInput;
