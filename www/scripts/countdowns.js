var CDtimers = (function(){
	var instance = {};
	var SECLENGTH = 1000;
	var MINLENGTH = 60*SECLENGTH;
	var HRLENGTH = 60*MINLENGTH;
	//returns number of milliseconds until an daily event (UTC)
	//UTC for PST midnight is 8am
	instance.timeLeft = function(hour,minute){
		var timeA = new Date();
		var timeB = new Date();
		timeB.setUTCHours(hour);
		timeB.setUTCMinutes(minute);
		timeB.setUTCSeconds(0);
		var difference = timeB.getTime()-timeA.getTime();
		if (difference < 0)
			difference = 24*60*60*1000 + difference;
		return difference;
	};
	//returns time Date object set at particular UTC hour and minute.
	//used for coverting UTC universal time to a local time.
	instance.localTime = function(hour,minute){
		var timeB = new Date();
		timeB.setUTCHours(hour);
		timeB.setUTCMinutes(minute);
		timeB.setUTCSeconds(0);
		return timeB;
	};
	//Takes a number in ms and returns an object describing how long that is in days,hours,seconds
	instance.mstoTime = function(time){
		var result={hours:0,minutes:0,seconds:0};
		result.hours = Math.floor(time/HRLENGTH);
		result.minutes = Math.floor((time - (result.hours*HRLENGTH))/MINLENGTH);
		result.seconds = Math.floor((time - (result.hours*HRLENGTH) - (result.minutes*MINLENGTH))/SECLENGTH);
		return result;
	};
	
	instance.remainingTime = function(hour,minute){
		return instance.mstoTime(instance.timeLeft(hour,minute));
	};
	return instance;
})();