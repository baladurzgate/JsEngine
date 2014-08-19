	function Clamp($min,$max){ //pas terminé
		//engine
		this.type="clamp"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		this.min = $min;
		this.max = $max;
		EG.add(this);		
		
		//input
		this.input = new Array();
		this.setInput = function($i){
			this.input=$i;
		}
		//output
		this.output=0;
		this.getOutput = function(){
			return this.calcul(this.input)
		}
		//calcul
		this.calcul = function ($n){
			if($n>this.min&&$n<this.max ){
				return $n;
			}else{
				return 1;
			}
		}
	}