	function Limit($dimension,$min,$max){ 
	
		//engine
		this.type="limit"
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
		this.setMax = function($m){
			this.max=$m;
		}		
		this.setMin = function($m){
			this.min=$m;
		}
		
		//output
		this.output=0;
		this.getOutput = function(){
			return this.calcul(this.input)
		}
		
		//calcul
		this.calcul = function ($n){
			var n = $n;
			var result = 0;
			switch($dimension){
				case '1d':
					if(n>this.max){
					
						n = this.max;
					}
					if(n<this.min){
					
						n = this.min;
					}
					result = n;
				break;
				case '2d':
					if(n.x>this.max.x||n.y>this.max.y){
					
						n = this.max;
						
					}
					if(n<this.min||n.y<this.min.y){
					
						n = this.min;
						
					}				
					result = n;	
				break;
			}
			return result;
		}
	}
