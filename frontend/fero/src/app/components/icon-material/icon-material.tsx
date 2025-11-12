interface IconMaterialProp{
    ico:string
    className?: string;
}
const IconMaterial = ({ico, className}:IconMaterialProp) =>{
    return(<>
        <span className={`material-symbols-outlined ${className || "material-symbols-outlined"}`}>
            {ico}
        </span>
    </>);
}

export default IconMaterial;