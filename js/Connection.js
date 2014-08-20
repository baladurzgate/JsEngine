	function Connection ($objectA,$attrA,$objectB,$attrB,$conserveOffset){ // class connection ------(called by All)
		//engine
		this.engine="";
		this.type="connection";
		this.serial=EG.generateSerial();
		this.name=$objectA.serial+$attrA+$objectB.serial+$attrB;
		this.name='variable'+$attrA+$objectB.serial+$attrB;
		console.log(this.name);
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
					case "preloader":
						var output=A.getOutput();
						this.valueToPass = output[attr];	
					break;
					case "object":
						var posA = A.getPosition();
						var absPosA = A.getAbsolutePosition();
						var centerA = A.getCenter();
						var absCenterA = A.getAbsoluteCenter();
						switch (attr){
							case "coords":
								this.valueToPass = posA;
							break;
							case "x":
								this.valueToPass = posA.x;
							break;
							case "y":
								this.valueToPass = posA.y;
							break;
							case "absoluteCoords":
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
					case "clamp":
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
					case "force":
						var output = A.getOutput();
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
									case "coords":
										this.valueToPass = mousePos;
									break;
									case "absoluteCoords":
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
									case "coords":
										this.valueToPass = mousePos;
									break;
									case "absoluteCoords":
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
									case "coords":
										this.valueToPass = keyPos;
									break;
									case "absoluteCoords":
										this.valueToPass = keyPos;
									break;									
								}
							break;
						}
					break;
					case "action":
						this.valueToPass =  A.setAttribute($attrA);
					break;
					case "imageSequence":				
						attributeName =$attrA.charAt(0).toUpperCase();
						this.valueToPass = A['get'+attributeName]();
					break;
					case "compare":	
						if($attrA=="all"){
							this.valueToPass = A.getOutput("all");	
						}else{
							this.valueToPass = A.getOutput($attrA);	
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
					case "variable":
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
				if(connection.A&&connection.B){
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
										//console.log(connection.valueToPass);
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
							case "clamp":
								connection.B.setInput(connection.valueToPass);												
							break;
							case "random":
								switch ($attrB){	
									case "coef":
										connection.B.setCoef(connection.valueToPass);
									break;										
								}											
							break;
							case "action":
								connection.B.setAttribute($attrB,connection.valueToPass);									
							break;
							case "force":
								switch ($attrB){	
									case "input":
										connection.B.setInput(connection.valueToPass);	
									break;		
									case "inputX":
										connection.B.setInputX(connection.valueToPass);	
									break;	
									case "inputY":
										connection.B.setInputY(connection.valueToPass);	
									break;	
									case "value":
										connection.B.setValue(connection.valueToPass);	
									break;
									case "valueX":
										connection.B.setValueY(connection.valueToPass);	
									break;
									case "valueY":
										connection.B.setValueX(connection.valueToPass);	
									break;
									case "friction":
										connection.B.setFriction(connection.valueToPass);	
									break;		
									case "frictionX":
										connection.B.setFrictionX(connection.valueToPass);	
									break;	
									case "frictionY":
										connection.B.setFrictionY(connection.valueToPass);	
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
							case "imageSequence":	
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
								var data=$attrB.split('.');
								switch (data[0]){	
									case "A":
										connection.B.setInput("A",parseInt(data[1]),connection.valueToPass);
									break;		
									case "B":
										connection.B.setInput("B",parseInt(data[1]),connection.valueToPass);
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
							case "variable":
								switch ($attrB){
									case "input":
										connection.B.setValue(connection.valueToPass);
									break;
								}
							break;
						}
					}else{
						switch ($attrB){
							case "value":
								connection.B = connection.valueToPass;
							break;
							case "log":
								connection.B = connection.valueToPass;
								console.log(connection.B);
							break;
						}
					}
				}
			}
		}

		// activate-desactivate
		this.activated = false;
		this.process ="";
		this.activate = function(){	
			if(!this.activated){	
				this.activated=true;
				if(this.conserveOffset)this.calculateOffset();
				this.process={f:connection.update,ID:this.serial,on:true}
				EG.addProcess(this.process);
			}
		}
		this.desactivate = function(){
			if(this.activated){
				this.activated=false;
				var process=EG.getProcessByID(this.serial);
				EG.removeProcess(process);
			}
		}
	}