	function Force($value,$friction,$round){
		//engine
		this.type="force"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		//this.velocity={x:(Math.random()*3)-1.5,y:(Math.random()*3)-1.5};
		this.velocity={x:0,y:0};
		EG.add(this);
		
		//input
		this.input={x:0,y:0};
		this.setInput=function($i){
			this.input=$i;
		}
		this.setInputX=function($iX){
			this.input.x=$iX;
		}
		this.setInputY=function($iY){
			this.input.y=$iY;
		}
		//value
		this.Value=$value;
		this.setValue = function($v){
			this.Value=$v;
		}
		this.setValueX = function($vX){
			this.Value.x=$vX;
		}
		this.setValueY = function($vY){
			this.Value.y=$vY;
		}
		//friction
		this.friction=$friction;
		this.setFriction = function($f){
			this.friction=$f;
		}
		this.setFrictionX = function($fX){
			this.friction.x=$fX;
		}
		this.setFrictionY = function($fY){
			this.friction.y=$fY;
		}


		//output
		this.output = {x:0,y:0};
		this.getOutput = function(){
			if(this.Value&&this.friction){
				this.velocity.x+=this.Value.x;
				this.velocity.y+=this.Value.y;
				this.velocity.x*=this.friction.x;
				this.velocity.y*=this.friction.y;
				var calculX = this.input.x+this.velocity.x;
				var calculY = this.input.y+this.velocity.y;		
				if($round){calculX=Math.round(calculX)};
				if($round){calculY=Math.round(calculY)};		
				this.output.x=calculX;
				this.output.y=calculY;
				console.log(this.output);
				return this.output;
			}else{
				return false;
			}

		}	
	}