var spriteAnimation = new function(){
	$('#CharacterAvatar').sprite({fps: 16, no_of_frames: 16}).active();
	var activeExpression = false;
	this.doExpression = function(n){
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
	
	this.randomHappyface = function(){
		this.doExpression(Math.floor((Math.random() * 2) + 6));
	};
	
	this.randomSadface = function(){
		this.doExpression(Math.floor((Math.random() * 2) + 4));
	};
	
	//do blinking intervals every 5 seconds.
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
};