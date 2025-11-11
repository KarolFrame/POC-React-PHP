"use client";
import Styles from "./cart.module.css"
import { useEffect, useContext, useState } from "react";
import { CheckoutContext } from "@/context/CheckoutContext";
import CartStepItem from "../cart-item/cart-item";
import LoaderComponent from "../loader/loader";
import LoaderWrapper from "../loader-wrapper/loader-wrapper";
import { motion } from "motion/react"

interface CartStepProps{
    onNext: () => void;
}

const CartStep = ( {onNext}: CartStepProps) =>{
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    const context = useContext(CheckoutContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const _getCartPromises = () => {
        const minTime = new Promise(resolve => setTimeout(resolve, 1000));
        const fetchData = fetch(`${API_URL}/cart`)
            .then(res => res.json())
            .then(data => context?.setCart(data))
            .catch(() => {
                throw new Error("Failed to fetch cart");
            });
        return [minTime, fetchData];
    };

    const _handleLoadCompletion = async (promises: Promise<any>[]) => {
    try {
        await Promise.all(promises); 
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message); 
        } else {
            setError("An unknown error occurred.");
        } 
    } finally {
        setLoading(false);
    }
    };

    const _loadCartData = async () => {
        const promises = _getCartPromises();
        _handleLoadCompletion(promises);
    };

    useEffect(()=>{
        _loadCartData();
    },[]);

    if(error) 
        return <p>{error}</p>

    const total = context?.cart.reduce((state, item) => state + item.price * item.quantity, 0);

    return(<>
        <div className="m-5 p-2">
            {loading && (<>
                <LoaderWrapper>
                    <LoaderComponent/>
                </LoaderWrapper></>
            )}

            {!loading && (<>
            <motion.div
            key="cart"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}>
                <h2 className="text-3xl font-bold">CART REVIEW</h2>
                {context?.cart.map(item=>(
                    <CartStepItem key={item.id} item={item}/>
                ))}
                <p className="text-xl mt-5">Total: {total}$</p>
                <button className={Styles.nextButton} onClick={onNext}>NEXT</button>
            </motion.div>
            </>)}
        </div>
    
    </>);
}

export default CartStep;