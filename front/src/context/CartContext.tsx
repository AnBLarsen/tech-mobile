// context/CartContext.tsx
"use client";

import { IProduct } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
    cart: IProduct[];
    setCart: (items: IProduct[]) => void;
    clearCart: () => void;
    subtotal: number;
    tax: number;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCartState] = useState<IProduct[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartState(stored);
    }, []);

    useEffect(() => {
        const newSubtotal = cart.reduce((acc, item) => acc + item.price, 0);
        const newTax = newSubtotal * 0.13;
        const newTotal = newSubtotal + newTax;

        setSubtotal(newSubtotal);
        setTax(newTax);
        setTotal(newTotal);

        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const setCart = (items: IProduct[]) => {
        setCartState(items);
    };

    const clearCart = () => {
        setCartState([]);
        localStorage.setItem("cart", "[]");
    };

    return (
        <CartContext.Provider value={{ cart, setCart, clearCart, subtotal, tax, total }}>
        {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
