import { useState } from "react";

const useToggle = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const toggleValue = () => {
    setValue(!value);
  };

  return [value, toggleValue];
};

export default useToggle;
