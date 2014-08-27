	function Vector($speed,$round){
		//engine
		this.type="vector"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		//input
		this.input={A:{x:0,y:0},B:{x:0,y:0}};
		this.setInput = function($point,$i){
			if($i==NaN)$i={x:0,y:0};
			this.input[$point]=$i;
		}
		//speed
		this.speed=$speed;
		this.setSpeed = function($s){
			this.speed=$s;
		}
		//ouput
		this.ouput={x:0,y:0};
		
		this.getOutput = function(){
			if(this.speed==0){this.speed=1;}
			if(this.speed&&this.input){
				var A=this.input.A;
				var B=this.input.B;
				var dx=this.getDistance1d(A.x,B.x)
				var dy=this.getDistance1d(A.y,B.y)
				var D=this.getDistance2d(A,B);
				if(D!==0){
					var T=D/this.speed;
					this.output={
						x:dx/T,
						y:dy/T
					}
				}
				return this.output;
			}
			return {x:0,y:0};
		}	
		this.getDistance1d = function ($A,$B){
			var A=$A;
			var B=$B;
			var result=B-A;
			//if(result<0)result*=-1;
			return result;
		}
		this.getDistance2d = function($point1, $point2){
			var xs = 0;
			var ys = 0;			 
			xs = $point2.x - $point1.x;
			xs = xs * xs;			 
			ys = $point2.y - $point1.y;
			ys = ys * ys;		 
			return Math.sqrt( xs + ys );
		}
	}
