	function Multiplane($id){  // class Multiplane ------()
		//name 
		this.name = $id;
		this.getName = function (){
			return this.name;
		}
		
		//engine
		this.engine="";
		this.type="multiplane";
		this.serial=this.d.getTime();
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
		
		//container
		this.container = new Object($id);
		this.container.setCSS = "Multiplane";
		this.getContainer = function (){
			return this.container;
		}
		//layers
		this.layers = new Array();
		this.getLayers = function(){
			return this.layers;
		}
		this.getLayerByName = function ($name){
			for(var i = 0 ; i<this.layers;i++){
				if(this.layers[i].name == $name){
					return this.layers[i];
				}
			}
			return false;
		}		
		this.getLayerByIndex = function ($index){
			return this.layers[$index];
		}
		this.addLayer = function ($layer){
			// add a layer to the Multiplane
			if(!this.isInLayers($layer)){
				// check if $layer is not allready added to the Multiplane
				if($layer.parentMultiplane=='none'){
					// check if the layer is not allready added to an other Multiplane
					this.layers.push($layer);	
					$layer.parentMultiplane = this;
					if($layer.container.parent != this.container.E){
						// if the layer's element is not allready attached to the Multiplane's element
						$layer.container.attachTo(this.container.name);
						console.log($layer.name+' attached to : '+this.container.E);
					}else{
						console.log($layer.name+' allready attached to : '+this.container.E);
					}
					$layer.container.setPosition({x:0,y:0});
					$layer.container.setSize({w:this.container.size.w,h:this.container.size.h});
					console.log($layer.name+' added to Multiplane : '+this.name);
					return true;
				}else{
					console.log($layer.name+' : layer allready added to Multiplane : '+$layer.parentMultiplane.name);
				}
			}
			console.log($layer.name+' : layer allready added to Multiplane : '+this.name);
			return false;
		}
		this.addLayers = function ($layers){
			// take an Array of layers;
			var addedLayers = new Array() //layers successfully added to the Multiplane
			for (var i = 0;i<$layers.length;i++){
				if(this.addLayer($layers[i])){
					addedLayers.push$layers[i];
				}
			}
		}
		this.isInLayers = function ($layer){
			var match = 0; 
			for(var j = 0 ; j<this.layers.length;j++){
				if (this.layers[j]==$layer&&this.layers[j].getName()==$layer.getName()){
					match++;
				}
			}
			if(match==0){
				return false;
			}
			return true;
		}
		this.buildLayersFromDOM = function (){
			// create layers according to the dom
			 var layerDivs = this.container.E.getElementsByClassName('layer');
			 // create a Layer for each divs in the Multiplane's element with the className 'layer' and add it to the Multiplane
			 for (var i = 0;i<layerDivs.length;i++){
				var nLayer = new Layer(layerDivs[i].id);
				nLayer.buildFromDOM();
				this.addLayer(nLayer);
			 }
		}
		
		//Camera
		this.camera = new Camera(this.name+'.camera');
		this.cameraMove = function ($coords,$duration){
			//take an object ={x:0,y:0} and a duration 
			var X=$coords.x
			var Y=$coords.y
			var d=$duration;
			console.log('CAMERA_MOVE : ('+this.camera.name+') move to :('+X+'.'+Y+') in '+d+' seconds');
			var animation = new ActionQueue(this.name+'.actionQueue');
			for(var i = 0 ; i < this.layers.length;i++){
				var level = this.layers[i].getLevel();
				var distanceCoef = 1/(level/10);
				var nX = X*distanceCoef;
				var nY = Y*distanceCoef;
				this.layers[i].container.animation.kill();
				this.layers[i].container.animation.add(new Action(this.layers[i].container,'translate',{x:nX,y:nY},d));
				//add the movement to the layer's container and alter it according to the layer's level on the multiplane
				animation.add(new Action(this.layers[i].container,'startAnimation','',0));
			}
			animation.add(new Action(this.camera.container,'translate',{x:X,y:Y},d));
			return animation;
		}	
		
		//actor
		this.getActorByName = function ($name){
			console.log('searching for '+$name+' in '+this.name);
			for (var l = 0; l<this.layers.length;l++){
				console.log('looking inside '+this.layers[l].name);
				for(var a = 0; a<this.layers[l].actors.objects.length;a++){
					console.log('considering '+this.layers[l].actors.objects[a].name);
					if(this.layers[l].actors.objects[a].name==$name){
						console.log('find : '+this.layers[l].actors.objects[a].name);
						return this.layers[l].actors.objects[a];
					}
				}
			}
			console.log($name+' not found');
			return false;
		}
	}