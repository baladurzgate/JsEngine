	function Object ($id) { // class Object ------(called by every class)
		
		//Engine
		
		this.type="object";
		this.engine="";
		this.serial =EG.generateSerial();
		this.name = "";
	
		// name
	
		if($id!==null){
		
			this.name=$id; 
			
		}else{
		
			this.name=this.serial;
		}
		
		this.getName = function (){ 
			return this.name;
		}
		
		// DOM
		
		this.E="";
		this.parent="";
		
		if(document.getElementById(this.name)){	
		
			// if the object is allready in the DOM (name)
			this.E = document.getElementById(this.name)
			// the parent is set as the parentNode
			this.parent = this.E.parentNode;
			
		}else{
		
			// a DIV is created with the id=name of the object
			this.E=document.createElement("DIV");
			this.E.id=this.name;
		};
		
		this.attachTo = function ($id){	
		
			// append(and remove from former parentNode) the object's DIV to the element with the $id searched and set it as the parent 
			var element =  this.E;
			var oldParent = element.parentNode;
			var newParent = document.getElementById($id);
			
			if(oldParent!=newParent){
			
				if(oldParent!=null){
				
					this.parent.parentNode.removeChild(element);
				}
				
				this.parent = newParent;
				this.parent.appendChild(element); 
				return true;
			}
			return false;
		}
		
		//sequence 
		this.sequence = false;
		
		this.buildFromDOM= function(){
		
			var testPositionX=this.E.getElementsByClassName('posX')[0];
			var testPositionY=this.E.getElementsByClassName('posY')[0];
			
			if(testPositionX&&testPositionY){
			
				var nX=parseFloat(testPositionX.value);
				var nY=parseFloat(testPositionY.value);
				this.setPosition({x:nX,y:nY});
				console.log(this.name+' position set from DOM >>('+nX+':'+nY+')');
				
			}
			
			if(this.E.getElementsByClassName('sequence').length>0){
				console.log('has a sequence');
				this.sequence = new Sequence();
				this.sequence.parentObject = this;
				this.sequence.buildFromDOM();
			}
		}
		
		this.buildFromDOM();
		

		
		// CSS
		
		this.style=this.E.style;
		
		this.getCSS= function (){
		
			return this.E.className;
		}

		this.setCSS = function ($CSS){
		
			this.E.className = $CSS;
		}
		
		this.setColor = function($color){
		
			this.style.backgroundColor = $color
		}	
		
		this.setAlpha = function($a){
		
			this.style.opacity = $a;
			
			var alpha=this.getAlpha()
			
			if(alpha==0.1){
			
				this.hide();
				
			}else if(alpha>0.1){
			
				this.show();
			}
		}	
		
		this.getAlpha = function(){
		
			var a=getStyle(this.E,"opacity");
			
			return a;
		}	
		
		this.setAbsolute = function (){
		
			this.style.position = "absolute";
		}
		
		// position
		
		this.position = {x:0,y:0};  
		
		this.getPosition = function (){
		
			var position = {
			
				x : getStyle(this.E,"left"),
				
				y : getStyle(this.E,"top")
				
			};
			
			return position;
		}	
		
		this.getAbsolutePosition = function (){
		
			var position={x:0,y:0};
			
			position=cumulativeOffset(this.E);
			return position;
		}
		
		this.getCenter = function (){
		
			var position=this.getPosition()
			
			var size=this.getSize();
			
			var center={
					x:position.x+(size.w/2),
					y:position.y+(size.h/2)
			}
			
			return center;
		}
		
		this.getAbsoluteCenter = function (){
		
			var position=this.getAbsolutePosition()
			
			var size=this.getSize();
			
			var center={
					x:position.x+(size.w/2),
					y:position.y+(size.h/2)
			}
			
			return center;
		}
		
		this.setX = function ($X){
		
			//this.style.left=$X;
			setStyle(this.E,"left",$X);
			
			this.position.x=$X;
			
		}
		
		this.setY = function ($Y){
		
			//this.style.top=$Y;
			setStyle(this.E,"top",$Y);
			
			this.position.y=$Y;
			
		}
		
		this.setPosition = function ($newPosition){
		
			this.setX($newPosition.x);
			this.setY($newPosition.y);
			
		}
		
		//initialise la position
		this.setPosition({
		
			x : getStyle(this.E,'left'),
			 
			y : getStyle(this.E,'top')
			
		});
		
		//rotation
		this.rotation = 0;
		
		this.getRotation = function(){
			return this.rotation;
		
		}
		
		this.getTransform = function(){
		
			var el = document.getElementById("i-am-rotated");
			
			var st = window.getComputedStyle(el, null);
			
			var tr = st.getPropertyValue("-webkit-transform") ||
			st.getPropertyValue("-moz-transform") ||
			st.getPropertyValue("-ms-transform") ||
			st.getPropertyValue("-o-transform") ||
			st.getPropertyValue("transform") ||
			"Either no transform set, or browser doesn't do getComputedStyle";		
			
		}
		
		this.getCssRotation = function(){
		
			return getRotationDegrees(this.E)
		}
		
		this.setRotation = function ($deg){
		
			this.E.style.webkitTransform = 'rotate('+$deg+'deg)'; 
			this.E.style.mozTransform    = 'rotate('+$deg+'deg)'; 
			this.E.style.msTransform     = 'rotate('+$deg+'deg)'; 
			this.E.style.oTransform      = 'rotate('+$deg+'deg)'; 
			this.E.style.transform       = 'rotate('+$deg+'deg)'; 
			this.rotation = $deg;
		}
		
		this.pivot = 'top left';
		
		this.setPivot = function($pivot){
		
			this.E.style.transformOrigin       = $pivot;
			this.E.style.webkitTransformOrigin = $pivot; 
			this.E.style.mozTransformOrigin    = $pivot; 
			this.E.style.msTransformOrigin     = $pivot; 
			this.E.style.oTransformOrigin      = $pivot; 
			this.E.style.TransformOrigin       = $pivot; 
			this.pivot = $pivot;
		}
		
		// size
		this.size = {w:0,h:0}; 
		
		this.getSize = function (){
		
			var size={w:getStyle(this.E,"width"),h:getStyle(this.E,"height")};
			
			return size;
		}	
		
		var size_init = this.getSize();
		
		var fraction = size_init.w/size_init.h;
		
		this.setScale = function ($s){
		
			var size=size_init;
			
			setStyle(this.E,"width",(size.h * fraction) * $s); 
			setStyle(this.E,"height",(size.w / fraction) * $s);
		}	
		
		this.getWidth = function (){
		
			return getStyle(this.E,"width");
		}	
		
		this.setSize= function ($newSize){
		
			this.size = $newSize; 
			setStyle(this.E,"width",$newSize.w);
			setStyle(this.E,"height",$newSize.h);
			
		}
		
		this.setWidth= function ($w){
		
			var size={w:$w,h:getStyle(this.E,"height")}; 
			
			this.setSize(size);
		}
		
		this.setHeight= function ($h){
		
			var size={w:getStyle(this.E,"width"),h:$h}; 
			
			this.setSize(size);
			
		}	
		
		this.setPadding = function ($p){
		
			setStyle(this.E,"padding",$p);
		}			
		
		this.setMargin = function ($side,$m){
		
			switch($side){
			
				case "all":
					setStyle(this.E,"margin" , $m);
				break;
				case "top" : 
					setStyle(this.E,"marginTop" , $m);
				break;
				case "bottom" : 
					setStyle(this.E,"marginBottom" , $m);
				break;
				case "left" : 
					setStyle(this.E,"marginLeft" , $m);
				break;
				case "right" : 
					setStyle(this.E,"marginRight" , $m);
				break;
				
			}
			
		}
		this.getMargin = function ($side){
		
			switch($side){
			
				case "all" :
					return getStyle(this.E,"margin");
				break;
				case "top" : 
					return getStyle(this.E,"marginTop");
				break;
				case "bottom" : 
					return getStyle(this.E,"marginBottom");
				break;
				case "left" : 
					return getStyle(this.E,"marginLeft");
				break;
				case "right" : 
					return getStyle(this.E,"marginRight");
				break;
				
			}
			
		}		
		this.setInnerHTML = function ($ih){
		
			this.E.innerHTML = $ih;
		}

		// visibility 
		this.hidden=false;
		
		this.isHidden= function (){
		
			return this.hidden;
			
		}
		
		this.show= function (){
		
			setStyle(this.E,"display","block");
			this.hidden = false;
		}
		
		this.hide= function (){
		
			setStyle(this.E,"display","none");
			this.hidden = true;
		}	
		
		this.hide();
		
		// animation 
		this.animation = new ActionQueue(this.name+'.actionQueue');
		
		this.getAnimation = function (){
		
			return this.animation;
		}
		
		this.fadeIn = function (){
		
			this.animation.kill();
			this.animation.add(new Action(this,'fade','in',0.2));
		}
		
		this.fadeOut = function (){
		
			this.animation.kill();
			this.animation.add(new Action(this,'fade','out',0.2));
		}


		
		//image
		this.image = new Image();
		
		
		// content
		this.addHTML = function ($html){
			this.E.innerHTML = $html;
		}	
		
		this.show();
		
		this.dead = false;
		
		this.kill = function (){
			
			this.dead = true;
			this.hide();
			this.animation.kill();
			if(this.sequence!==false){
				this.sequence.kill();
			}
			this.parent.removeChild(this.E);
			
			var connections = EG.getConnections(this);
			for (var i = 0 ; i < connections ; i ++){
				if(connections[i].A!==this){
					related_connectionsA = EG.getConnections(connections[i].A);
					for (var a = 0 ; a < related_connections ; a ++){
						related_connections[a].desactivate();
					}
				}
				if(connections[i].B!==this){
					related_connectionsB = EG.getConnections(connections[i].B);
					for (var b = 0 ; b < related_connections ; b ++){
						related_connections[b].desactivate();
					}
				}
				connections[i].desactivate();
			}
			
			EG.removeFromOutliner(this);
		
		}
		
		return 0;
	}
