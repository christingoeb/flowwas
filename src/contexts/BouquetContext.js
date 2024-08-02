import React, { createContext, useState } from 'react';

export const BouquetContext = createContext();

export const BouquetProvider = ({ children }) => {
  const [flowers, setFlowers] = useState([]);
  const [ bouquetInfo, setBouquetInfo] = useState([]);
  //  bouquetInfo
  // {
  //    name: "name",
  //    id: "id"
  // }
  const addItem = (item) => {
    if(flowers.length < 11) setFlowers((prevItems) => [...prevItems, item]);
  };

  const removeItem = (item) => {
    setFlowers((prevItems) => prevItems.filter((i) => i.id !== item));
  };

  const clearList = () => {
    setFlowers([]);
  };


  return (
    <BouquetContext.Provider value={{ flowers, setFlowers, addItem, removeItem, clearList, bouquetInfo, setBouquetInfo }}>
      {children}
    </BouquetContext.Provider>
  );
};