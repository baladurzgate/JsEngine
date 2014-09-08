	function Meter($quantity,$origin,$jumps,$smooth){
	
		//engine
		this.type="meter"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		this.origin = $origin;
		this.values = new Array();
		this.origin_values = new Array();
		this.mesures = new Array();
		var K = this.origin_values.length;
		var L = this.values.length;
		var l = this.mesures.length;
		


		
		this.setInput = function($i){
		
			L = this.values.unshift($i);
			
			if(L>$jumps){
			
				this.values.pop();
				
			}			
			
		}

		for (var j = 0 ; j < $jumps ; j ++){
			
			if(this.values.length<$jumps){
				if( $quantity == '1dSpeed' ){
					this.setInput(0);
				}else{
					this.setInput({x:0,y:0});
				}
			}
			
		}
		
		this.setOrigin = function($o){
		
			K = this.origin_values.unshift($o);
			
			if(K>$jumps){
			
				this.origin_values.pop();
				
			}
			
		}	
		
		for (var i = 0 ; i < $jumps ; i ++){
			
			this.setOrigin(this.origin);
			
		}


		
		this.getOutput = function(){
		
			return this.calulatePosition();
			
		}
		
		//calculs
		this.calulatePosition = function (){
		
			var V = 0;
			var N = 0;
			
			if(this.values[0]=='undefinded'){
				if( $quantity == '1dSpeed' ){
					this.values[0]=0;
				}else{
					this.values[0]={x:0,y:0};
				}
			}
			
			var now = {
				v:this.values[0],
				o:this.origin_values[0]
			}
			
			var before = {
				v:this.values[$jumps-1],
				o:this.origin_values[$jumps-1]
			};
			
			var vx = now.v.x - before.v.x ;
			var vy = now.v.y - before.v.y ;
			var ox = now.o.x - before.o.x ;
			var oy = now.o.y - before.o.y ;
			var dx = ox - vx ;
			var dy = oy - vy ;
			
			switch ($quantity){
			
				case '1dSpeed':
				
					N = (now.v - before.v) - this.origin;
					
				break;
				
				case '2dSpeed':
				
					V = {
					
						x : dx,
						y : dy
						
					}
					
					N = Math.sqrt( ( dx * dx ) + ( dy * dy ) );
					
				break;
				
				case 'direction' : 
				
					V = {
					
						x : dx,
						y : dy
						
					}
				
					N = Math.atan2( dy , dx ) * ( 180 / Math.PI );
					
				break;
				
				case 'position' : 
				
					V = {
					
						x : now.o.y - now.v.y,
						y : now.o.x - now.v.x
						
					}
					
					N = 0;
					
				break;				
				
			}
			
			
				
			var mesure = {
			
				v : V,
				n : N
				
			}			
			
			this.mesures.unshift(mesure);
			
			if(l>$smooth){
			
				this.mesures.pop();
				
			}
			
			l = this.mesures.length;
			
			var Vsum = {x:0,y:0};
			var Nsum = 0;
			
			for (var i = 0 ; i < l ; i++){
			
				var m = this.mesures[i];
				Vsum.x += m.v.x ;
				Vsum.y += m.v.y ;
				Nsum += m.n ;
				
			}
			
			var average_V = {x:Vsum.x / l, y:Vsum.y / l} ;
			var average_N = 0;
			
			if($quantity !== 'direction'){
			
				average_N = Nsum / l ;
				
			}else{

				average_N = Nsum / l ;
			}
			
			var output = {
			
				v : average_V,
				n : average_N,
				
			}		
			
			return output;
			
		}
	}
