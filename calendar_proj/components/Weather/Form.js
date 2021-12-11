import classes from './Weathers.module.css';

const Form = (props) => {
	return (
	<form onSubmit={props.getWeather}>
		<input type="text" name="city" placeholder="City..." className={classes.inputt}/>
		<input type="text" name="country" placeholder="Country..." className={classes.inputt}/>
		<button className={classes.buttonn}>Get Weather</button>
	</form>	
	)
}

;

export default Form;