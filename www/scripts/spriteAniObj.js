
/**A sprite animation object, that manages states and initiates animation.
initiate with dom identifier of animation, fps to run the sprite at, and the number of frames the animation has, and the number of states.

Used for manage simple Animations that change state temporarily and repeatedly change state every so often.

this is dependent upon spritely plugin for jquery.
*/
var spriteAnima = function(domid,inputfps,inputframes,numstates){
	//sprite can't be a property, setTimeouts can't access
	var sprite = $(domid);
	var activeExpression = false;
	var defaultExpression = 1;
	//interval parameters
	var exprtime = 1000;
	var timebetween = 5000;
	var spriteinterval = null;
	var randexpressions = [];
	
	
	//starts the animation.
	sprite.sprite({fps: inputfps, no_of_frames: inputframes}).active();
	

	//do an expression specified for time specified, and switch back to default expression
	var doExpression = function(n,duration){
		if(activeExpression)
			return;
		activeExpression=true;
		sprite.spState(n);
		//reset state to normal after n seconds and allow for another expression.
		setTimeout(function(){
			activeExpression=false;
			sprite.spState(defaultExpression);
		},duration);	
	};

	//does a random state based on a array of integers.
	//if empty list is given, then a random one is picked.
	//these are not properties since the interval can't access them.
	var doRandomExpression = function(list,duration){
		if(list.length==0){
			var randchosen = Math.floor(Math.random()*numstates) + 1;
			doExpression(randchosen,duration);
			return;
		};
		var choice = list[Math.floor(Math.random()*list.length)];
		if (choice>numstates || choice<0)
			choice = defaultExpression;
		doExpression(choice,duration);
	};

	this.startinter = function(){
		if(spriteinterval!==null)
			return;
		spriteinterval = setInterval(function(){
		if(activeExpression)
			return;
		doRandomExpression(randexpressions,exprtime);
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

	this.doExpression = function(n,duration){
		doExpression(n,duration);
	};

	this.doRandomExpression = function(list,duration){
		doRandomExpression(list,duration);
	};

	this.settimebetween = function(input){
		timebetween = input;
	};
	this.setexprtime = function(input){
		timebetween = input;
	};
	this.setrandexpr = function(input){
		randexpressions = input;
	};
	
};



/*var speed= 16;

var a = new spriteAnima('#a',speed,16,7);
a.settimebetween(1000);
a.setexprtime(500);
a.setrandexpr([4,5,6,7]);
a.startinter();
var b = new spriteAnima('#b',speed,16,7);
var c = new spriteAnima('#c',speed,16,7);
var d = new spriteAnima('#d',speed,16,7);
setTimeout(function(){
	$('#a').destroy();
	$('#b').destroy();
	$('#c').destroy();
	$('#d').destroy();
	console.log('stopping');
	a.stopinter();
	a.startinter();
},5000);
setTimeout(function(){
	a.destroy();
},10000);*/