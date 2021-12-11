import classes from './Weathers.module.css';

const Weather = (props) => {
	return (
		<>
			<div className="weather__info">
				{	
					props.city && props.country && <p className={classes.weather__key}> Location: 
						<span className={classes.weather__value}> { props.city }, { props.country }</span>
					</p> 
				}
				{ 	
					props.temperature && <p className={classes.weather__key}> Temperature: 
						<span className={classes.weather__value}> { props.temperature }	</span>
					</p> 
				}
				{ 	
					props.humidity && <p className={classes.weather__key}> Humidity: 
						<span className={classes.weather__value}> { props.humidity } </span>
					</p> 
				}
				{ 	
					props.description && <p className={classes.weather__key}> Conditions: 
						<span className={classes.weather__value}> { props.description } </span>
				</p> 
				}
				{ 
					props.error && <p className={classes.weather__error}>{ props.error }</p>  
				}
			</div>
		</>
	)
};

export default Weather;

