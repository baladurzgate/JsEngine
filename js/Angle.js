	function Angle($round){
	
		//engine
		this.type="angle"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		//input
		this.input = {A:0,B:0,C:0};
		this.setInput = function($point,$i){
			this.input[$point]=$i;
		}
		
		//output
		this.output = {angle:0,angleInRadian:0};
		this.getOutput= function(){
			var calcul = this.get2pointsAngle();
			this.output.angleInRadian=calcul 
			this.output.angle=calcul *(180/Math.PI);
			if($round)this.output.angle[$channel]=Math.round(this.output.angle);
			return this.output;
		}
		
		//calculs
		this.get2pointsAngle= function(){
			var A=this.input.A;
			var B=this.input.B;
			var angleRadians = Math.atan2(B.y - A.y, B.x - A.x);
			return angleRadians;

		}
		this.get3pointsAngle= function(){
			var A=this.input.A;
			var B=this.input.B;
			var C=this.input.C;		
			if(C==0)C={x:B.x,y:B.y+100};
			var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
			var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
			var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
			var theta=Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
			return theta;
		}
	}