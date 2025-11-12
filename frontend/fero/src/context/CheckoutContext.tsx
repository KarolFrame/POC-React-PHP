"use client";
import { createContext, useState, ReactNode } from "react";

export interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface PaymentInfo {
  id: number;
  name: string;
}

interface CheckoutContextType {
  cart: any[];
  setCart: (cart: any[]) => void;
  shipping: ShippingInfo | null;
  setShipping: (info: ShippingInfo) => void;
  payment: PaymentInfo | null;
  setPayment: (payment: PaymentInfo) => void;
}

export const CheckoutContext = createContext<CheckoutContextType | null>(null);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [shipping, setShipping] = useState<ShippingInfo | null>(null);
  const [payment, setPayment] = useState<PaymentInfo | null>(null);

  return (
    <CheckoutContext.Provider value={{ cart, setCart, shipping, setShipping, payment, setPayment }}>
      {children}
    </CheckoutContext.Provider>
  );
};
