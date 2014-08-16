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
		this.input={A:[0,0,0],B:[0,0,0]};
		this.setInput=function($side,$index,$i){
			this.input[$side][$index]=$i;
		}	

		//output
		this.output=0;
		this.getOutput= function($line){
			if($line=="all"){
				var notTrue=0;
				for(var i = 0;i<this.input.A.length;i++){
					if(this.input.B[i]){
						if(!this.compareAB(this.input.A[i],this.input.B[i])){
							notTrue++
						}
					}
				}
				if(notTrue==0){
					this.output=1;
				}else{
					this.output=0;
				}
			}else{
				if(this.compareAB(this.input.A[$line],this.input.B[$line])){
					this.output=1;
				}else{
					this.output=0;
				}
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