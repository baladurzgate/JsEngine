	function ParticuleSystem (){
	
		//engine
		this.type="particulesystem"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		this.pool = new Array(); 
		this.emitters = new Array();
		this.position = {x:0,y:0};
		var timer = 0; 
		this.tick_rate = 1 ; 
		this.lifespan = {min:100,rand:0}; 
		this.particule_count = 0;
		var self = this;
		
		this.getPosition = function(){
			return this.position;
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
		this.setLifeSpan = function($min,$rand){
			if($rand == undefined )$rand = 0;
			this.lifespan = {min:$min,rand:$rand}; 
		}	
		
		this.inputs = new Array ();
		this.getInputs = function (){
			return this.inputs;
		
		}		
		this.setInput = function ($i,$val){
			this.inputs[$i] = $val;
		
		}
		
		this.global = function (){}	
		this.interaction = function (){}	
		this.birth = function (){}
		this.birth_interaction = function (){}	

		
		var emission_time = 1;
		this.update = function (){
			self.flush();
			timer += self.tick_rate;
			for (var e = 0 ; e < self.emitters.length ; e ++){
				var em = self.emitters[e];
				if ( timer % emission_time == 0 && em.emission_rate !== 0 && self.tick_rate !== 0 ) {
					var emission_rate = em.calculateEmissionRate();
					emission_time = Math.round(1000/emission_rate);
					self.add_Particule(em.emit());							
				}
			}
			for (var i = 0 ; i < self.pool.length ; i ++){
				
				var particule = self.pool[i];
				if(particule.dead == false){
					if(particule.age >= particule.lifespan){
						particule.kill();
					}
					if(particule.age < 1 ){
						if(particule.graphism.sequence !== false){
							particule.graphism.sequence.play('>','start','end',true);
						}
						self.birth(particule,self.inputs);
					}
					self.global(particule,self.inputs);
					for (var j = 0 ; j < self.pool.length ; j ++){
						if(self.pool[i] !== self.pool[j]){
							var other_particule = self.pool[j];
							if(other_particule.dead == false){
								if(particule.age < 1 ){
									self.birth_interaction(particule,other_particule,self.inputs);
								}
								self.interaction(particule,other_particule,self.inputs,i);
							}
						}
					}
					particule.age++;
					particule.graphism.setPosition(particule.mobile.getPosition());
				}
			}

		}
		
	 
		
		this.kill = function (){
		
		}
		
		this.flush  =  function (){
		
			for (var i = 0 ; i < this.pool.length ; i++ ){
				if(this.pool[i].dead == true){
					this.pool.splice(i, 1);
				}
			}
		}
		
		this.getIndex = function ($p){
		
			for (var i = 0 ; i < this.pool.length ; i++ ){
				
				if(this.pool[i].id == $p.id ) {
					
					return i ;
				}
				
			}
		
		}
		
		this.add_Emitter = function ($em){
			this.emitters.push($em);
		}
		
		this.add_Particule = function ($p) {
		
			$p.id = this.particule_count
			$p.lifespan = this.calculate_LifeSpan();
			var p_index = this.pool.push($p);
			return p_index;
			
		}
		
		this.calculate_LifeSpan = function (){
		
			var lifespan = ( Math.random() * self.lifespan.rand ) +  self.lifespan.min;
			return lifespan; 
		
		}

		
		this.activate = function(){	
			var process=EG.getProcessByID(this.serial);
			if(process==false){
				this.process={f:self.update,ID:this.serial,on:true}
				EG.addProcess(this.process);

			}else{
				process.on = true;
			}
			this.activated = true;
		}
		
		this.desactivate = function(){
			var process=EG.getProcessByID(this.serial);
			process.on = false;
			this.activated = false;
		}
		
		this.activate();

	}
