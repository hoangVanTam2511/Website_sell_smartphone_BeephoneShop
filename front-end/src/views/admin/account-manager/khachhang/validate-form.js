import React, { useState } from "react";
import UpdateKH from "./UpdateKH";

const ValidateForm = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  let [showSpecialCharWarning, setShowSpecialCharWarning] = useState(false);
  const checkSpecialCharacterWarning = (inputValue) => {
    setShowSpecialCharWarning(hasSpecialCharacter(inputValue));
  };
  const hasSpecialCharacter = (str) => {
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return specialCharPattern.test(str);
  };
  return (
    <div>
      <UpdateKH
        hasSpecialCharacter={hasSpecialCharacter}
        checkSpecialCharacterWarning={checkSpecialCharacterWarning}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
        showSpecialCharWarning={showSpecialCharWarning}
      />
    </div>
  );
};

export default ValidateForm;
