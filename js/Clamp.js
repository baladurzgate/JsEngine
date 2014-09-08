	function Clamp($dimension,$min,$max,$range,$round){ 
	
		//engine
		this.type="clamp"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		this.min = $min;
		this.max = $max;
		this.range = $range;
		EG.add(this);		
		
		//input
		this.input = new Array();
		
		this.setInput = function($i){
			this.input=$i;
		}
		
		this.setRange = function($r){
			this.range=$r;
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
		this.getLimit = function(){
			
		}
		
		//calcul
		this.calcul = function ($n){
			var n = $n;
			var result = 0;
			
			switch($dimension){
			
				case '1d':
				
					result = ( ( n - this.min ) / this.max ) * this.range;
					
				break;
				case '2d':					
					result = {
					
						x : ( ( n.x - this.min.x ) / this.max.x ) * this.range.x,
						y : ( ( n.y - this.min.y ) / this.max.y ) * this.range.y
						
					}					
				break;
			}
			
			if($round){
			
				return Math.round(result);
				
			}
			
			return result;
			
		}
	}
