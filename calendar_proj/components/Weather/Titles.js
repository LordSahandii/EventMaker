import classes from './Weathers.module.css';

const Titles = () => {
	return (
		<div>
			
			<h1 className={classes.title_container__title}>Weather Finder</h1>
			<h3 className={classes.title_container__subtitle}>Find out temperature, conditions and more...</h3>
		</div>
	);
	
};

export default Titles;