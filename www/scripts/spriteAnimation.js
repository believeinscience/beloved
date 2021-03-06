var spriteAnimation = (function(){
	var instance = {};
	//starts the animation.
	$('#CharacterAvatar').sprite({fps: 16, no_of_frames: 16}).active();
	var activeExpression = false;
	
	//do an expression specified for 3 seconds, and switch back to default expression (1st spState)
	//n is a number between 1 and 7 inclusive
	instance.doExpression = function(n){
		if(activeExpression)
			return;
		activeExpression=true;
		$('#CharacterAvatar').spState(n);
		//reset state to normal after 3 seconds and allow for another expression.
		setTimeout(function(){
			activeExpression=false;
			$('#CharacterAvatar').spState(1);
		},3000);	
	};
	
	instance.randomHappyface = function(){
		instance.doExpression(Math.floor((Math.random() * 2) + 6));
	};
	
	instance.randomSadface = function(){
		instance.doExpression(Math.floor((Math.random() * 2) + 4));
	};
	
	//do blinking every 5 seconds.
	setInterval(function(){
		if(activeExpression)
			return;
		//choose randomly from a regular blink or a double blink. (states 2 or 3)
		$('#CharacterAvatar').spState(Math.floor((Math.random() * 2) + 2));
		//wait 1 second for the blink to happen and reset.
		setTimeout(function(){
		if(!activeExpression)
			$('#CharacterAvatar').spState(1);
		},1000);
	},5000);
	return instance;
})();