import { useState } from "react";

export const useToggle = (initialState: boolean = false) => {
  const [isActive, setIsActive] = useState(initialState);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  return [isActive, handleClick] as const;
};
