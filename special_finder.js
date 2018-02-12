// Create object that contains keys for today's date and the associated specials
var specialDates = {
	'02-12-2018' : 'E',
	'03-02-2017' : 'A',
	'03-03-2017' : 'B',
	'03-04-2017' : 'X',
	'03-05-2017' : 'X',
	'03-06-2017' : 'C',
	'03-07-2017' : 'D',
	'03-08-2017' : 'E',
	'03-09-2017' : 'A',
	'03-10-2017' : 'B',
	'03-11-2017' : 'X',
	'03-12-2017' : 'X',
	'03-13-2017' : 'C',
	'03-14-2017' : 'D',
	'03-15-2017' : 'E',
	'03-16-2017' : 'A',
	'03-17-2017' : 'X',
	'03-18-2017' : 'X',
	'03-19-2017' : 'X',
	'03-20-2017' : 'B',
	'03-21-2017' : 'C',
	'03-22-2017' : 'D',
	'03-23-2017' : 'E',
	'03-24-2017' : 'A',
	'03-25-2017' : 'X',
	'03-26-2017' : 'X',
	'03-27-2017' : 'B',
	'03-28-2017' : 'C',
	'03-29-2017' : 'D',
	'03-30-2017' : 'E',
	'03-31-2017' : 'A',
	'04-01-2017' : 'X',
	'04-02-2017' : 'X',
	'04-03-2017' : 'X',
	'04-04-2017' : 'X',
	'04-05-2017' : 'X',
	'04-06-2017' : 'X',
	'04-07-2017' : 'X',
	'04-08-2017' : 'X',
	'04-09-2017' : 'X',
	'04-10-2017' : 'B',
	'04-11-2017' : 'C',
	'04-12-2017' : 'D',
	'04-13-2017' : 'E',
	'04-14-2017' : 'X',
	'04-15-2017' : 'X',
	'04-16-2017' : 'X',
	'04-17-2017' : 'A',
	'04-18-2017' : 'B',
	'04-19-2017' : 'C',
	'04-20-2017' : 'D',
	'04-21-2017' : 'E',
	'04-22-2017' : 'X',
	'04-23-2017' : 'X',
	'04-24-2017' : 'A',
	'04-25-2017' : 'B',
	'04-26-2017' : 'C',
	'04-27-2017' : 'D',
	'04-28-2017' : 'E',
	'04-29-2017' : 'X',
	'04-30-2017' : 'X',
	'05-01-2017' : 'A',
	'05-02-2017' : 'B',
	'05-03-2017' : 'C',
	'05-04-2017' : 'D',
	'05-05-2017' : 'E',
	'05-06-2017' : 'X',
	'05-07-2017' : 'X',
	'05-08-2017' : 'A',
	'05-09-2017' : 'B',
	'05-10-2017' : 'C',
	'05-11-2017' : 'D',
	'05-12-2017' : 'X',
	'05-13-2017' : 'X',
	'05-14-2017' : 'X',
	'05-15-2017' : 'E',
	'05-16-2017' : 'A',
	'05-17-2017' : 'B',
	'05-18-2017' : 'C',
	'05-19-2017' : 'D',
	'05-20-2017' : 'X',
	'05-21-2017' : 'X',
	'05-22-2017' : 'E',
	'05-23-2017' : 'A',
	'05-24-2017' : 'B',
	'05-25-2017' : 'C',
	'05-26-2017' : 'D',
	'05-27-2017' : 'X',
	'05-28-2017' : 'X',
	'05-29-2017' : 'X',
	'05-30-2017' : 'E',
	'05-31-2017' : 'A',
	'06-01-2017' : 'B',
	'06-02-2017' : 'C',
};

// Create objects that contain keys for Ben and Meryl's specials
var merylSpecials = {
	'A' : 'Library',
	'B' : 'Art',
	'C' : 'Music and Gym',
	'D' : 'Gym and Music',
	'E' : 'Spanish',
	'X' : 'None Today',
};

var benSpecials = {
	'A' : 'Art',
	'B' : 'Music and Gym',
	'C' : 'Gym and Music',
	'D' : 'Spanish',
	'E' : 'Library',
	'X' : 'None Today',
};

// Work out today's date and set it as a variable
var today = new Date();  
var dd = today.getDate();  
var mm = today.getMonth()+1;   
var yyyy = today.getFullYear();  
// Provide leading zeros if needed for a predictable format
if(dd<10)   
{  
    dd = '0'+ dd ;  
}   
  
if(mm<10)   
{  
    mm = '0' + mm ;  
}   
today = mm+'-'+dd+'-'+yyyy;  


	/*var date = today;
	var special_key = specialDates[today];
	var special_ben = benSpecials[specialDates[today]];
	var special_meryl = merylSpecials[specialDates[today]];*/

//getSpecialsForDate(today);


// Look up specials for a given date, or return today's specials if no date is given
function getSpecialsForDate(date) {
    var date = (typeof date !== 'undefined') ? date : today;


	/*var special_key = specialDates[date];
	var special_ben = benSpecials[specialDates[date]];
	var special_meryl = merylSpecials[specialDates[date]];*/

    console.log("For the date: " + date);
	console.log("The special key is: " + specialDates[date]);
	console.log("Ben's special is: " + benSpecials[specialDates[date]]);
	console.log("Meryl's special is: " + merylSpecials[specialDates[date]]);



    
};

// Add or remove a day from the day of the month, based on button click
function changeDate(num) {

	dd = dd + num;

	if(dd<10)   
	{  
	    dd='0'+dd;  
	}   
	today = mm+'-'+dd+'-'+yyyy;

	getSpecialsForDate(today);

	document.getElementById("date").innerHTML = today ;
	document.getElementById("special_key").innerHTML = specialDates[today];
	document.getElementById("special_ben").innerHTML = benSpecials[specialDates[today]];
	document.getElementById("special_meryl").innerHTML = merylSpecials[specialDates[today]] ;

};







