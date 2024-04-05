import { createContext, useContext, useState } from "react";

const EditPopupContext = createContext();

export const EditPopupProvider = ({ children }) => {
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  
  return (
    <EditPopupContext.Provider value={{ editPopupVisible, setEditPopupVisible }}>
      {children}
    </EditPopupContext.Provider>
  );
};

export const useEditPopup = () => useContext(EditPopupContext);
