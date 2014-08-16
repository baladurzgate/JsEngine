	function Random($coef,$round){ //no Input!
		//engine
		this.type="random"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);

		//coef
		this.coef=$coef;
		this.setCoef = function($c){
			this.coef=$c;
		}
		
		//output
		this.output = 0;
		this.getOutput= function(){
			var calcul = Math.random()*this.coef;
			if($round)calcul=Math.round(calcul);
			this.output=calcul;
			return this.output;
		}
	}