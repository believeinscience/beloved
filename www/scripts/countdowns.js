
var CDtimers = new function(){
	var SECLENGTH = 1000;
	var MINLENGTH = 60*SECLENGTH;
	var HRLENGTH = 60*MINLENGTH;
	//returns number of milliseconds until an daily event (UTC)
	//UTC for PST midnight is 8am
	this.timeLeft = function(hour,minute){
		var timeA = new Date();
		var timeB = new Date();
		timeB.setUTCHours(hour);
		timeB.setUTCMinutes(minute);
		timeB.setUTCSeconds(0);
		var difference = timeB.getTime()-timeA.getTime();
		if (difference < 0)
			difference = 24*60*60*1000 + difference
		return difference;
	},
	//Takes a number in ms and returns an object describing how long that is in days,hours,seconds, and ms
	this.mstoTime = function(time){
		var result={hours:0,minutes:0,seconds:0}
		result.hours = Math.floor(time/HRLENGTH);
		result.minutes = Math.floor((time - (result.hours*HRLENGTH))/MINLENGTH);
		result.seconds = Math.floor((time - (result.hours*HRLENGTH) - (result.minutes*MINLENGTH))/SECLENGTH);
		return result;
	}
	
	this.remainingTime = function(hour,minute){
		return this.mstoTime(this.timeLeft(hour,minute));
	}
};