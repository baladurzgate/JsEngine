	function Clamp($min,$max){ //pas terminé
		//engine
		this.type="clamp"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);		
		
		//input
		this.input = new Array();
		this.setInput = function($number,$i){
			this.input[$number]=$i;
		}
		//min
		this.range=$range
		this.setRange = function($r){
			this.range = $r;
		}
		//min
		this.range=$range
		this.setRange = function($r){
			this.range = $r;
		}
		//output
		this.output=0;
		this.getOutput = function($line){
			return this.calcul(this.input[$line])
		}
		//calcul
		this.calcul = function ($n){
			return $n/this.max;
		}
	}