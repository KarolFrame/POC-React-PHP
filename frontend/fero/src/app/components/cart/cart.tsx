"use client";
import { useEffect, useContext, useState } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
import CartStepItem from "../cart-item/cart-item";

const CartStep = () =>{
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const context = useContext(CheckoutContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
        setLoading(true);
        fetch(`${API_URL}/cart`)
            .then(res => res.json())
            .then(data => context?.setCart(data))
            .catch(() => setError("Failed to fecth cart"))
            .finally(() => setLoading(false));
    },[]);

    if(loading) return <p>Loading...</p>;
    if(error) return <p>{error}</p>

    const total = context?.cart.reduce((state, item) => state + item.price * item.quantity, 0);


    return(<>
        <div className="m-5 p-2">
            <h2 className="text-3xl">CART REVIEW</h2>
            {context?.cart.map(item=>(
                <CartStepItem key={item.id} item={item}/>
            ))}
            <p>Total: {total}$</p>
        </div>
    
    </>);
}

export default CartStep;