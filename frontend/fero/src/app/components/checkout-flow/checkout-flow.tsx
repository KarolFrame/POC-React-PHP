"use client";
import { useState } from "react";
import CartStep from "../cart/cart";
import ShippingStep from "../shipping-info/shipping-info";
import PaymentStep from "../payment/payment";
import { motion } from "motion/react"

const CheckoutFlow = () => {
  const [step, setStep] = useState(1); // 1 = Cart, 2 = Shipping, 3 = Payment

  return (
    <div className="p-6 flex flex-col justify-center text-center content-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        {step === 1 && 
            <CartStep onNext={() => setStep(2)} />}
        {step === 2 && (
        <motion.div
            key="shipping"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}>
            <ShippingStep onNext={() => setStep(3)} onBack={() => setStep(1)} />
        </motion.div>)}
        {step === 3 && (
        <motion.div
            key="payment"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
        >
            <PaymentStep onBack={() => setStep(2)} />
        </motion.div>)}
    </div>
  );
};

export default CheckoutFlow;
