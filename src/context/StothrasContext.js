import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import * as Storage from '../utils/storage';

const StothrasContext = createContext();

export function StothrasProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await Storage.getItems();
    setItems(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addNew = async (item) => setItems(await Storage.addItem(item));
  const edit = async (id, updates) => setItems(await Storage.updateItem(id, updates));
  const remove = async (id) => setItems(await Storage.deleteItem(id));
  const reset = async () => setItems(await Storage.resetToDefault());

  return (
    <StothrasContext.Provider value={{ items, loading, addNew, edit, remove, reset, refresh }}>
      {children}
    </StothrasContext.Provider>
  );
}

export const useStothras = () => useContext(StothrasContext);
