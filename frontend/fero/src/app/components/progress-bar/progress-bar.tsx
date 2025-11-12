import { useEffect, useState } from "react";
import Styles from "./progress-bar.module.css"

interface ProgressBarProps{
    step:number;
}

const ProgressBar = ({step}:ProgressBarProps) =>{
    const isActive = (stepNumber : number) => (step >= stepNumber ? Styles.active : '');

    return(<>
        <ul className={Styles.progressbar}>
            <li className={isActive(1)}>
                <span className="material-symbols-outlined">shopping_cart</span>
                <strong>Cart Review</strong>
            </li>

            <li className={isActive(2)}>
                <span className="material-symbols-outlined">local_shipping</span>
                <strong>Shipping</strong>
            </li>

            <li className={isActive(3)}>
                <span className="material-symbols-outlined">credit_card</span>
                <strong>Payment</strong>
            </li>
        </ul>
    </>);
}

export default ProgressBar;