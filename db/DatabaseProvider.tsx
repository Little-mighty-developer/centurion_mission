import React, { createContext, useContext } from 'react';
import database from './database';

const DatabaseContext = createContext(database);
export const useDatabase = () => useContext(DatabaseContext);

export const DatabaseProvider = ({ children }: { children: React.ReactNode }) => (
  <DatabaseContext.Provider value={database}>
    {children}
  </DatabaseContext.Provider>
);
