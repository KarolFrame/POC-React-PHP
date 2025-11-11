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

    const _itsAllFields = () => {
        if(Object.values(form).some(v => !v)){
            toast.error("All fields requiered");
            return false;
        }
        return true;
    }

    const _itsEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            toast.error("Please enter a valid email address");
            return false;
        }
        return true;
    }

    const _itsPhoneNumber = () =>{
        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(form.phone)) {
            toast.error("Phone must contain only numbers");
            return false;
        }
        return true;
    }

    const _validateFields = () =>{
        if (!_itsAllFields()) return false;
        if (!_itsEmail()) return false;
        if (!_itsPhoneNumber()) return false;
        
        return true;
    }
    const _saveShippingInfo = () => {
        context?.setShipping(form);
        toast.success("Shipping info saved");
    }

    const handleSubmit = (e: React.FormEvent) =>{
        e.preventDefault();

        if(!_validateFields()) return;
        
        _saveShippingInfo();
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