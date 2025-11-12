"use client";
import Styles from "./checkout-flow.module.css"
import { useState, useRef } from "react";
import CartStep from "../cart/cart";
import ShippingStep from "../shipping-info/shipping-info";
import PaymentStep from "../payment/payment";
import { motion } from "motion/react"
import ProgressBar from "../progress-bar/progress-bar";
import IconMaterial from "../icon-material/icon-material";

interface ShippingStepHandle {
  handleSubmit: () => void;
}
interface PaymentStepHandle {
  handlePay: () => Promise<boolean>;
}

const CheckoutFlow = () => {
  const [step, setStep] = useState(1); // 1 = Cart, 2 = Shipping, 3 = Payment
  const shippingRef = useRef<ShippingStepHandle | null>(null);
  const paymentRef = useRef<PaymentStepHandle>(null!);

  const nextStep = () => setStep(step + 1);
  const backStep = () => setStep(step - 1);

  const handleNextClick = () => {
    switch (step) {
      case 1:
          nextStep();
        break;
      case 2:
        if (shippingRef.current?.handleSubmit?.()) {
          nextStep();
        }
        break;
      case 3:
        if (paymentRef.current && paymentRef.current.handlePay){ 
          paymentRef.current.handlePay();}
        break;
      default:
        break;
    }
  };
  const handleBackClick = () =>{
    backStep();
  }

  return (
    <div className="p-6 m-12 flex flex-col text-center">
        <h1 className="text-3xl font-bold mb-12">Checkout</h1>
        <div className={`${Styles.card}`}>
            <div>
                <ProgressBar step={step}/>
            </div>
            {step === 1 && 
                <CartStep onNext={() => setStep(2)} />}
            {step === 2 && (
            <motion.div
                key="shipping"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}>
                <ShippingStep ref={shippingRef} />
            </motion.div>)}
            {step === 3 && (
            <motion.div
                key="payment"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.5 }}
            >
                <PaymentStep ref={paymentRef} />
            </motion.div>)}
        </div>
        <div className="flex gap-5 justify-center">
          {step>1 && <button className={`${Styles.interactiveButton} flex gap-1 items-center`} onClick={handleBackClick}><IconMaterial ico="keyboard_arrow_left"/>BACK</button>}
          <button className={`${Styles.interactiveButton} flex gap-1 items-center justify-end`} onClick={handleNextClick}>NEXT <IconMaterial ico="keyboard_arrow_right"/></button>
        </div>
    </div>
  );
};

export default CheckoutFlow;
