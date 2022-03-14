import classes from "./Input.module.scss";
const Input = ({ name, type, value, onChange }) => {
  return (
    <input
      className={classes.input}
      type={type}
      id={name}
      autoComplete="off"
      placeholder={name}
      value={value}
      onChange={(e)=>{onChange(e.target.value)}}
    />
  );
};

export default Input;
