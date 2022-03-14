import Spinner from '../../Spinner/Spinner';
import classes from './SubmitButton.module.scss';
const SubmitButton = ({buttonLabel,isFetching}) => {
    return ( 
        <button className={classes.Button} type="submit">{isFetching? <Spinner/>:buttonLabel}</button>
     );
}
 
export default SubmitButton;