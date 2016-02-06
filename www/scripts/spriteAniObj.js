
/**A sprite animation object, that manages states and initiates animation.
initiate with dom identifier of animation, fps to run the sprite at, and the number of frames the animation has, and the number of states.

Used for manage simple Animations that change state temporarily and repeatedly change state every so often.

this is dependent upon spritely plugin for jquery.
*/
var spriteAnima = function(domid,inputfps,inputframes,numstates){
	//sprite can't be a property, setTimeouts can't access
	var sprite = $(domid);
	//when an outside source(click) is doing a reaction)
	var activeExpression = false;
	var defaultExpression = 1;
	//interval parameters
	var timebetween = 5000;
	var spriteinterval = null;
	
	//random interval expressions
	//all expressions are objects with the properties with state,weight,length to ensure flexibility
	var randintervalexpressions = [];
	
	
	//starts the animation.
	sprite.sprite({fps: inputfps, no_of_frames: inputframes}).active();
	

	//do an expression specified for time specified, and switch back to default expression
	//priority indicates if it will do expression if there is already an expression being performed.
	//if true, it will override if the current expresion isn't high priority
	//if false, it will not.
	var doExpression = function(n,duration,priority){
				console.log('doExpr');
			console.log(priority);
		if(activeExpression)
			return;
		sprite.spState(n);
		if(priority)
			activeExpression=true;
		//reset state to normal after n seconds and allow for another expression.
		setTimeout(function(){
			console.log('timeout');
			console.log(priority);
			if(priority || !activeExpression)
				sprite.spState(defaultExpression);
			if(priority)
				activeExpression=false;
		},duration);	
	};

	//does a random state based on a array of integers.
	//if empty list is given, nothing happens.
	//these are not properties since the interval can't access them.
	
	//quick TEST of randomness
	pickedstates={};
	pickedstateincrements=0;
	
	//returns random index from array of objects based on  weight property of objects.
	var chooserandomweightedindex = function(list){
		var weightsum=0;
		for(var i=0;i<list.length;i++)
			weightsum+=list[i].weight;
		//get random
		var weightchoice = Math.floor(Math.random()*weightsum) + 1;
		var indexchoice = 0;
		//find the index with the corresponding weight
		for(i=0;i<list.length;i++){
			weightchoice = weightchoice - list[i].weight
			if(weightchoice<=0){
				indexchoice = i;
				break;
			}
			if(i==list.length-1)
				indexchoice = i;
		}
		return indexchoice;
	};
	
	this.chooserandomweightedindex = function(list){
		return chooserandomweightedindex(list);
	};
	
	var doRandomExpression = function(list,priority){
		if(list.length==0)
			return;
		var index = chooserandomweightedindex(list);
		doExpression(list[index].state,list[index].length,priority);
	};

	this.startinter = function(){
		if(spriteinterval!==null)
			return;
		spriteinterval = setInterval(function(){
		if(activeExpression)
			return;
		doRandomExpression(randintervalexpressions,false);
		},timebetween);
	};

	this.stopinter = function(){
		if(spriteinterval===null)
			return;
		clearInterval(spriteinterval);
		spriteinterval=null;
	};

	//destroy animation, stop intervals.
	//necessary when we switch pages, the javascript will keep running them.
	this.destroy = function(){
		sprite.destroy();
		this.stopinter();
	};

	this.doExpression = function(n,duration,priority){
		doExpression(n,duration,priority);
	};

	this.doRandomExpression = function(list,priority){
		doRandomExpression(list,priority);
	};
	

	this.settimebetween = function(input){
		timebetween = input;
	};

	this.setrandexpr = function(input){
		randintervalexpressions = input;
	};
	
};