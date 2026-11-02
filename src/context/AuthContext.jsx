import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS } from '../data/users';
import { storageService } from '../services/storageService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => {
    return storageService.get(storageService.KEYS.CURRENT_USER, 'admin');
  });

  const currentUser = DEMO_USERS[role] || DEMO_USERS.admin;

  const switchRole = (newRole) => {
    if (DEMO_USERS[newRole]) {
      setRole(newRole);
      storageService.set(storageService.KEYS.CURRENT_USER, newRole);
    }
  };

  const loginAs = (targetRole) => {
    switchRole(targetRole);
  };

  const logout = () => {
    // For demo purposes, keep on admin or vendor
  };

  const resetAllData = () => {
    storageService.resetAllDemoData();
    setRole('admin');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: role,
        switchRole,
        loginAs,
        logout,
        resetAllData,
        allRoles: Object.keys(DEMO_USERS).map(k => ({
          key: k,
          ...DEMO_USERS[k]
        }))
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
