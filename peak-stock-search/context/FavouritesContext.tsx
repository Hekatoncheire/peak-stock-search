"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Stock {
    symbol: string;
    name: string;
    close: number;
}

// Define the context type
interface FavouritesContextType {
    favourites: Stock[];
    addFavourite: (stock: Stock) => void;
    removeFavourite: (symbol: string) => void;
}

// Initialize the context with a default value
const FavouritesContext = createContext<FavouritesContextType | undefined>(undefined);

// Custom hook to use the FavouritesContext
export const useFavourites = (): FavouritesContextType => {
    const context = useContext(FavouritesContext);
    console.log("Hook called")
    if (!context) {
        throw new Error('useFavourites must be used within a FavouritesProvider');
    }
    return context;
};

// Provider component
export const FavouritesProvider = ({ children }: { children: ReactNode }) => {
    const [favourites, setFavourites] = useState<Stock[]>([]);

    // Load favourites from localStorage when the component mounts
    useEffect(() => {
        const storedFavourites = localStorage.getItem('favourites');
        if (storedFavourites) {
            setFavourites(JSON.parse(storedFavourites));
        }
    }, []);

    // Update localStorage whenever the favourites state changes
    useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

    const addFavourite = (stock: Stock) => {
        setFavourites((prevFavourites) => [...prevFavourites, stock]);
    };

    const removeFavourite = (symbol: string) => {
        const newFavourites = favourites.filter((item) => item.symbol !== symbol)
        setFavourites(newFavourites)
    };

    return (
        <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
};
