import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import { BrowserRouter } from 'react-router-dom';
import createRefresh from 'react-auth-kit/createRefresh';

interface IUserData {
  id: string,
  accessToken: string,
  refreshToken: string
}

const refresh = createRefresh<IUserData>({
  interval: 10,
  refreshApiCallback: async (param) => {
    try {
      const response = await fetch("/api/users/refresh", {
        method: "POST",
        body: JSON.stringify(param),
        headers: {
          Authorization: `Bearer ${param.authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();

      console.log("Refreshing")

      return {
        isSuccess: true,
        newAuthToken: data.token,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60
      }
    }
    catch (error) {
      console.error(error)
      return {
        isSuccess: false,
        newAuthToken: ""
      }
    }
  }
})


const store = createStore<IUserData>({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:',
  refresh: refresh
});


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* React Auth Kit reference: https://authkit.arkadip.dev/  */}
    {/* This must be the format to implement react-auth-kit, otherwise will output errors */}
    <AuthProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>

  </React.StrictMode>
)
