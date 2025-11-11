import { CheckoutProvider } from "@/context/CheckoutContext";
import App from "next/app";
import CartStep from "./components/cart/cart";
import ShippingStep from "./components/shipping-info/shipping-info";
import PaymentStep from "./components/payment/payment";
import CheckoutFlow from "./components/checkout-flow/checkout-flow";

export default function Home() {
  return (
    <>
      <CheckoutProvider>
        <div className="w-full flex justify-center">
          <div className="w-[50%]">
          <CheckoutFlow/>
        </div>
        </div>
        
      </CheckoutProvider>
    </>
  );
}
