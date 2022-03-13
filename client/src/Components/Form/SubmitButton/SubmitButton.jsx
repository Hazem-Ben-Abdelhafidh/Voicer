import classes from './SubmitButton.module.scss';
const SubmitButton = ({buttonLabel}) => {
    return ( 
        <button className={classes.Button} type="submit">{buttonLabel}</button>
     );
}
 
export default SubmitButton;