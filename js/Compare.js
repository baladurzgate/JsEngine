	function Compare($sign){
		//engine
		this.type="compare"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		//sign
		this.sign=$sign;
		
		//input
		this.input={A:'',B:''};
		this.setInput=function($side,$i){
			this.input[$side]=$i;
		}	

		//output
		this.output=0;
		this.getOutput= function(){
			if(this.compareAB(this.input.A,this.input.B)){
				this.output=1;
			}else{
				this.output=0;
			}
			return this.output;
		}
		//calcul
		this.compareAB = function($A,$B){
			var result = 0;
			switch(this.sign){
				case "==":
					result = $A==$B;
				break;
				case "!=":
					result = $A!=$B;
				break;
				case "<=":
					result = $A<=$B;
				break;
				case ">=":
					result = $A>=$B;
				break;
				case "<":
					result = $A<$B;
				break;
				case ">":
					result = $A>$B;
				break;
			}
			return result;
		}		
		
	
	}
