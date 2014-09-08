	function Connection ($objectA,$attrA,$objectB,$attrB,$conserveOffset){ // class connection ------(called by All)
	
		//engine
		this.engine="";
		this.type="connection";
		this.serial=$objectA.serial+$attrA+$objectB.serial+$attrB;
		this.name=$objectA.type+$objectA.serial+$attrA+$objectB.type+$objectB.serial+$attrB;

		//output
		this.A = $objectA;
		this.attrA=$attrA;
		this.valueToPass =0;		
		//input 
		this.B = $objectB;
		this.attrB=$attrB;
		
		this.calculateValueToPass = function(){
			var A=this.A;
			var attr=this.attrA;
			if(A.type){
				switch (A.type){
				
					case "loader":
						switch (attr){
							case "loaded":
								this.valueToPass = A.getLoaded();
							break;						
							case "total":
								this.valueToPass = A.getTotal();
							break;	
							case "%":
								this.valueToPass = A.getPurcentageLoaded();
							break;								
						}		
					break;
					
					case "object":
						var posA = A.getPosition();
						var absPosA = A.getAbsolutePosition();
						var centerA = A.getCenter();
						var absCenterA = A.getAbsoluteCenter();
						switch (attr){
							case "position":
								this.valueToPass = posA;
							break;
							case "x":
								this.valueToPass = posA.x;
							break;
							case "y":
								this.valueToPass = posA.y;
							break;
							case "absoluteposition":
								this.valueToPass = absPosA;
							break;
							case "absoluteX":
								this.valueToPass = absPosA.x;
							break;
							case "absoluteY":
								this.valueToPass = absPosA.y;
							break;
							case "center":
								this.valueToPass = centerA;
							break;
							case "centerX":
								this.valueToPass = centerA.x;
							break;
							case "centerY":
								this.valueToPass = centerA.y;
							break;
							case "absoluteCenter":
								this.valueToPass = absCenterA;
							break;
							case "absoluteCenterX":
								this.valueToPass = absCenterA.x;
							break;
							case "absoluteCenterY":
								this.valueToPass = absCenterA.y;
							break;
							case "alpha":
								var alpha = A.getAlpha();
								this.valueToPass = alpha;
							break;
							case "rotation":
								var rotation = A.getRotation();
								this.valueToPass = rotation;
							break;
							case "width":
								var size = A.getSize();
								this.valueToPass = size.w;
							break;	
							case "height":
								var size = A.getSize();
								this.valueToPass = size.h;
							break;	
							case "scale":
								this.valueToPass = A.getScale();
							break;	
							case "padding":
								 this.valueToPass = A.getPadding();
							break;
							case "margin":
								 this.valueToPass = A.getMargin('all');
							break;
							case "marginTop":
								 this.valueToPass = A.getMargin('top');
							break;
							case "marginBottom":
								 this.valueToPass = A.getMargin('bottom');
							break;
							case "marginLeft":
								 this.valueToPass = A.getMargin('left');
							break;
							case "marginRight":
								 this.valueToPass = A.getMargin('right');
							break;
							case "innerHTML":
								 this.valueToPass = A.getInnerHTML();
							break;							
						}
					break;
					
					case "operator":
						switch (attr){
							case "outputX":
								this.valueToPass = A.getOutput("x");
							break;						
							case "outputY":
								this.valueToPass = A.getOutput("y");
							break;	
							case "outputZ":
								this.valueToPass = A.getOutput("z");
							break;						
							case "value":
								this.valueToPass = A.getValue();
							break;							
						}				
					break;
					
					case "distance":
						var output = A.getOutput();
						switch (attr){	
							case "distance":
								this.valueToPass = output.distance;
							break;		
							case "distanceX":
								this.valueToPass = output.dx;
							break;		
							case "distanceY":
								this.valueToPass = output.dy;
							break;
							case "distanceZ":
								this.valueToPass = output.dz;
							break;							
						}				
					break;
					
					case "angle":
					
						var output = A.getOutput();
						this.valueToPass = output[$attrA];	
						
					break;
					
					case "average":
					
						if($attrA=="output"){
							var output = A.getOutput();
							this.valueToPass = output;	
						}
						
					break;
					
					case "matrix":
					
						this.valueToPass = A.getOutput($attrA);
						
					break;
					
					case "fonction":
					
						this.valueToPass = A.getOutput($attrA);
						
					break;		
					
					case "clamp":
					
						if($attrA=="output"){
							var output = A.getOutput();
							this.valueToPass = output;	
						}
						
					case "limit":
					
						if($attrA=="output"){
							var output = A.getOutput();
							this.valueToPass = output;	
						}

					break;
					
					case "random":
					
						if($attrA=="output"){
							var output = A.getOutput();
							this.valueToPass = output;			
						}
						
					break;
									
					case "orbit":
					
						var position = A.getPosition();
						var center = A.getCenter();
						
						switch ($attrA){
							case "position":
								this.valueToPass = position;
							break;		
							case "x":
								this.valueToPass = position.x;
							break;	
							case "y":
								this.valueToPass = position.y;
							break;	
							case "center":
								this.valueToPass = center;
							break;		
							case "centerX":
								this.valueToPass = center.x;
							break;	
							case "centerY":
								this.valueToPass = center.y;
							break;	
							case "degrees":
								this.valueToPass = A.getDegrees();
							break;									
						}		
						
					break;
					
					case "vector":
					
						var output = A.getOutput("2d");
						
						switch ($attrA){
							case "output":
								this.valueToPass = output;
							break;		
							case "outputX":
								this.valueToPass = output.x;
							break;	
							case "outputY":
								this.valueToPass = output.y;
							break;
						}
						
					break;
					
					case "mobile":
					
						switch ($attrA){
							case "position":
								this.valueToPass = A.getPosition();
							break;		
							case "x":
								this.valueToPass = A.getPosition().x;
							break;
							case "y":
								this.valueToPass = A.getPosition().y;
							break;
							case "width":
								this.valueToPass = A.size.w;
							break;
							case "height":
								this.valueToPass = A.size.h;
							break;
							case "next_position":
								this.valueToPass = A.getNextPosition();
							break;
							case "speed":
								this.valueToPass = A.getSpeed();
							break;	
							case "mass":
								this.valueToPass = A.getMass();
							break;
							case "force":
								this.valueToPass = A.getMass();
							break;
							case "time":
								this.valueToPass = A.getTime();
							break;
						}
						
					break;		
					
					case "clock":
					
						if($attrA=="output"){
							var output = A.getOutput();
							this.valueToPass = output;	
						}			
						
					break;
					
					case "userInput":
					
						switch (connection.A.getInputType()){
							case "mouse":
								var mousePos = A.getValues();
								switch (attr){
									case "x":
										this.valueToPass = mousePos.x;
									break;		
									case "y":
										this.valueToPass = mousePos.y;
									break;	
									case "position":
										this.valueToPass = mousePos;
									break;
									case "absoluteposition":
										this.valueToPass = mousePos;
									break;									
								}
							break;
							
							case "click":
								var mousePos = A.getValues();
								switch (attr){
									case "x":
										this.valueToPass = mousePos.x;
									break;		
									case "y":
										this.valueToPass = mousePos.y;
									break;	
									case "position":
										this.valueToPass = mousePos;
									break;
									case "absoluteposition":
										this.valueToPass = mousePos;
									break;									
								}
								
							case "drag":
								var mousePos = A.getValues();
								switch (attr){
									case "x":
										this.valueToPass = mousePos.x;
									break;		
									case "y":
										this.valueToPass = mousePos.y;
									break;	
									case "position":
										this.valueToPass = mousePos;
									break;
									case "absoluteposition":
										this.valueToPass = mousePos;
									break;									
								}
							break;
							
							case "scroll":
								var mousePos = A.getValues();
								switch (attr){
									case "x":
										this.valueToPass = mousePos.x;
									break;		
									case "y":
										this.valueToPass = mousePos.y;
									break;	
									case "position":
										this.valueToPass = mousePos;
									break;
									case "absoluteposition":
										this.valueToPass = mousePos;
									break;									
								}
							break;
							
							case "keyboard":
								var keyPos = A.getValues();
								switch (attr){
									case "x":
										this.valueToPass = keyPos.x;
									break;		
									case "y":
										this.valueToPass = keyPos.y;
									break;	
									case "position":
										this.valueToPass = keyPos;
									break;
									case "absoluteposition":
										this.valueToPass = keyPos;
									break;									
								}
							break;
						}
					break;
					
					case "slider":
					
						if($attrA=="output"){
						
							var output = A.getOutput();
							this.valueToPass = output;	
							
						}						
					break;
					
					case "indicator":
					
					break;					
					case "action":
					
						this.valueToPass =  A.setAttribute($attrA);
						
					break;
					
					case "sequence":	
					
						attributeName =$attrA.charAt(0).toUpperCase();
						this.valueToPass = A['get'+attributeName]();
						
					break;
					
					case "compare":	
					
						switch ($attrA){
							case "output":
								this.valueToPass =  A.getOutput();	
							break;
						}
					break;
					
					case "trigger":

					break;
					
					case "connection":
					
						switch ($attrA){
							case "status":
								this.valueToPass =  Number(A.activated);	
							break;
						}
						
					break;
					
					case "meter":
					
						var mesure = A.getOutput()
						
						switch ($attrA){
						
							case "vector":
							
								this.valueToPass = mesure.v;
								
							break;
							
							case "number":
							
								this.valueToPass = mesure.n;
								
							break;
							
						}
						
					break;	
					
					case "variable":
					
						switch ($attrA){
							case "output":
								this.valueToPass = A.getOutput();
							break;
						}
						
					break;
					
					case "emitter":
					
						switch ($attrA){
							case "output":
								this.valueToPass = A.getOutput();
							break;
						}
						
					break;
					
				}
			}else{
				switch ($attrA){
					case "value":
						this.valueToPass = A;
					break;
				}
			}
		}
		
		//offset
		this.conserveOffset = $conserveOffset;
		this.offset=0;
		this.calculateOffset = function(){
			var B=this.B;
			var offset=0;
			this.calculateValueToPass();
			switch(B.type){
				case "object":
					var posB = B.getPosition();	
					var alphaB = B.getAlpha();
					var rotB = B.getRotation();
					switch (this.attrB){
						case "x":
							this.offset=posB.x-this.valueToPass;
						break;
						case "y":
							this.offset=posB.y-this.valueToPass;
						break;
						case "alpha":
							this.offset=alphaB-this.valueToPass;
						break;
						case "rotation":
							this.offset=rotB-this.valueToPass;
						break;
					}		
				break
			}
		}			
		
		//update connection;
		var connection = this;			
		this.update = function (){ // where this is replaced by connection
			if(connection.activated){
				if(connection.B){
					connection.calculateValueToPass();
					if(connection.B.type){
						switch (connection.B.type){
						
							case "object":
							
								switch ($attrB){
								
									case "x":
										connection.B.setX(connection.valueToPass+connection.offset);
									break;
									
									case "y":
										connection.B.setY(connection.valueToPass+connection.offset);
									break;
									
									case "position":
										connection.B.setPosition(connection.valueToPass);
									break;
									
									case "alpha":
										connection.B.setAlpha(connection.valueToPass+connection.offset);
									break;
									
									case "size":
										connection.B.setSize(connection.valueToPass);
									break;
									
									case "rotation":
										connection.B.setRotation(connection.valueToPass+connection.offset);
									break;
									
									case "width":
										connection.B.setWidth(connection.valueToPass+connection.offset);
									break;
									
									case "height":
										connection.B.setHeight(connection.valueToPass+connection.offset);
									break;
									
									case "scale":
										connection.B.setScale(connection.valueToPass);
									break;
									
									case "padding":
										connection.B.setPadding(connection.valueToPass);
									break;
									
									case "margin":
										connection.B.setMargin('all',connection.valueToPass);
									break;
									
									case "marginTop":
										connection.B.setMargin('top',connection.valueToPass);
									break;
									
									case "marginBottom":
										connection.B.setMargin('bottom',connection.valueToPass);
									break;
									
									case "marginLeft":
										connection.B.setMargin('left',connection.valueToPass);
									break;
									
									case "marginRight":
										connection.B.setMargin('right',connection.valueToPass);
									break;
									
									case "innerHTML":
										connection.B.setInnerHTML(connection.valueToPass);
									break;
									
								}	
								
							break
							
							case "operator":
							
								switch ($attrB){
									case "inputX":
										connection.B.setInput("x",connection.valueToPass);
									break;
									case "inputY":
										connection.B.setInput("y",connection.valueToPass);
									break;
									case "inputZ":
										connection.B.setInput("z",connection.valueToPass);
									break;						
									case "value":
										connection.B.setValue(connection.valueToPass);
									break;						
								}	
								
							break;
							
							case "distance":
							
								switch ($attrB){
									case "pointA":
										connection.B.setInput("A",connection.valueToPass);
									break;		
									case "pointB":
										connection.B.setInput("B",connection.valueToPass);
									break;								
								}		
								
							break;
							
							case "angle":
							
								switch ($attrB){	
								
									case "pointA":
										connection.B.setInput("A",connection.valueToPass);
									break;	
									
									case "pointB":
										connection.B.setInput("B",connection.valueToPass);
									break;	
									
									case "pointC":
										connection.B.setInput("C",connection.valueToPass);
									break;									
								}		
								
							break;
							
							case "average":
							
								connection.B.setInput($attrB,connection.valueToPass);	
								
							break;
							
							case "matrix":
							
								connection.B.setInput($attrB,connection.valueToPass);
								
							break;
							
							case "particulesystem":
							
								connection.B.setInput($attrB,connection.valueToPass);
								
							break;
							
							case "fonction":
							
								connection.B.setInput($attrB,connection.valueToPass);
								
							break;		
							
							case "clamp":
							
								switch ($attrB){	
								
									case "input":
										connection.B.setInput(connection.valueToPass);
									break;	
									
									case "range":
										connection.B.setRange(connection.valueToPass);
									break;	
									
									case "max":
										connection.B.setMax(connection.valueToPass);
									break;	
									
									case "min":
										connection.B.setMin(connection.valueToPass);
									break;
									
								}		
								
							break;
							
							case "limit":
							
								switch ($attrB){	
								
									case "input":
										connection.B.setInput(connection.valueToPass);
									break;	
									
									case "max":
										connection.B.setMax(connection.valueToPass);
									break;	
									
									case "min":
										connection.B.setMin(connection.valueToPass);
									break;
									
								}		
								
							break;
							
							case "random":
							
								switch ($attrB){	
								
									case "coef":
										connection.B.setCoef(connection.valueToPass);
									break;										
								}				
								
							break;
							
							case "indicator":
							
								switch ($attrB){	
								
									case "input":
										connection.B.setInput(connection.valueToPass);
									break;										
								}
								
							break;			
							
							case "mobile":
							
								switch ($attrB){
								
									case "position":
									
										connection.B.setPosition(connection.valueToPass);	
											
									break;	
									
									case "x":
										connection.B.setX(connection.valueToPass);	
									break;
									
									case "y":
										connection.B.setY(connection.valueToPass);	
									break;			
									
									case "speed":
										connection.B.setSpeed(connection.valueToPass);	
									break;	
									
									case "mass":
										connection.B.setMass(connection.valueToPass);	
									break;	
									
									case "force":
									
										connection.B.addForce(connection.valueToPass,connection.A.serial);	
										
									break;
									
									case "time":
										connection.B.setTime(connection.valueToPass);	
									break;	
								}
								
							break;
							
							case "orbit":
							
								switch ($attrB){
								
									case "center":
										connection.B.setCenter(connection.valueToPass);	
									break;		
									
									case "width":
										connection.B.setArcWidth(connection.valueToPass);	
									break;	
									
									case "height":
										connection.B.setArcHeight(connection.valueToPass);	
									break;	
									
									case "degrees":
										connection.B.setDegrees(connection.valueToPass);	
									break;	
								}
								
							break;
							
							case "vector":
							
								switch ($attrB){
								
									case "pointA":
										connection.B.setInput("A",connection.valueToPass);	
									break;		
									
									case "pointB":
										connection.B.setInput("B",connection.valueToPass);	
									break;	
									
									case "speed":
										connection.B.setSpeed(connection.valueToPass);	
									break;	
								}
								
							break;
							
							case "action":
							
								connection.B.setAttribute($attrB,connection.valueToPass);		
								
							break;
							
							case "sequence":	
							
								switch ($attrB){
									case "currentImage":
										connection.B.setCurrentImage(connection.valueToPass,"normal");
									break;		
									
									case "currentImageLoop":
										connection.B.setCurrentImage(connection.valueToPass,"loop");
									break;	
									
									case "currentImageInverse":
										connection.B.setCurrentImage(connection.valueToPass,"inverse");
									break;							
								}
								
							break;
							
							case "compare":
							
								switch ($attrB){	
								
									case "A":
										connection.B.setInput("A",connection.valueToPass);
									break;		
									
									case "B":
										connection.B.setInput("B",connection.valueToPass);
									break;									
								}				
								
							break;
							
							case "trigger":
							
								switch ($attrB){
								
									case "input":
											connection.B.setInput(connection.valueToPass);
									break;
									
									case "value":
											connection.B.setValue(connection.valueToPass);
									break;
								}
								
							break;
							
							case "connection":
							
								switch ($attrB){
								
									case "status":
										if(connection.valueToPass==0){
											connection.B.activated=false;
										}else{
											connection.B.activated=true;
										}
									break;
								}
								
							break;
							
							case "meter":
							
								switch ($attrB){
								
									case "input":
										connection.B.setInput(connection.valueToPass);
									break;
									
									case "origin":
										connection.B.setOrigin(connection.valueToPass);
									break;
									
								}
								
							break;
							
							case "variable":
							
								switch ($attrB){
									case "input":
										connection.B.setValue(connection.valueToPass);
									break;
								}
								
							break;
							
							case "print":
							
								switch ($attrB){
									case "log":
										console.log(connection.attrA+" = "+connection.valueToPass);
									break;
								}
								
							break;
							
							case "emitter":
								switch ($attrA){
									case "position":
										connection.B.setPosition(connection.valueToPass);
									break;
								}
								
							break;
							
						}
					}else{
						
					}
				}
			}
		}

		this.activated = false;
		this.process ="";
		
		this.activate = function(){	
			var process=EG.getProcessByID(this.serial);
			if(process==false){
				if(this.conserveOffset)this.calculateOffset();
				this.process={f:connection.update,ID:this.serial,on:true}
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
