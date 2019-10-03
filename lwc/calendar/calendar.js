import { LightningElement, track } from 'lwc';
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default class Calendar extends LightningElement 
{
    @track dateitems = showCalendar(currentMonth,currentYear);
    @track monthAndYear = months[currentMonth] + " " + currentYear;
    handleClick(event) {
        let clickBtnVal = event.target.value;
        if(clickBtnVal === 'previous')
        {
            currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
            currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
            this.dateitems = showCalendar(currentMonth,currentYear);
            this.monthAndYear = months[currentMonth] + " " + currentYear;
        }
        else if(clickBtnVal === 'next')
        {
            currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
            currentMonth = (currentMonth + 1) % 12;
            this.dateitems = showCalendar(currentMonth,currentYear);
            this.monthAndYear = months[currentMonth] + " " + currentYear;
        }
    }
    handleMonthYearChange(event)
    {
        let eventSource = event.target.name;
        if(eventSource === 'month')
        {
            let selectedMonth = event.target.value;
            currentMonth = selectedMonth;
        }
        else if(eventSource === 'year')
        {
            let selectedYear = event.target.value;
            currentYear = selectedYear;
        }
        this.dateitems = showCalendar(currentMonth,currentYear);
        this.monthAndYear = months[currentMonth] + " " + currentYear;
    }
}

function showCalendar(month,year)
{
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let firstDay = (new Date(year, month)).getDay();
    let date = 1;
    let rows = [];
    // outer loop for week
    for(let i = 0; i < 6; i++)
    {
        let row = [];
        //inner loop for days
        for(let j=0; j < 7; j++)
        {
            // for first week
            if(i === 0 && j <firstDay)
            {
                row.push(null);
            }
            else if (date > daysInMonth) {
                break;
            }
            else 
            {
                row.push(date);
                date++;
            }
        }
        rows.push(row);
    }
    return rows;
}