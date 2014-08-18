	function UserInput($inputType){ // class userInput------ (allow to catch Mouse and Keyboard inputs)
	
		//engine
		this.engine="";
		this.type="userInput";
		this.serial=EG.generateSerial();
		this.name=$inputType;
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
		
		//input
		this.inputType=$inputType;
		this.getInputType = function(){return this.inputType}
		
		//values
		this.values={x:0,y:0};
		var self=this;	
		switch(this.inputType){
			case "mouse":
				addEvent(document,"mousemove",function(e){
					self.values= {
						x:e.clientX+document.documentElement.scrollLeft ,
						y:e.clientY+document.body.scrollTop
					};
				});
			break;
			case "keyBoard":
				addEvent(document,'keydown',function(e){
					console.log(e.keyCode);
					switch (e.keyCode) {
						case 38:  /* Up arrow was pressed */
							self.values.y=-1;
						break;
						case 40:  /* Down arrow was pressed */
							self.values.y=1;
						break;
						case 37:  /* Left arrow was pressed */
							self.values.x=-1;	
						break;
						case 39:  /* Right arrow was pressed */
							self.values.x=1;
						break;
					}
				});
				addEvent(document,'keyup',function(e){
					switch (e.keyCode) {
						case 38:  /* Up arrow was pressed */
							self.values.y=0;
						break;
						case 40:  /* Down arrow was pressed */
							self.values.y=0;
						break;
						case 37:  /* Left arrow was pressed */
							self.values.x=0;	
						break;
						case 39:  /* Right arrow was pressed */
							self.values.x=0;
						break;
					}
				});
			break;
		}
		//output
		this.getValues=function(){
			return this.values;
		}
}