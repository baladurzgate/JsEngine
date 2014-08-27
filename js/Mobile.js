	function Mobile () { 
		//Engine
		this.type="mobile";
		this.nature="";
		this.engine="";
		this.serial =EG.generateSerial();
		this.position = {x:0,y:0};
		this.speed = {x:0,y:0};
		this.mass = 1;
		this.time = 1;
		this.force = {x:0,y:0};
		this.acceleration = {x:0,y:0};
		this.friction=1;
		this.slowdown=1;
		this.size = {w:1,h:1};
		this.forces = new Array();
		
		this.getPosition = function(){
			return this.position;
		}
		this.getNextPosition = function (){
			return this.calculate_next_position();
		}
		this.getSpeed = function(){
			return this.speed;
		}
		this.getMass = function(){
			return this.mass;
		}
		this.getTime = function(){
			return this.time;
		}
		this.getForce = function(){
			return this.force;
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
		this.setSpeed = function($s){
			this.speed = $s;
		}
		this.setMass = function($m){
			this.mass = $m
		}
		this.setTime = function($t){
			this.time = $t;
		}
		this.setForce = function($f){
			this.force = $f;
		}
		this.setFriction = function($f){
			this.friction = $f;
		}			
		this.addForce = function ($f,$id){
			var existing_force = this.getForceById($id);
			if(existing_force==false) {
				var submit = { 
					x:$f.x,
					y:$f.y,
					id:$id
				};
				this.forces.push(submit);
			}else{
				existing_force.x = $f.x;
				existing_force.y = $f.y;
			}
		}
		this.getForceById = function ($id){
			for(var i = 0 ; i < this.forces.length;i++){
				if(this.forces[i].id == $id){
					return this.forces[i];
					break;
				}
			}
			return false;
		}
		var mobile = this;
		this.calculate_next_position = function(){
		
			mobile.force = {x:0,y:0};
			
			for(var i = 0 ; i < mobile.forces.length;i++){
			
				mobile.force.x += mobile.forces[i].x;
				mobile.force.y += mobile.forces[i].y;
				//mobile.force.x +=-1/ mobile.forces[i].x
				//mobile.force.y +=-1/ mobile.forces[i].y
			}
			
			mobile.acceleration.x = mobile.force.x * (1 / mobile.mass) -(mobile.friction * mobile.speed.x);
			mobile.acceleration.y = mobile.force.y * (1 / mobile.mass) -(mobile.friction * mobile.speed.y);
			mobile.speed.x += mobile.acceleration.x ;
			mobile.speed.y += mobile.acceleration.y ;  
			mobile.position.x += mobile.speed.x ;
			mobile.position.y += mobile.speed.y ;
			
			
		}
		this.activated = false;
		this.process ="";
		
		this.activate = function(){	
			var process=EG.getProcessByID(this.serial);
			if(process==false){
				this.process={f:mobile.calculate_next_position,ID:this.serial,on:true}
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
	}
