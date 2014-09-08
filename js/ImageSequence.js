	function Sequence (){ // class sequence ------ (called by Object)
	
		//engine
		this.type="sequence";
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.process;
		
		//images
		this.images = new Array();
		this.getImages = function (){
			return this.images;
		}
		
		this.getCurrentImage = function (){
			return this.currentImage;
		}
		
		var self = this;
		this.setCurrentImage = function ($i,$mode){
			var L = self.images.length;
			var i = Math.round($i);	
			switch($mode) {
				case "normal":
					if(i>L)i=L-1;
				break;
				case "loop":
					i = Math.round($i-(Math.floor($i/L)*L));						
				break
				case "inverse":
					i = Math.round(L-$i);
					if(i<0)i=0;
				break;
				case "inverseLoop":
					i = Math.round(L-i);
				break;
			}
			self.displayImage(i);
		}
		
		this.addImage = function ($image){
			this.images.push($image);
		}

		//frames
		this.frames = new Array();
		
		//navigation 
		this.interval = false;
		
		//lecture
		this.frameRate=12;
		this.from = 0;
		this.to = 0;
		this.speed = 1;
		this.loop = false;
		this.currentFrame = 0;
		this.timer=0;
		
		this.onComplete= function(){
			console.log("Complete");
		};
		
		this.play = function ($way,$from,$to,$loop){
		
			if(this.images.length>1){
			
					console.log("play");
					this.way=$way;
					this.from = $from;
					if($from == "start") this.from = 0;
					if($from == "end") this.from = this.images.length+1;
					if($from == "current") this.from = this.currentFrame;
					this.to = $to;
					if($to == "start") this.to = 0;
					if($to == "end") this.to = this.images.length+1;
					this.speed = this.frameRate*1000;
					this.loop = $loop;
					this.currentFrame = this.from;
					this.interval="";
					this.timer=0;
					if(this.from!=this.to){
						this.process={f:self.updateFrame,ID:self.serial,on:true};
						EG.addProcess(this.process);
						console.log("setInterval : " +this.interval);
						console.log(this.way);
						console.log(this.timer);
					}else{
						return false;
					}
					this.displayImage(this.currentFrame);
					return true;
					
			}else{
				return false;
			}
		}
		
		this.stop = function (){
			window.clearInterval(this.interval);
			this.interval=false;
			this.onComplete= function(){
				console.log("Complete");
			};
		}
		
		this.init = function(){
			this.currentFrame=0;
			this.displayImage(0);
		}
		
		this.updateFrame = function (){	
				var L=self.images.length;
			if(self.timer%4/self.frameRate==0){
				switch (self.way){
					// play backward
					case '<':
						if(self.currentFrame!=self.to){	
							if(self.currentFrame<=0){
								self.currentFrame = L;
							}
							self.currentFrame-=1;
						}else{
							if(self.loop){
								self.currentFrame=self.from;
							}else{
								self.onComplete();
							}
						}	
					break;
					// play foward
					case '>':
						if(self.currentFrame!=self.to){	
							self.currentFrame+=1;
							if(self.currentFrame>=L){
								self.currentFrame = 0;
							}
						}else{
							if(self.loop){
								self.currentFrame=self.from;
							}else{
								self.onComplete();
							}
						}
					break;
				}
				self.displayImage(self.currentFrame);
			}
			self.timer++;
		}
		
		this.displayImage = function($index){
			if(this.images[$index]!==undefined){
				this.images[$index].style.display = 'block';
				for(var i = 0 ; i<this.images.length; i++){
					if(i!=$index){
						this.images[i].style.display='none';
					}
				}
			}
		}
		
		//DOM
		this.parentObject ="";
		this.container = "";
		this.buildFromDOM =  function(){
			var div = this.parentObject.E.getElementsByClassName('sequence');
			if(div.length>=1){
				this.container = div[0];
				var images = getChildrensOf(div);
				if(images.length!=0){
					for (var i = 0 ; i < images.length ; i++){
						this.addImage(images[i]);
					}
				}
			this.displayImage(0);
			this.container.style.display='block';
			}
		}
	}
