	function Action($values){  // class Action -----(called by ActionQueue)
		//engine
		this.d = new Date();
		this.serial =this.d.getTime();
		EG.add(this);
	
		//parameters
		this.type="action";
		this.values = $values;
		this.status='ready';
		this.object = this.values.object;
		this.getobject = function (){
			return this.values.object;
		}		
		this.getType = function (){
			return this.values.actionType;
		}		
		this.getValues = function() {
			return this.values;
		}		
		this.setValues = function($v){
			this.values = $v
		}
		this.getAttribute = function($a){
			return this.values[$a];
		}
		this.setAttribute = function($a,$v){
			this.values[$a] = $v;
		}
		this.getduration = function() {
			return this.values.duration;
		}
		this.getStatus = function() {
			return this.status;
		}
		this.setStatus = function($status) {
			this.status=$status;
		}
		
	}	