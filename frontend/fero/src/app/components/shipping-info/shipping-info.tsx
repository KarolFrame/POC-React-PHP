"use client";
import styles from "./shipping-info.module.css"
import React, { useContext, useState } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
import { toast } from "react-toastify";

interface ShippingStepProps {
  onNext: () => void;
  onBack: () => void;
}

const ShippingStep = ({onNext, onBack}: ShippingStepProps) => {
    const context = useContext(CheckoutContext);
    const defaultForm={
        name:"",
        email:"", 
        address:"", 
        phone:""
    };
    const [form, setForm] = useState(context?.shipping || defaultForm)
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();
        if(Object.values(form).some(v => !v))
            return toast.error("All fields requiered");
        context?.setShipping(form);
        toast.success("Shipping info saved");
        onNext();
    };

    return(<>
    <div className="m-5 p-2">
        <h1 className="text-3xl mb-6 font-bold">Shipping Info</h1>
        <form className="flex flex-col gap-3">
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" className={styles.input} required/>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className={styles.input} required/>
            <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Address" className={styles.input} required/>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className={styles.input} required/>
            <div className="flex gap-5 justify-center">
                <button className={styles.submitButton} onClick={onBack}>BACK</button>
                <button type="submit" className={styles.submitButton} onClick={handleSubmit}>NEXT</button>
            </div>
        </form>
    </div>
    </>);
}

export default ShippingStep;