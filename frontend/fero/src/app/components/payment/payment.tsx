"use client";
import Styles from "./payment.module.css"
import React, { useContext, useEffect, useState, forwardRef, useImperativeHandle, Ref } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
import { toast } from "react-toastify";
import IconMaterial from "../icon-material/icon-material";

interface PaymentStepHandle {
    handlePay: () => Promise<boolean>;
}

const PaymentStep = forwardRef<PaymentStepHandle, {}>((_props, ref) => {
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

    const _validateSelectedMethod = () => {
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

    useEffect(() => {
        _loadPaymentMethods()
    }, [])


    const handlePay = async () : Promise<boolean> => {
        const selectedMethod = _validateSelectedMethod();
        if (!selectedMethod) return false;

        context?.setPayment(selectedMethod);
        
        const requestBody = _buildRequestBody(selectedMethod, context);
        const success = await _executePaymentRequest(requestBody);
        return success;
    };

    useImperativeHandle(ref, () => ({
        handlePay,
    }));

    return (<>
        <div className="m-5 p-2">
            <h2 className="text-3xl font-bold mb-6">Payment</h2>
            <div className="flex gap-4 justify-center flex-wrap">
                {methods.map(m => (
                    <div
                    key={m.id}
                    onClick={() => setSelected(m.id)}
                    className={`flex flex-col items-center justify-center gap-2 p-3 border rounded cursor-pointer transition
                                w-32 h-32
                                ${selected === m.id ? Styles["selected-method"] : "border-gray-300"}`}
                    >
                    <IconMaterial ico={m.icon || "credit_card"} className="text-3xl" />
                    <span className="text-center">{m.name}</span>
                    </div>
                ))}
            </div>
        </div>
    </>);
});

export default PaymentStep;