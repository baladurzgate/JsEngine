	function Trigger($sign,$value,$do,$cooldown){ // Class Trigger ------(called by Connection)	
		//engine
		this.type="trigger";
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.coolDown=$cooldown;
		this.engine="";
		EG.add(this);
		
		//parameters
		this.Value = $value;
		this.input=0;
		this.ticker=0;
		this.done=false;
		this.setInput = function ($i){
			this.input=$i;
			if(this.done==false){
				if(this.ticker==this.coolDown||this.coolDown=="once"){
					switch($sign){
						case "==":
							if($i==this.Value){
								if(this.coolDown!=="once"){
									this.ticker=0;
								}else{
									this.done=true;
								}
								$do();
							}				
						break;
						case ">":
							if($i>this.Value){
								if(this.coolDown!=="once"){
									this.ticker=0;
								}else{
									this.done=true;
								}
								$do();
							}				
						break;
						case "<":
							if($i<this.Value){
								if(this.coolDown!=="once"){
									this.done=false;
									this.ticker=0;
								}else{
									this.done=true;
								}
								$do();
							}				
						break;				
					}
				}else{
					this.ticker++;
				}
			}
		}
		this.setValue = function ($v){
			this.Value=$v;
		}
		this.getValue = function(){
			return this.Value;
		}
		
	}