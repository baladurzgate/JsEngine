	function Orbit($center,$arc,$rotation_sens){
	
		//engine
		this.type="orbit"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		
		//input
		this.center = $center;
		this.arcWidth = $arc.h;
		this.arcHeight = $arc.w;
		this.degrees = 0;
		
		this.setCenter = function($o){
		
			this.center=$o;
			
		}
		
		this.setArcWidth = function($aw){
		
			this.arcWidth=$aw;
			
		}
		
		this.setArcHeight = function($ah){
		
			this.arcHeight=$ah;
			
		}
		
		this.setDegrees = function($d){
		
			this.degrees=$d;
			
		}	
		
		this.getDegrees = function (){
		
			return this.degrees;
			
		}
		
		//output
		this.getPosition = function(){
		
			return this.calulatePosition();
			
		}
		
		this.getCenter = function(){
		
			return this.center;
			
		}
		
		//calculs
		this.calulatePosition = function (){
		
			var radians = this.degrees * (Math.PI / 180);
			var sx;
			var sy;
			switch ($rotation_sens){
			
				case 'clockwise':
				
					sx = this.center.x + this.arcWidth * Math.cos(radians);
					sy = this.center.y + this.arcHeight * Math.sin(radians);
					
				break;
				
				case 'anticlockwise':
				
					sx = this.center.x + this.arcWidth * Math.sin(radians);
					sy = this.center.y + this.arcHeight * Math.cos(radians);
					
				break;
				
			}

			return {x:sx,y:sy};
			
		}
	}
