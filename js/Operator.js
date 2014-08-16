	function Operator($sign,$value,$round){ // Class Operator ------(called by Connection)	
		//engine
		this.type="operator";
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		//parameters
		this.sign=$sign;
		this.input={x:0,y:0,z:0};
		this.output={x:0,y:0,z:0};
		this.Value = $value;
		this.setInput = function ($channel,$i){
			this.input[$channel]=$i;
		}
		this.setValue = function ($v){
			this.Value=$v;
		}
		this.getValue = function(){
			return this.Value;
		}
		
		//calculs
		this.getOutput= function($channel,$round){
			var output=this.output[$channel];
			var input=this.input[$channel];
			switch (this.sign){
				case "+":
					output = input+this.Value;
				break;
				case "-":
					output = input-this.Value;
				break;
				case "*":
					output = input*this.Value;
				break;
				case "/":
					output = input/this.Value;
				break;
				case "x/":
					output = this.Value/input;
				break;
				case "power":
					output = Math.pow(input,this.Value)
				break;
				case "/power2":
					output = this.Value/Math.pow(input,2)
				break;
				case "squareRoot":
					output = Math.squrt(input*this.Value);
				break;
				case "cos":
					output = Math.cos(input*this.Value);
				break;
				case "sin":
					output = Math.sin(input*this.Value);
				break;
				case "tan":
					output = Math.tan(input*this.Value);
				break;
				case "modulo":
					output = input%this.Value;
				break;
				case "%":
					output = input*(this.Value/100);
				break;
			}
			//controled result
			if($round)output[$channel]=Math.round(output);
			this.output[$channel]=output;
			return output;
		}
		
	}