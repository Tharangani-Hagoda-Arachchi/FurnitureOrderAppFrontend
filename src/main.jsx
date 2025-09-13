import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { authContext, AuthProvider } from "./context/authContext.jsx";
import { CartProvider } from './context/cartContext.jsx'


const AppWithCart = () => {
  const { userId, loading } = useContext(authContext);

  if (loading) {
    return <div>Loading...</div>; // wait until AuthProvider finishes
  }

  return (
    <CartProvider userId={userId}>
      <App />
    </CartProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppWithCart />
      </AuthProvider>
    </BrowserRouter>,
  </StrictMode>

)
