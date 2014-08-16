	function Distance($distanceType,$round){ // Class distance ------(called by Connection)
		this.type="distance"
		this.d = new Date();
		this.name=this.d.getTime();
		this.distance=0;
		this.input={A:0,B:0};
		this.setInput = function($point,$i){
			this.input[$point]=$i;
		}
		this.ouput=0;
		this.getOutput = function(){
			var A=this.input.A;
			var B=this.input.B;
			this.output={distance:0,dx:0,dy:0,dz:0}
			switch($distanceType){
				case "1d":
					this.output.distance=this.getDistance1d();
				break;
				case "2d":
					this.output.distance=this.getDistance2d(A,B);
					this.output.dx=this.getDistance1d();
					this.output.dy=this.getDistance1d();
				break;
				case "3d":
					
				break;
			}
			if($round)this.output[$channel]=Math.round(this.output);
			return this.output;
		}
		this.getDistance1d = function (){
			var A=this.input.A;
			var B=this.input.B;
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