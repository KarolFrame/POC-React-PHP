"use client";
import { useState } from "react";
import CartStep from "../cart/cart";
import ShippingStep from "../shipping-info/shipping-info";
import PaymentStep from "../payment/payment";

const CheckoutFlow = () => {
  const [step, setStep] = useState(1); // 1 = Cart, 2 = Shipping, 3 = Payment

  const goNext = () => setStep(prev => Math.min(prev + 1, 3));
  const goBack = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-6 flex flex-col justify-center text-center content-center">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {step === 1 && <CartStep onNext={() => setStep(2)} />}
      {step === 2 && (
        <ShippingStep onNext={() => setStep(3)} onBack={() => setStep(1)} />
      )}
      {step === 3 && <PaymentStep onBack={() => setStep(2)} />}
    </div>
  );
};

export default CheckoutFlow;
