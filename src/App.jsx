import React from 'react';
import AppRoutes from '../routes/Routes';
import { UserAuthenticationProvider } from '../components/UseraUthentication/UserAuhentication';


function App() {
  return (
    <UserAuthenticationProvider>
      <AppRoutes />;
    </UserAuthenticationProvider>
  )
}

export default App;
