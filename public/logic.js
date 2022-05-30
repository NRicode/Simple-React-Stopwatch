//todo: encapsulate
var logic = {

	handle: null,
	startTime: null,
	curTime: null,
	timeStr: null,
	//todo: reaplce all these with anonymous function
	startTimer: function(setter){
		
		this.startTime = new Date().getTime();
		setter("00:00:000");
		this.handle = setInterval(()=>{
		
			
			this.curTime = new Date().getTime() - this.startTime;
			let d = new Date(this.curTime);
			this.timeStr = d.getMinutes().toString().padStart(2, 0) + ":" + d.getSeconds().toString().padStart(2, 0) + ":" + d.getMilliseconds().toString().padStart(3,0);
			setter(this.timeStr);

		}, 1);
	},

	stopTimer: function(setter){
		
		clearInterval(this.handle);
		
	},
	
	getLap: function(){
		
		return this.timeStr;
		
	}

}