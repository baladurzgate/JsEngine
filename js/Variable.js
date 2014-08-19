	function Variable ($init) { // class Variable ------(called by every class)
		//Engine
		this.type="variable";
		this.engine="";
		this.serial =EG.generateSerial();
		this.val = $init;
	
		this.getOutput = function(){
			return this.val;
		}
		this.setValue = function($v){
			this.val=$v;
		}
	}