import Layout from "../Layout/Layout";
import { useState } from "react";
import classes from './calendar.module.css';
import EventsCalendar from "./EventsCalendar";


const Calendar = (props) => {

    // Get the current date
    let date= new Date;
    const [Month, setMonth] = useState(date.getMonth()); // Get the current month
    const [year, setyear] = useState(date.getFullYear());  // Get the current year
    let stringMonth = AssignMonth(Month);
    const [searchDate, setsearchDate] = useState(undefined)        // This date will be used to search for the events

    // Set the date to the first of the month
    date.setDate(1);
    const [firstWeeekDay, setFirstWeeekDay] = useState(date.getDay())
      // Get the weekday of the first day of the month
    let daysInMonth = daysInMonths(Month, year);  // Find how many days does the month have
    let monthday = [];  // make an array listing all the days in  the month
    for(let i = 1; i <= daysInMonth; i++)
    {
        monthday.push(i);
    }

    // Get the days of each week
    let firstWeek;
    let secondWeek;
    let thirdWeek;
    let fourthWeek;
    let fifthWeek;
    let sixthWeek;

    // Assign all the weeks to the corresponding days
    const AssignWeeks = () => {
        firstWeek = monthday.filter((i) => i <= 7-firstWeeekDay);
        secondWeek = monthday.filter((i) => i > firstWeek.length && i <= firstWeek.length+7); //[7,8,9,10,11,12,13]
        thirdWeek = monthday.filter((i) => i > secondWeek[6] && i <= secondWeek[6]+7);  //[14,15,16,17,18,19,20]
        fourthWeek = monthday.filter((i) => i > thirdWeek[6] && i <= thirdWeek[6]+7);
        fifthWeek = monthday.filter((i) => i > fourthWeek[6] && i <= fourthWeek[6]+7)
        sixthWeek = monthday.filter((i) => i > fifthWeek[6] && i <= fifthWeek[6] + 7);

        // add zeros on the first week so that it has 7 values in the list
        firstWeek.reverse();
        for(let i = firstWeek.length; i <7; i++)
        {
            firstWeek.push(0);
        }
        firstWeek.reverse();
    
    }
    // Run the assign week function
    AssignWeeks();

   
    // For redirecting to the events
    const eventHandler = (day) => {
        // Create new variables for the date
        let searchDay = day;
        let searchMonth = Month+1;
        let searchYear = year;

        // Add a zero in front if less than 10
        if(searchDay.toString().length == 1) searchDay = '0' + searchDay;
        if(searchMonth.toString().length == 1) searchMonth = '0' + searchMonth;

        //create the searchDate for the database
        setsearchDate(searchYear + '-' + searchMonth + '-' + searchDay)
    }

    // Go back a month
    const PrevMonth = () => {
        if(Month==0)
        {
            setMonth(11);
            setyear(year-1);
            date.setMonth(11)
            date.setFullYear(year-1)
        }
        else
        {
            setMonth(Month-1);
            date.setMonth(Month-1)
        }
        setFirstWeeekDay(date.getDay())
        AssignWeeks();
    }

    // GO to the next month
    const NextMonth = () => {
        if(Month==11)
        {
            setMonth(0);
            setyear(year+1);
            date.setMonth(0)
            date.setFullYear(year+1)
        }
        else
        {
            setMonth(Month+1);
            date.setMonth(Month+1);
        }
        setFirstWeeekDay(date.getDay())
        AssignWeeks();
    }

    return (
        <div className={classes.divMother}>
            <Layout />
            <table className={classes.table}>
                <tr>
                    <th><i onClick={PrevMonth} className="bi bi-arrow-left-circle"></i></th>
                    <th colSpan='5'>{stringMonth} {year}</th>
                    <th><i onClick={NextMonth} className="bi bi-arrow-right-circle"></i></th>
                </tr>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
                <tr>
                    {firstWeek.map((day) => (<td><input type='button' key={day} value={day} onClick={() => eventHandler(day)} /></td>))}
                </tr>
                <tr>
                    {secondWeek.map((day) => (<td><input type='button' key={day} value={day} onClick={() => eventHandler(day)} /></td>))}    
                </tr>
                <tr>
                    {thirdWeek.map((day) => (<td><input type='button' key={day} value={day} onClick={() => eventHandler(day)} /></td>))}
                </tr>
                <tr>
                    {fourthWeek.map((day) => (<td><input type='button' key={day} value={day} onClick={() => eventHandler(day)} /></td>))}
                </tr>
                {/* Check if there is a fifth week in the month */}
                {fifthWeek.length !=0 ? 
                <tr>
                    {fifthWeek.map((day) => (<td><input type='button' key={day} value={day} onClick={() => eventHandler(day)} /></td>))}
                </tr> : <></>}
                {sixthWeek.length !=0 ? 
                <tr>
                    {sixthWeek.map((day) => (<td><input type='button' key={day} value={day} onClick={() => eventHandler(day)} /></td>))}
                </tr> : <></>}
            </table>
            <EventsCalendar date={searchDate} EventsList={props.EventsList}/>
        </div>
        
    )
}

// It assign the numbers to the corresponding month
const AssignMonth = (month) => {
    switch(month){
        case 0: return "January";
        case 1: return "February";
        case 2: return "March";
        case 3: return "April";
        case 4: return "May";
        case 5: return "June";
        case 6: return "July";
        case 7: return "August";
        case 8: return "September";
        case 9: return "October";
        case 10: return "November";
        case 11: return "December";
    }
}

// It check whether it's a leap year or not
const febDays = (year) => {
    let check;
    (year%4==0 && (year%100!=0 || year%400==0)) ? check=true : check=false;
    return check
}

// gets how many days there are in a month
const daysInMonths = (month, year) => {
    switch(month){
        case 0: return 31;
        case 1: return febDays(year) ? 29 : 28;
        case 2: return 31;
        case 3: return 30;
        case 4: return 31;
        case 5: return 30;
        case 6: return 31;
        case 7: return 31;
        case 8: return 30;
        case 9: return 31;
        case 10: return 30;
        case 11: return 31;
    }
}


export default Calendar;
