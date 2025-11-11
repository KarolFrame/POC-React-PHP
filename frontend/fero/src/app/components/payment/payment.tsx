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

    useEffect(()=>{
        fetch(`${API_URL}/payment-methods`)
            .then(res => res.json())
            .then(setMethods);
    }, [])

    const alertPay = (data: string) =>{
        if(data === "Payment processed successfully")
            return toast.success(data);
        return toast.error(data);
    }

    const handlePay = async () =>{
        if(!selected)
            return toast.error("Select a Payment method");
        context?.setPayment(methods.find(m => m.id === selected));

        const res = await fetch(`${API_URL}/pay`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                cart: context?.cart,
                shipping: context?.shipping,
                payment: methods.find(m=> m.id === selected)
            })
        });

        const data= await res.json();
        setStatus(data.message);
        alertPay(status);
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