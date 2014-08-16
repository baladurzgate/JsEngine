	function Clock(){
		//engine
		this.type="clock"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);	
		
		this.output=0;
		this.getOutput = function(){
			this.output++;
			return this.output;
		}
	}