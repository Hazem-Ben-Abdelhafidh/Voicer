import classes from "./Input.module.scss";
const Input = ({ name,type }) => {
  return (
    
      <input className={classes.input} type={type} id={name} autoComplete="off" placeholder={name}/>
    
  );
};

export default Input;
