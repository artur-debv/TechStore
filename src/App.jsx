import React from 'react';
import AppRoutes from '../routes/Routes';
import { UserAuthenticationProvider } from '../components/UseraUthentication/UserAuhentication';
import { AuthProvider } from '../services/ChekedForLogin';


function App() {
  return (
    <AuthProvider>
      <UserAuthenticationProvider>
        <AppRoutes />;
      </UserAuthenticationProvider>
    </AuthProvider>
  )
}

export default App;
