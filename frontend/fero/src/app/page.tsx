import { CheckoutProvider } from "@/context/CheckoutContext";
import App from "next/app";
import CartStep from "./components/cart/cart";

export default function Home() {
  return (
    <>
      <CheckoutProvider>
        <CartStep/>
      </CheckoutProvider>
    </>
  );
}
