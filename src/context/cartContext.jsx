import React, { createContext, useState, useEffect, useContext } from 'react';
import { authContext } from './authContext';

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
    const { userId } = useContext(authContext);
    const storageKey = `cart_${userId}`;//unique starage key
    const [cart, setCart] = useState({});

    //load cart from local storage when use change
    useEffect(() => {
        try {
            if (!storageKey) return; 
            const saved = localStorage.getItem(storageKey);
            setCart(saved ? JSON.parse(saved) : {});
        } catch {
            setCart({});
        }
    }, [storageKey]);


    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (!storageKey) return;
        if (userId) {
            localStorage.setItem(storageKey, JSON.stringify(cart));
        }
    }, [cart, storageKey, userId]);

    // Add item to cart
    const addToCart = (itemID) => {

        setCart(prev => ({
            ...prev,
            [itemID]: prev[itemID] ? prev[itemID] + 1 : 1,


        }));
    };

    // Increase quantity
    const increaseQty = (itemID) => {
        setCart(prev => ({
            ...prev,
            [itemID]: prev[itemID] + 1
        }));
    };

    // Decrease quantity
    const decreaseQty = (itemID) => {
        setCart(prev => {
            const currentQty = prev[itemID];
            if (currentQty <= 1) {
                const { [itemID]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [itemID]: currentQty - 1 };
        });
    };

    // Remove item
    const removeItem = (itemID) => {
        setCart(prev => {
            const { [itemID]: _, ...rest } = prev;
            return rest;
        });
    };

    // Total items count
    const totalQuantity = Object.values(cart).reduce((acc, qty) => acc + qty, 0);


    return (
        <cartContext.Provider value={{
            cart,
            addToCart,
            increaseQty,
            decreaseQty,
            removeItem,
            totalQuantity,
        }}>
            {children}
        </cartContext.Provider>
    );
};
