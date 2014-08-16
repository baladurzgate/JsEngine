	function Layer ($id){   // class Layer ------(called by Multiplane) 
		//name 
		this.name = $id;
		this.getName = function (){
			return this.name;
		}
		
		//engine
		this.engine="";
		this.type="layer";
		this.serial=this.d.getTime();
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
		
		//container
		this.container = new Object($id);
		this.container.setCSS = "layer";
		this.getContainer = function (){
			return this.container;
		}
		//Actors
		this.actors = new ObjectGroup();
		this.getActors = function(){
			return this.actors;
		}
		this.addActors = function ($actors){
			//take an array of actors;
			for(var i = 0;i<$actors.length;i++){
				this.addActor($actors[i]);
			}
		}		
		this.addActor = function ($actor){
			//take an actor
			if(!this.actors.isInGroup($actor)){

				if($actor.parentLayer=='none'){
					$actor.setParentLayer(this);
					this.actors.addObject($actor);
					if($actor.container.parent!=this.container.E){
						$actor.container.attachTo(this.name);
						console.log($actor.name+' attached to : '+this.container.E);
					}
					console.log($actor.name+' added to layer : '+this.name);
					
				}else{
					console.log($actor.name+' : actor allready added to layer : '+$actor.parentLayer.name);
				}

				return true;
			}
			return false;
		}
		this.buildFromDOM = function(){
			// create actors according to the dom
			 var actorDivs = this.container.E.getElementsByClassName('actor');
			 // create a Actor for each divs in the Layer's element with the className 'actor' and add it to the Layer
			 for (var i = 0;i<actorDivs.length;i++){
				var nActor = new Actor(actorDivs[i].id);
				nActor.buildFromDOM();
				this.addActor(nActor);
			 }
		}
		
		//parentMultiplane
		this.parentMultiplane = "none";
		
		//animation 
		
		//level 
		this.level = 1;
		this.getLevel = function () {
			return this.level;
		}
		this.distanceToCamera = "";
		var testdistanceToCamera=this.container.E.getElementsByClassName('distanceToCamera')[0];
		if(testdistanceToCamera){
			this.distanceToCamera = testdistanceToCamera;
			this.level = parseFloat(this.distanceToCamera.value);
		}else{
			var newDistanceToCamera = document.createElement('input');
			this.container.E.appendChild(newDistanceToCamera);
			this.distanceToCamera = newDistanceToCamera;
			this.distanceToCamera.className = 'distanceToCamera';
			this.distanceToCamera.value = this.level;
		}
		this.setLevel = function ($level) {
			this.level=$level;
		}
		
		
	}