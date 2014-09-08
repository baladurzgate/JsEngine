	function UserInput($inputType,$cible,$region){ // class userInput------ (allow to catch Mouse and Keyboard inputs)
	
		//engine
		this.engine="";
		this.type="userInput";
		this.serial=EG.generateSerial();
		this.name=$inputType;
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		this.mouseDown = false;
		this.mouseUp = false;
		this.cible = $cible;
		this.onUp = function(){};
		this.onDown = function(){};
		this.onMove = function(){};
		EG.add(this);
		
		if($cible !== document){
			if(isNaN(getStyle($cible,'left'))) $cible.style.left = 0;
			if(isNaN(getStyle($cible,'top'))) $cible.style.top = 0;
		}
		
		//input
		this.inputType=$inputType;
		this.getInputType = function(){return this.inputType}
		
		//values
		this.values={x:0,y:0};
		var self=this;	
		this.lastPosition={x:0,y:0};
		
		if($region == undefined) $region = "";
		
		this.getX = function(e){
		
			var x = 1;
			
			e = e || window.event;
			
			var pageX = e.pageX;

			if (pageX === undefined) {
				x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			}else{
				x = pageX;
			}

			return x;
		}
		
		this.getY = function(e){
		
			var y = 1;
			
			//e = e || window.event;
			
			var pageY = e.pageY;

			if (pageY === undefined) {
				y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}else{
				y = pageY;
			}

			return y;
		}		
		
		switch(this.inputType){
		
			case "mouse":
				addEvent($cible,"mousemove",function(e){

					if($cible !== document){
						
						var cx = getStyle($cible,'left');
						
						var cy = getStyle($cible,'top');

						self.values= {

							x: self.getX(e) - cx ,
							y: self.getY(e) - cy
							
						};
						
					}else{

						self.values= {

							x: self.getX(e) ,
							y: self.getY(e)
							
						};					
					}
					
					self.lastPosition= {
						x: self.values.x ,
						y: self.values.y
					};
					
					self.onMove();
					
				});
				
			break;
			
			case "click":
			
				addEvent($cible,"mousedown",function(e){
				
					self.values= {
						x: self.getX(e) ,
						y: self.getY(e)
					};
					self.lastPosition= {
						x:self.values.x ,
						y:self.values.y
					};
					self.mouseUp=false;
					self.mouseDown=true;
					self.onDown();
					
				});
				
				addEvent(document,"mouseup",function(e){
				
					self.values= {
						x:self.lastPosition.x ,
						y:self.lastPosition.y
					};
					self.mouseUp=true;
					self.mouseDown=false;
					self.onUp();
					
				});
				
			break;
			
			case "drag":
			
				var distanceX = 0;
				var distanceY = 0;
				
				addEvent(document,"mousemove",function(e){
					if(self.mouseDown==true){
						self.values= {						
							x: self.getX(e) + distanceX,
							y: self.getY(e) + distanceY
						};
						self.onMove;
					}

				});
				
				addEvent($region,"mousedown",function(e){
					distanceX = ( getStyle($cible,"left") + getStyle($region,"marginLeft")) - self.getX(e); 
					distanceY = ( getStyle($cible,"top") + getStyle($region,"marginTop")) - self.getY(e); 
					self.mouseDown=true;
					self.mouseUp=false;
					self.onUp();
				});
				
				addEvent(document,"mouseup",function(e){
					self.mouseUp=true;
					self.mouseDown=false;
					distanceX = 0;
					distanceY = 0;
					self.onDown();
				});
				
			break;
			
			case "scroll":
			
				addEvent(document,"scroll",function(e){
					var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
					if(!st){
						self.values.y++;
					}else if((st+document.documentElement.clientHeight) >= document.documentElement.scrollHeight ){
						self.values.y--;
					}
				});
				
			break;
			
			case "keyboard":
			
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
		
		this.init = function(){
		
			this.values= {
				x: 0 ,
				y: 0
			};
			
			this.lastPosition= {
				x:self.values.x ,
				y:self.values.y
			};
			
		}
		
		this.getPosition = function () {
		
			return this.values;
			
		}
		
		//output
		this.getValues=function(){
		
			return this.values;
			
		}
}
