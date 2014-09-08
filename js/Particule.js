	function Particule ($id,$mobile,$graphism,$lifespan){
	
		//engine
		this.type="particule";
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		this.id = $id;
		this.mobile = $mobile;
		this.graphism = $graphism;
		this.lifespan = $lifespan;
		this.age = 0;
		this.dead = false;
		this.emitter = '';
		this.bonus_data = new Array();
		
		this.kill = function (){
		
			this.dead = true;
			this.graphism.kill();
			this.mobile.kill();
			EG.removeFromOutliner(this);
			
		}
		
		this.maturity = 0 ; 
		
		this.getMaturity = function (){
		
			var maturity = this.age / this.lifespan ;
			return maturity;
		 
		}
		
		this.life = 0 ; 
		
		
		this.getLifeLeft = function (){
		
			var lifeLeft = 1 - ( this.age / this.lifespan ) ;
			return lifeLeft;
		 
		}
	}
