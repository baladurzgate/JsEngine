	function Object ($id) { // class Object ------(called by every class)
		//Engine
		this.type="object";
		this.engine="";
		this.serial =EG.generateSerial();
		EG.add(this);
	
		// name
	
		if($id!==null){
			this.name=$id; 
		}else{
			this.name=this.serial;
		}
		this.getName = function (){ 
			return this.name;
		}
		console.log('[new object >>>> '+this.name);
		
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
		this.buildFromDOM= function(){
			this.imageSequence.buildFromDOM();
			var testPositionX=this.E.getElementsByClassName('posX')[0];
			var testPositionY=this.E.getElementsByClassName('posY')[0];
			if(testPositionX&&testPositionY){
				var nX=parseFloat(testPositionX.value);
				var nY=parseFloat(testPositionY.value);
				this.setPosition({x:nX,y:nY});
				console.log(this.name+' position set from DOM >>('+nX+':'+nY+')');
			}
		}
		
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
			var coords = {
				x:getStyle(this.E,"left"),
				y:getStyle(this.E,"top")
			};
			return coords;
		}	
		this.getAbsolutePosition = function (){
			var coords={x:0,y:0};
			coords=cumulativeOffset(this.E);
			return coords;
		}
		this.getCenter = function (){
			var coords=this.getPosition()
			var size=this.getSize();
			var center={
					x:coords.x+(size.w/2),
					y:coords.y+(size.h/2)
			}
			return center;
		}
		this.getAbsoluteCenter = function (){
			var coords=this.getAbsolutePosition()
			var size=this.getSize();
			var center={
					x:coords.x+(size.w/2),
					y:coords.y+(size.h/2)
			}
			return center;
		}
		this.setPosition = function ($newPosition){
			this.position = $newPosition; 
			this.style.top=$newPosition.y;
			this.style.left=$newPosition.x;
		}
		this.setX = function ($X){
			this.style.left=$X;
			this.position.x=$X;
		}
		this.setY = function ($Y){
			this.style.top=$Y;
			this.position.y=$Y;
		}
		this.setPosition({x:0,y:0});
		
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
		this.setPivot = function($pivot){
			this.E.style.transformOrigin=$pivot;
		}
		// size
		this.size = {w:0,h:0}; 
		this.getSize = function (){
			var size={w:getStyle(this.E,"width"),h:getStyle(this.E,"height")};
			return size;
		}	
		this.getWidth = function (){
			return getStyle(this.E,"width");
		}	
		this.setSize= function ($newSize){
			this.size = $newSize; 
			this.style.width=$newSize.w;
			this.style.height=$newSize.h;
			
		}
		this.setWidth= function ($w){
			var size={w:$w,h:getStyle(this.E,"height")}; 
			this.setSize(size);
		}
		this.setHeight= function ($h){
			var size={w:getStyle(this.E,"width"),h:$h}; 
			this.setSize(size);
			
		}		
		// visibility 
		this.hidden=false;
		this.isHidden= function (){
			return this.hidden;
		}
		this.show= function (){
			this.style.display='block';
			this.hidden = false;
		}
		this.hide= function (){
			this.style.display='none'
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

		//imageSequence 
		this.imageSequence = new ImageSequence();
		this.imageSequence.parentObject = this;
		
		//image
		this.image = new Image();
		
		
		// content
		this.addHTML = function ($html){
			this.E.innerHTML = $html;
		}		
		console.log('---------]');
		return 0;
	}