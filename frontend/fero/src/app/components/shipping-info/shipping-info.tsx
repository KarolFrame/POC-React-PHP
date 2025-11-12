"use client";
import styles from "./shipping-info.module.css"
import React, { useContext, useState, forwardRef, useImperativeHandle } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
import { toast } from "react-toastify";
import { ShippingInfo } from "@/context/CheckoutContext";
import IconMaterial from "../icon-material/icon-material";

interface ShippingStepHandle {
    handleSubmit: () =>void;
}

const ShippingStep = forwardRef<ShippingStepHandle, {}>((_props, ref) => {
    const context = useContext(CheckoutContext);
    const defaultForm={
        name:"",
        email:"", 
        address:"", 
        phone:""
    } as ShippingInfo;
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

    const handleSubmit = (): boolean => {
        if (!_validateFields()) return false;
        _saveShippingInfo();
        return true;
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit();
    };

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    return(<>
    <div className="m-5 p-2">
    <h1 className="text-3xl mb-6 font-bold">Shipping Info</h1>
    <form className="flex flex-col gap-3 justify-center content-center" onSubmit={handleFormSubmit}>
        <div className="relative">
        <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className={`${styles.input} pl-10`}
            required
        />
        <IconMaterial
            ico="person"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        </div>
        <div className="relative">
        <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className={`${styles.input} pl-10`}
            required
        />
        <IconMaterial
            ico="email"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        </div>
        <div className="relative">
        <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className={`${styles.input} pl-10`}
            required
        />
        <IconMaterial
            ico="home"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        </div>
        <div className="relative">
        <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className={`${styles.input} pl-10`}
            required
        />
        <IconMaterial
            ico="phone"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        </div>
    </form>
    </div>
    </>);
})

export default ShippingStep;