	function Emitter($model,$position,$size){
	
		//engine
		this.type="emitter"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		this.position = $position;
		this.size = $size;
		this.emission_rate_random = 10;
		this.emission_rate = 10;
		var timer = 0; 
		this.tick_rate = 1 ; 
		this.speed_coef = 1;
		this.model = $model;
		var emitter = this;
		
		this.particule_system = "";
		
		this.getPosition = function(){
			return this.position;
		}
		
		this.getSize = function($s){
			return this.size;
		}
		
		this.getSpeed = function(){
			return this.speed;
		}

		this.setPosition = function($p){
			this.position = $p;
		}
		
		this.setX = function($p){
			this.position.x = $p;
		}
		
		this.setY = function($p){
			this.position.y = $p;
		}
		
		this.setInitialSpeed = function($s){
			this.speed_coef = $s;
		}

		this.setSize = function($s){
			this.size= $s;
		}		
		
		this.setEmissionRate = function($er){
		
			this.emission_rate = $er;
			
		}	
		
		this.setEmissionRateRandom = function($err){
		
			this.emission_rate_random = $err;
		}

		this.calculateEmissionRate = function (){
		
			var err =( Math.random() * this.emission_rate_random ) - this.emission_rate_random / 2;
			var er = this.emission_rate + err;
			if(er < 0 ) er = 0 ; 
			return er;
		
		}
		
		this.force = {x:0,y:0};
		this.random = {min:{x:0,y:0},max:{x:0,y:0}};
		
		this.setForce = function ($f,$r){
	
			this.force = $f;
			
		}
		
		this.setRandom = function ($min,$max){
			
			this.random = {min:$min,max:$max};
			
		}		
		 this.emit = function (){
		 
			var mobile = add_Mobile();
			mobile.addForce(emitter.calculateForce(),this.serial);
			mobile.setPosition (emitter.calculatePosition());

			var graphism = clone_(this.model);
			var p = new Particule (0,mobile,graphism,0);
			p.emitter = this;
			return p;
		 }
		 
		this.calculateForce = function(){
		
			var rX = ( Math.random() * this.random.max.x ) + this.random.min.x;
			var rY = ( Math.random() * this.random.max.y ) + this.random.min.y;
			
			var force = {
			
				x: ( this.force.x + ( ( Math.random() * rX ) - ( rX / 2 ) ) ) * this.speed_coef ,
				
				y: ( this.force.y + ( ( Math.random() * rY ) - ( rY / 2 ) ) ) * this.speed_coef
			
			}
			
			return force;
			
		
		}		 
		
		
		this.calculatePosition= function(){
			
			var position = {
			
				x:emitter.position.x + ( Math.random() * emitter.size.w ),
				y:emitter.position.y + ( Math.random() * emitter.size.h )
			
			};
			
			return position;
			
		
		}

	}
