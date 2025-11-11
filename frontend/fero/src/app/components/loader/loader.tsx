import Styles from "./loader.module.css"

const LoaderComponent = () =>{
    return(<>
    <div className={Styles.wrapper}>
        <div className={Styles.circle}></div>
        <div className={Styles.circle}></div>
        <div className={Styles.circle}></div>
        <div className={Styles.shadow}></div>
        <div className={Styles.shadow}></div>
        <div className={Styles.shadow}></div>
    </div>
    </>)
}

export default LoaderComponent;