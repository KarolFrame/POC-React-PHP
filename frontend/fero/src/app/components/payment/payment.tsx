"use client";
import Styles from "./payment.module.css"
import { useContext, useEffect, useState } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
import {toast} from "react-toastify";
import { stat } from "fs";

interface PaymentStepProps {
  onBack: () => void;
}

const PaymentStep = ({onBack}: PaymentStepProps) =>{
    const context = useContext(CheckoutContext);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const [methods, setMethods] = useState<any[]>([]);
    const [selected, setSelected] = useState(context?.payment?.id || null);
    const [status, setStatus] = useState("");

    const _loadPaymentMethods = () => {
        const fetchMethods = async () => {
            try {
                const res = await fetch(`${API_URL}/payment-methods`);
                if (!res.ok) throw new Error("Failed to load methods.");
                const data = await res.json();
                setMethods(data);
            } catch (error) {
                console.error("Error loading payment methods:", error);
                toast.error("Error loading payment methods.");
            }
        };
        fetchMethods();
    };

    const _buildRequestBody = (selectedMethod: any, context: any) => {
        return JSON.stringify({
            cart: context?.cart,
            shipping: context?.shipping,
            payment: selectedMethod,
        });
    };

    const _handlePaymentResponse = async (res: Response) => {
        const data = await res.json();
        setStatus(data.message);

        if (res.ok) {
            toast.success(data.message || "Payment processed successfully");
            return true
        } else {
            toast.error(data.message || "Payment failed");
            return false;
        }
    };

    const _validateSelectedMethod = () =>{
        if (!selected) {
            toast.error("Select a Payment method");
            return null;
        }

        const selectedMethod = methods.find(m => m.id === selected);
        
        if (!selectedMethod) {
            toast.error("Payment method not found.");
            return null;
        }

        return selectedMethod;
    }

    const _executePaymentRequest = async (requestBody: string) => {
        try {
            const res = await fetch(`${API_URL}/pay`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: requestBody
            });
            const success = await _handlePaymentResponse(res); 
            return success;

        } catch (error) {
            console.error("Network error during payment:", error);
            toast.error("A network error occurred. Please try again.");
            return false;
        }
    };

    useEffect(()=>{
        _loadPaymentMethods()
    }, [])


    const handlePay = async () =>{
        const selectedMethod = _validateSelectedMethod();

        if(!selectedMethod) return;

        context?.setPayment(selectedMethod);
        
        const requestBody = _buildRequestBody(selectedMethod, context);
        await _executePaymentRequest(requestBody);
    };

    return(<>
    <div className="m-5 p-2">
      <h2 className="text-3xl font-bold mb-6">Payment</h2>
      <div className="flex justify-center gap-6">
        {methods.map(m => (
            <label key={m.id}>
            <input type="radio" checked={selected === m.id} onChange={() => setSelected(m.id)} />
            {m.name}
            </label>
        ))}
      </div>
      <div className="flex gap-6 justify-center">
        <button className={Styles.payButton} onClick={onBack}>BACK</button>
        <button className={Styles.payButton} onClick={handlePay}>PAY</button>
      </div>      
    </div>

    </>);
}

export default PaymentStep;