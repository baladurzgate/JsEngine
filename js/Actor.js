	function Actor ($id){  // class Actor ------(called by Multiplane)
		//name 
		this.name = $id;
		this.getName = function (){
			return this.name;
		}
		
		//Engine
		this.engine="";
		this.type="actor";
		this.serial=this.d.getTime();
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
		
		//container
		this.container = new Object($id);
		this.container.setCSS = "actor";
		this.getContainer = function (){
			return this.container;
		}
		//layer
		this.parentLayer = "none";
		this.setParentLayer = function ($layer){
			this.parentLayer = $layer;
		}
		//position 
		this.buildFromDOM = function(){
			var testPositionX=this.container.E.getElementsByClassName('posX')[0];
			var testPositionY=this.container.E.getElementsByClassName('posY')[0];
			if(testPositionX&&testPositionY){
				var nX=parseFloat(testPositionX.value);
				var nY=parseFloat(testPositionY.value);
				this.container.setPosition({x:nX,y:nY});
				console.log(this.name+' position set from DOM >>('+nX+':'+nY+')');
			}
			this.container.imageSequence.buildFromDOM();

		}
		//animation
		this.playAnimation = function (){
			this.container.animation.play();
		}		
		this.StopAnimation = function (){
			this.container.animation.stop();
		}
		this.addAction = function ($action){
			$action.object = this.container
			this.container.animation.add($action);
		}		
		this.loopAnimation = function (){
			this.container.animation.loop();
		}
	}