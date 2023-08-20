import { useState } from "react";

export const useDisclosure = (isOpen = false) => {
  const [visible, setVisible] = useState(isOpen);
  const open = () => setVisible(true);
  const close = () => setVisible(false);
  const toggle = () => setVisible((state) => !state);

  return {visible, open, close, toggle }
};
