import styles from "./cart-item.module.css";

interface CartItem{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

const CartStepItem = ({item}:{item: CartItem}) =>{
    return(<>
        <div className={styles.cartItemContainer}>
            <img className={styles.cartItemImage} src={item.image}/>
            <div className="text-start">
                <p className="text-xl font-bold">{item.price}$</p>
                <p className="text-xl">{item.name}</p>
                <p className={styles.quantity}>Quantity: {item.quantity}</p>
            </div>
        </div>

    </>);
}

export default CartStepItem;