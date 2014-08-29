	function Matrix($dimentions){ 
		//engine
		this.type="matrix"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		//input
		this.inputs ={
			x:new Array(),
			y:new Array(),
			z:new Array()
		}
		this.setInput = function($adress,$i){
			info = $adress.split('.');
			var number = info[0];
			var axe = info[1];
			switch($dimentions){
				case '1d':
					this.inputs[$adress]=$i;			
				break;
				case '2d':
					this.inputs[axe][number]=$i;			
				break;
				case '3d':
					this.inputs[axe][number]=$i;	
				break;
			}
		}
		//output
		var self = this;
		this.output='no output';
		this.getOutput= function($number){
			switch($dimentions){
				case '1d':
					var calcul = self.f(this.inputs.x[$number]);
					this.output=calcul;			
				break;
				case '2d':
					var calcul = self.f(this.inputs.x[$number],this.inputs.y[$number]);
					this.output=calcul;			
				break;
				case '3d':
					var calcul = self.f(this.inputs.x[$number],this.inputs.y[$number],this.inputs.z[$number]);
					this.output=calcul;			
				break;
			}
			return this.output;
		}
		this.f = function(){};
	}
