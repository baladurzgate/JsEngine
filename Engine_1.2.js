	//WebEngine by Alexandre Cormier (bighal.cormier@gmail.com)
	//Beta v1.2;

	
	// CLASSES :
	
	function Engine(){ // Mother Class
	
		//outliner
		this.outliner = {
			all:new Array(),
			preloader:new Array(),
			object:new Array(),
			panel:new Array(),
			UI:new Array(),
			actor:new Array(),
			layer:new Array(),
			multiplane:new Array(),
			camera:new Array(),
			connection:new Array(),
			operator:new Array(),
			distance:new Array(),
			angle:new Array(),
			average:new Array(),
			random:new Array(),
			compare:new Array(),
			force:new Array(),
			vector:new Array(),
			clock:new Array(),
			userInput:new Array(),
			imageSequence:new Array(),
			imageLoader:new Array(),
			actionQueue:new Array(),
			action:new Array()
		};
		var self = this;
		this.lastSerial=0;
		this.generateSerial = function(){
			this.lastSerial++;
			return this.lastSerial;
		}
		
		// Outliner Manipulations
		this.add = function($thing){
			if($thing.engine==""){
				$thing.engine=this;
				if($thing.type){
					switch ($thing.type){
						case "connection":
							$thing.activate();
						break;
					}
					this.outliner[$thing.type].push($thing);	
				}
				this.outliner.all.push($thing);
			}
			return $thing;
		};
		this.removeFromOutliner = function($thing){
			if($thing.engine){
				if(this.outliner[$thing.type].splice(this.getIndexFromType($thing),1)&&this.outliner.all.splice(this.getIndexFromAll($thing),1)){
					return true;
				}
			}
			return false;
		}
		this.remove = function($thing){	
			if($thing.engine){
				var RC=this.getRelatedConnections($thing);
				for(var i=0;i<RC.length;i++){
					RC[i].desactivate();
					this.removeFromOutliner(RC[i]);
				}	
				if(this.removeFromOutliner($thing)){
					return $thing;
				};
			}
			return false;
		}
		this.getIndexFromType = function($thing){
			if($thing.engine){
				if($thing.type){
					for (var i = 0;i<this.outliner[$thing.type].length;i++){
						if(this.outliner[$thing.type][i]==$thing)return i;
					}
				}
			}
			return false
		}
		this.getIndexFromAll = function($thing){
			if($thing.engine){
					for (var i = 0;i<this.outliner.all.length;i++){
						if(this.outliner.all[i]==$thing)return i;
					}
			}
			return false;
		}
		this.getRelatedConnections = function($thing){
			var listOfRelatedConnections = new Array();
			for (var i = 0;i<this.outliner.connection.length;i++){
				var pickedConnection = this.outliner.connection[i];
				if(pickedConnection.A.object == $thing || pickedConnection.B.object == $thing){
					listOfRelatedConnections.push(pickedConnection);
				}
			}
			return listOfRelatedConnections;
		}
		
		
		//objects
		this.clone = function ($thing,$newId){
			if($thing.type){
				switch($thing.type){
					case "object" : 
						var ElementToClone=$thing.E.cloneNode(true);
						ElementToClone.id = $newId;
						var parent = getParentElement($thing.E);
						parent.appendChild(ElementToClone);	
						var nObject = new Object($newId);	
						nObject.setCSS(ElementToClone.className);
						nObject.buildFromDOM();
						return nObject;
					break;
				}
			
			}
			return false
		}
		this.getObjectByName = function($name){
			for(var i = 0;i<this.outliner.all.length;i++){
				if(this.outliner.all[i].name==$name){
					return this.outliner.all[i];
					break;
				}
			}
			return false;
		}
		
		//processes
		this.processes = new Array();
		this.addProcess = function($process){
			// $process should look like {f:function,ID:#####,on:true}
			$process.on=true;
			this.processes.push($process);
			if(this.processes.length==1){
				this.startMainLoop();
			}
			return $process
		}
		this.removeProcess = function($process){
			$process.on=false;
			return this.processes.splice(this.getProcessIndex($process),1);
		}
		this.findProcess=function($process){
			for (var i = 0;i<this.processes.length;i++){
				var process = this.processes[i];
				if(process==$process){
					return true;	
					break;
				}
			}
			return false;
		}
		this.getProcessByID = function($ID){
			for (var i = 0;i<this.processes.length;i++){
				var process = this.processes[i];
				if(process.ID==$ID){
					return process;	
					break;
				}
			}
			return false;
		}
		this.getProcessIndex = function($process){
			for (var i = 0;i<this.processes.length;i++){
				var process = this.processes[i];
				if(process==$process)return i;
				break;
			}
			return false;
		}
		this.interval = "";
		this.startMainLoop = function (){
			this.interval = setInterval(function(){self.mainLoop();},1);
		}
		this.mainLoop = function(){
			//console.log('mainLoop');
			for (var i = 0;i<this.processes.length;i++){
				var process = this.processes[i];
				if(process.on){
					process.f();
				}
			}
		}
	
	}
	//---------VARIABLE GLOBALE EG-------------
	var EG=new Engine();
	//-----------------------------------------
	function Preloader($id,$onComplete){
		//engine
		this.engine="";
		this.type="preloader";
		this.serial=EG.generateSerial();
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
		
		//DOM
		this.name=$id;

		//elements
		this.elementsToLoad=[];
		this.loadedElements=0;
		this.numberOfLoadedElements=0;
		
		//images
		this.imagesToLoad=[];
		this.loadedImages=[]
		this.numberOfLoadedImages=0;
		
		//load
		this.loadAll = function(){
			console.log(this.name+'>>loadAll');
			this.loadByTagNames(['img']);
		}
		this.loadByTagNames= function($tagNames){
			console.log(this.name+'>>loadByTagNames '+$tagNames);
			console.log(this.elementsToLoad);
			for(var a=0;a<$tagNames.length;a++){
				var nonFilteredElements=document.getElementsByTagName($tagNames[a]);
				var elements=this.filterElements(nonFilteredElements);
				console.log(elements);
				switch($tagNames[a]){
					case 'img':
						//addElementsToArray(elements,this.elementsToLoad);
						this.loadImages(elements);
					break;
					case 'video':
						//addElementsToArray(elements,this.elementsToLoad);
					break;
				}
			}
			console.log(this.elementsToLoad);
		}
		this.filterElements = function ($elements){
			var elements=(typeof $elements!="object")? [$elements] : $elements
			var filteredElements=[];
			if(elements){
				if(elements.length>0){
					for (var i=0;i<elements.length;i++){
						if(!this.elementsAllreadyLoaded(elements[i])&&!this.elementWaitingToLoad(elements[i])){
							filteredElements.push(elements[i]);
						}
					}
					return filteredElements;
				}else{
					console.log(elements.length);
					return false;
				}
			}else {
				console.log(elements);
				return false;
			
			}

		}
		this.elementAllreadyLoaded= function ($e){
			for(var i=0;i<this.loadedElements.length;i++){
				if(this.loadedElements[i]==$e){
					return true;
					break;
				}
			}
			return false;
		}
		this.elementWaitingToLoad= function ($e){
			for(var i=0;i<this.elementsToLoad.length;i++){
				if(this.elementsToLoad[i]==$e){
					return true;
					break;
				}
			}
			return false;
		}
		this.loadImages = function($arrayOfImages){
			console.log($arrayOfImages);
			var arrayOfImages=(typeof $arrayOfImages!="object")? [$arrayOfImages] : $arrayOfImages

			console.log(this.name+'>>loadImages '+arrayOfImages+'L:'+arrayOfImages.length);
			console.log(arrayOfImages);
			this.imagesToLoad=arrayOfImages;
			//var preloader = this;
			var newImages=new Array();


			for (var l=0; l<arrayOfImages.length; l++){
				console.log(l);
				/*newImages[i]=new Image();
				newImages[i].src=this.imagesToLoad[i];
				console.log('loading '+newImages[i]);
				newImages[i].onload=function(){
					preloader.elementLoadPost('img');
					newImages[i].style.display='block';
					preloader.loadedElements.push(newImages[i]);
				}
				newImages[i].onerror=function(){
					preloader.elementLoadPost('img');
					alert('error');
				}*/


			}			
			console.log(newImages);

		}
		this.elementLoadPost = function ($type){
			this.numberOfLoadedImages++;
			this.numberOfLoadedElements++;
			switch($typesArr[a]){
				case 'img':
					console.log(this.numberOfLoadedElements);

				break;
			}
			if (this.numberOfLoadedElements==this.elementsToLoad.length){
				console.log('loading complete');
			}
			
		}
		//output
		this.output=0
		this.getOutput= function(){
			var output={
				dataLoaded:this.numberOfLoadedElements,
				dataToLoad:this.elementsToLoad.length,
				pourcentageLoaded:(this.numberOfLoadedElements/this.elementsToLoad.length)*100
			}
			this.output=output;
			return this.output;
		}	
	}
	function UserInput($inputType){ // class userInput------ (allow to catch Mouse and Keyboard inputs)
	
		//engine
		this.engine="";
		this.type="userInput";
		this.serial=EG.generateSerial();
		this.name=$inputType;
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
		
		//input
		this.inputType=$inputType;
		this.getInputType = function(){return this.inputType}
		
		//values
		this.values={};
		var self=this;	
		switch(this.inputType){
			case "mouse":
				addEvent(document,"mousemove",function(e){
					self.values= {
						x:e.clientX+document.documentElement.scrollLeft ,
						y:e.clientY+document.body.scrollTop
					};
				});
			break;
		}
		
		//output
		this.getValues=function(){
			return this.values;
		}
	}
	function Connection ($objectA,$attrA,$objectB,$attrB,$conserveOffset){ // class connection ------(called by All)
		//engine
		this.engine="";
		this.type="connection";
		this.serial=EG.generateSerial();
		this.name=this.serial;
		
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
								this.cvalueToPass = rotation;
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
					case "connection":
						switch ($attrA){
							case "status":
								this.valueToPass =  Number(A.activated);	
							break;
						}
					break;
				}
			}else{
				switch ($attrA){
					case "variable":
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
										connection.B.setAlpha(connection.valueToPass+connection.offset);
									break;
									case "rotation":
										connection.B.setRotation(connection.valueToPass+connection.offset);
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
						}
					}else{
						switch ($attrA){
							case "variable":
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
				/*console.log(this.process)
				console.log("["+this.A.type+"."+this.A.name+"("+$attrA+")]---->[("+$attrB+")"+this.B.type+"."+this.B.name+"]")
				console.log('connection activated');*/
			}
		}
		this.desactivate = function(){
			if(this.activated){
				this.activated=false;
				var process=EG.getProcessByID(this.serial);
				EG.removeProcess(process);
				/*console.log(this.process);
				console.log("["+this.A.type+"."+this.A.name+"("+$attrA+")]---->[("+$attrB+")"+this.B.type+"."+this.B.name+"]")
				console.log('connection desactivated');*/
			}
		}
	}
	function Operator($sign,$value,$round){ // Class Operator ------(called by Connection)	
		//engine
		this.type="operator";
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		//parameters
		this.sign=$sign;
		this.input={x:0,y:0,z:0};
		this.output={x:0,y:0,z:0};
		this.Value = $value;
		this.setInput = function ($channel,$i){
			this.input[$channel]=$i;
		}
		this.setValue = function ($v){
			this.Value=$v;
		}
		this.getValue = function(){
			return this.Value;
		}
		
		//calculs
		this.getOutput= function($channel,$round){
			var output=this.output[$channel];
			var input=this.input[$channel];
			switch (this.sign){
				case "+":
					output = input+this.Value;
				break;
				case "-":
					output = input-this.Value;
				break;
				case "*":
					output = input*this.Value;
				break;
				case "/":
					output = input/this.Value;
				break;
				case "x/":
					output = this.Value/input;
				break;
				case "power":
					output = Math.pow(input,this.Value)
				break;
				case "squareRoot":
					output = Math.squrt(input*this.Value);
				break;
				case "cos":
					output = Math.cos(input*this.Value);
				break;
				case "sin":
					output = Math.sin(input*this.Value);
				break;
				case "tan":
					output = Math.tan(input*this.Value);
				break;
				case "modulo":
					output = input%this.Value;
				break;
				case "%":
					output = input*(this.Value/100);
				break;
			}
			//controled result
			if($round)output[$channel]=Math.round(output);
			this.output[$channel]=output;
			return output;
		}
		
	}
	function Distance($distanceType,$round){ // Class distance ------(called by Connection)
		this.type="distance"
		this.d = new Date();
		this.name=this.d.getTime();
		this.distance=0;
		this.input={A:0,B:0};
		this.setInput = function($point,$i){
			this.input[$point]=$i;
		}
		this.ouput=0;
		this.getOutput = function(){
			var A=this.input.A;
			var B=this.input.B;
			this.output={distance:0,dx:0,dy:0,dz:0}
			switch($distanceType){
				case "1d":
					this.output.distance=this.getDistance1d();
				break;
				case "2d":
					this.output.distance=this.getDistance2d(A,B);
					this.output.dx=this.getDistance1d();
					this.output.dy=this.getDistance1d();
				break;
				case "3d":
					
				break;
			}
			if($round)this.output[$channel]=Math.round(this.output);
			return this.output;
		}
		this.getDistance1d = function (){
			var A=this.input.A;
			var B=this.input.B;
			var result=B-A;
			//if(result<0)result*=-1;
			return result;
		}
		this.getDistance2d = function($point1, $point2){
			var xs = 0;
			var ys = 0;			 
			xs = $point2.x - $point1.x;
			xs = xs * xs;			 
			ys = $point2.y - $point1.y;
			ys = ys * ys;		 
			return Math.sqrt( xs + ys );
		}
		
	
	}
	function Angle($round){
	
		//engine
		this.type="angle"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		//input
		this.input = {A:0,B:0,C:0};
		this.setInput = function($point,$i){
			this.input[$point]=$i;
		}
		
		//output
		this.output = {angle:0,angleInRadian:0};
		this.getOutput= function(){
			var calcul = this.get2pointsAngle();
			this.output.angleInRadian=calcul 
			this.output.angle=calcul *(180/Math.PI);
			if($round)this.output.angle[$channel]=Math.round(this.output.angle);
			return this.output;
		}
		
		//calculs
		this.get2pointsAngle= function(){
			var A=this.input.A;
			var B=this.input.B;
			var angleRadians = Math.atan2(B.y - A.y, B.x - A.x);
			return angleRadians;

		}
		this.get3pointsAngle= function(){
			var A=this.input.A;
			var B=this.input.B;
			var C=this.input.C;		
			if(C==0)C={x:B.x,y:B.y+100};
			var AB = Math.sqrt(Math.pow(B.x-A.x,2)+ Math.pow(B.y-A.y,2));    
			var BC = Math.sqrt(Math.pow(B.x-C.x,2)+ Math.pow(B.y-C.y,2)); 
			var AC = Math.sqrt(Math.pow(C.x-A.x,2)+ Math.pow(C.y-A.y,2));
			var theta=Math.acos((BC*BC+AB*AB-AC*AC)/(2*BC*AB));
			return theta;
		}
	}
	function Average($averageType,$numOfDec,$round){ 
		//engine
		this.type="average"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		//input
		this.input = new Array();
		this.setInput = function($number,$i){
			this.input[$number]=$i;
		}
		//output
		this.output = 0;
		this.getOutput= function(){
			var calcul =0;
			switch($averageType){
				case "average":
					calcul = this.getAverage();
				break;
				case "variance":
					calcul = this.getVariance();
				break;				
				case "deviation":
					calcul = this.getDeviation();
				break;
			}
			if($round)calcul=Math.round(calcul);
			this.output=calcul;
			return this.output;
			
		}
		//calculs
		var numArr = this.input;
		this.getAverage = function($numOfDec ){
			var i = numArr.length, 
				sum = 0;
			while( i-- ){
				sum += numArr[ i ];
			}
			return getNumWithSetDec( (sum / numArr.length ), $numOfDec );
		}
		this.getVariance = function(numOfDec ){
			var avg = this.getAverage( numArr, $numOfDec ), 
				i = numArr.length,
				v = 0;
		 
			while( i-- ){
				v += Math.pow( (numArr[ i ] - avg), 2 );
			}
			v /= numArr.length;
			return getNumWithSetDec( v, numOfDec );
		}
		this.getDeviation = function($numOfDec ){
			var stdDev = Math.sqrt( this.getVariance( numArr, $numOfDec ) );
			return getNumWithSetDec( stdDev, $numOfDec );
		};
	}
	function Clamp($min,$max){ //pas terminé
		//engine
		this.type="clamp"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);		
		
		//input
		this.input = new Array();
		this.setInput = function($number,$i){
			this.input[$number]=$i;
		}
		//min
		this.range=$range
		this.setRange = function($r){
			this.range = $r;
		}
		//min
		this.range=$range
		this.setRange = function($r){
			this.range = $r;
		}
		//output
		this.output=0;
		this.getOutput = function($line){
			return this.calcul(this.input[$line])
		}
		//calcul
		this.calcul = function ($n){
			return $n/this.max;
		}
	}
	function Blend($range){
	
	}
	function Random($coef,$round){ //no Input!
		//engine
		this.type="random"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);

		//coef
		this.coef=$coef;
		this.setCoef = function($c){
			this.coef=$c;
		}
		
		//output
		this.output = 0;
		this.getOutput= function(){
			var calcul = Math.random()*this.coef;
			if($round)calcul=Math.round(calcul);
			this.output=calcul;
			return this.output;
		}
	}
	function Compare($sign){
		//engine
		this.type="compare"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		//sign
		this.sign=$sign;
		
		//input
		this.input={A:[0,0,0],B:[0,0,0]};
		this.setInput=function($side,$index,$i){
			this.input[$side][$index]=$i;
		}	

		//output
		this.output=0;
		this.getOutput= function($line){
			if($line=="all"){
				var notTrue=0;
				for(var i = 0;i<this.input.A.length;i++){
					if(this.input.B[i]){
						if(!this.compareAB(this.input.A[i],this.input.B[i])){
							notTrue++
						}
					}
				}
				if(notTrue==0){
					this.output=1;
				}else{
					this.output=0;
				}
			}else{
				if(this.compareAB(this.input.A[$line],this.input.B[$line])){
					this.output=1;
				}else{
					this.output=0;
				}
			}
			
			return this.output;

		}
		//calcul
		this.compareAB = function($A,$B){
			var result = 0;
			switch(this.sign){
				case "==":
					result = $A==$B;
				break;
				case "!=":
					result = $A!=$B;
				break;
				case "<=":
					result = $A<=$B;
				break;
				case ">=":
					result = $A>=$B;
				break;
				case "<":
					result = $A<$B;
				break;
				case ">":
					result = $A>$B;
				break;
			}
			return result;
		}		
		
	
	}
	function Force($value,$friction,$round){
		//engine
		this.type="force"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		
		//input
		this.input={x:0,y:0};
		this.setInput=function($i){
			this.input=$i;
		}
		this.setInputX=function($iX){
			this.input.x=$iX;
		}
		this.setInputY=function($iY){
			this.input.y=$iY;
		}
		//value
		this.Value=$value;
		this.setValue = function($v){
			this.Value=$v;
		}
		this.setValueX = function($vX){
			this.Value.x=$vX;
		}
		this.setValueY = function($vY){
			this.Value.y=$vY;
		}
		//friction
		this.friction=$friction;
		this.setFriction = function($f){
			this.friction=$f;
		}
		this.setFrictionX = function($fX){
			this.friction.x=$fX;
		}
		this.setFrictionY = function($fY){
			this.friction.y=$fY;
		}


		//output
		this.output = {x:0,y:0};
		this.getOutput = function(){
			if(this.Value&&this.friction){
				this.Value.x*=this.friction.x;
				this.Value.y*=this.friction.y;
				var calculX = this.input.x+this.Value.x;
				var calculY = this.input.y+this.Value.y;		
				if($round){calculX=Math.round(calculX)};
				if($round){calculY=Math.round(calculY)};		
				this.output.x=calculX;
				this.output.y=calculY;
				return this.output;
			}else{
				console.log("force"+this.Value&&this.friction);
				return false;
			}

		}	
	}
	function Vector($speed,$round){
		//engine
		this.type="vector"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		//input
		this.input={A:{x:0,y:0},B:{x:0,y:0}};
		this.setInput = function($point,$i){
			this.input[$point]=$i;
		}
		//speed
		this.speed=$speed;
		this.setSpeed = function($s){
			this.speed=$s;
		}
		//ouput
		this.ouput={x:0,y:0,timeLeft:10};
		this.getOutput = function(){
			if(this.speed&&this.input){
				var A=this.input.A;
				var B=this.input.B;
				var dx=this.getDistance1d(A.x,B.x)
				var dy=this.getDistance1d(A.y,B.y)
				var D=this.getDistance2d(A,B);
				var T=D/this.speed;
				this.output={
					x:dx/T,
					y:dy/T
				}
				return this.output;
			}else{
				console.log("vector wrong arguments:"+(this.speed&&this.input));
				return false;
			}
		}	
		this.getDistance1d = function ($A,$B){
			var A=$A;
			var B=$B;
			var result=B-A;
			//if(result<0)result*=-1;
			return result;
		}
		this.getDistance2d = function($point1, $point2){
			var xs = 0;
			var ys = 0;			 
			xs = $point2.x - $point1.x;
			xs = xs * xs;			 
			ys = $point2.y - $point1.y;
			ys = ys * ys;		 
			return Math.sqrt( xs + ys );
		}
	}
	function Clock(){
		//engine
		this.type="clock"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);	
		
		this.output=0;
		this.getOutput = function(){
			this.output++;
			return this.output;
		}
	}
	function Object ($id) { // class Object ------(called by every class)
		//Engine
		this.type="object";
		this.engine="";
		this.serial =EG.generateSerial();
		EG.add(this);
	
		// name
		this.name=$id; 
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
				x:getStyle(this.E,"marginLeft"),
				y:getStyle(this.E,"marginTop")
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
			this.style.marginTop=$newPosition.y;
			this.style.marginLeft=$newPosition.x;
		}
		this.setX = function ($X){
			this.style.marginLeft=$X;
			this.position.x=$X;
		}
		this.setY = function ($Y){
			this.style.marginTop=$Y;
			this.position.y=$Y;
		}
		this.setPosition({x:0,y:0});
		
		//rotation
		this.rotation = 0;
		this.getRotation = function(){
			return this.rotation;
		
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
		
		// size
		this.size = {w:0,h:0}; 
		this.getSize = function (){
			return this.size;
		}	
		this.setSize= function ($newSize){
			this.size = $newSize; 
			this.style.width=$newSize.w;
			this.style.height=$newSize.h;
			
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
	function ImageSequence (){ // class ImageSequence ------ (called by Object)
		//engine
		this.type="imageSequence";
		this.serial=EG.generateSerial();
		this.name=this.serial;
		
		//images
		this.images = new Array();
		this.getImages = function (){
			return this.images;
		}
		this.getCurrentImage = function (){
			return this.currentImage;
		}
		this.setCurrentImage = function ($i,$mode){
			var L = this.images.length;
			var i = Math.round($i);	
			switch($mode) {
				case "normal":
					if(i>L)i=L-1;
				break;
				case "loop":
					i = Math.round($i-(Math.floor($i/L)*L));				
				break
				case "inverse":
					i = Math.round(L-$i);
					if(i<0)i=0;
				break;
				case "inverseLoop":
					i = Math.round(L-i);
				break;
			}

			this.displayImage(i);
		}
		this.addImage = function ($image){
			this.images.push($image);
		}

		//frames
		this.frames = new Array();
		
		//navigation 
		this.interval = false;
		
		//lecture
		this.frameRate=25;
		this.from = 0;
		this.to = 0;
		this.speed = 1;
		this.loop = false;
		this.currentFrame = 0;
		this.timer=0;
		this.onComplete= function(){
			console.log("Complete");
		};
		this.play = function ($way,$from,$to,$loop){
			if(this.images.length>1){
					console.log("play");
					this.way=$way;
					this.from = $from;
					if($from == "start") this.from = 0;
					if($from == "end") this.from = this.images.length+1;
					if($from == "current") this.from = this.currentFrame;
					this.to = $to;
					if($to == "start") this.to = 0;
					if($to == "end") this.to = this.images.length+1;
					this.speed = 1000/this.frameRate;
					this.loop = $loop;
					this.currentFrame = this.from;
					this.interval="";
					this.timer=0;
					self = this;
					if(this.from!=this.to){
						this.interval=setInterval(function(){self.updateFrame();},this.speed);
						console.log("setInterval : " +this.interval);
						console.log(this.way);
						console.log(this.timer);
					}else{
						return false;
					}
					this.displayImage(this.currentFrame);
					return true;
			}else{
				return false;
			}
		}
		this.stop = function (){
			window.clearInterval(this.interval);
			this.interval=false;
			this.onComplete= function(){
				console.log("Complete");
			};
		}
		this.init = function(){
			this.currentFrame=0;
			this.displayImage(0);
		}
		this.updateFrame = function (){	
			var L=this.images.length;
				switch (this.way){
					// play backward
					case '<':
						if(this.currentFrame!=this.to){	
							if(this.currentFrame<=0){
								this.currentFrame = L;
							}
							this.currentFrame--;
						}else{
							if(this.loop){
								this.currentFrame=this.from;
							}else{
								this.onComplete();
							}
						}	
					break;
					// play foward
					case '>':
						if(this.currentFrame!=this.to){
							this.currentFrame++;
							if(this.currentFrame>=L){
								this.currentFrame = 0;
							}
						}else{
							if(this.loop){
								this.currentFrame=this.from;
							}else{
								this.onComplete();
							}
						}
					break;
				}
				this.displayImage(this.currentFrame);
			this.timer++;
		}
		this.displayImage = function($index){
			if(this.images[$index]){
				this.images[$index].style.display = 'block';
				for(var i = 0 ; i<this.images.length; i++){
					if(i!=$index){
						this.images[i].style.display='none';
					}
				}
			}
		}
		//DOM
		this.parentObject ="";
		this.container = "";
		this.buildFromDOM =  function(){
			var div = this.parentObject.E.getElementsByClassName('imageSequence')[0];
			if(div){
				this.container = div;
				var images = this.container.getElementsByTagName('img');
				if(images.length!=0){
					for (var i = 0 ; i < images.length ; i++){
						this.addImage(images[i]);
					}
				}
			this.displayImage(0);
			this.container.style.display='block';
			}
		}
	}
	function Action($values){  // class Action -----(called by ActionQueue)
		//engine
		this.d = new Date();
		this.serial =this.d.getTime();
		EG.add(this);
	
		//parameters
		this.object = $object;
		this.type="action";
		this.values = $values;
		this.status='ready';
		this.getobject = function (){
			return this.values.object;
		}		
		this.getType = function (){
			return this.values.actionType;
		}		
		this.getValues = function() {
			return this.values;
		}		
		this.setValues = function($v){
			this.values = $v
		}
		this.getAttribute = function($a){
			return this.values[$a];
		}
		this.setAttribute = function($a,$v){
			this.values[$a] = $v;
		}
		this.getduration = function() {
			return this.values.duration;
		}
		this.getStatus = function() {
			return this.status;
		}
		this.setStatus = function($status) {
			this.status=$status;
		}
		
	}	
	function ActionQueue($name){ // class ActionQueue called by Object,UserInterface)
		//name
		this.name = $name;
		
		//engine
		this.engine="";
		this.type="actionQueue";
		this.serial=EG.generateSerial();
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
		
		//actions
		this.actions=new Array();
		this.currentAction="";
		this.currentIndex=0;
		this.playing = true;
		this.looping=false;
		this.complete=false;
		console.log('new ActionQueue : '+$name);
		
		this.getActions = function(){
			return this.actions
		}
		this.printActions = function(){
			var output = this.name+" : \n";
			for (var i = 0;i<this.actions.length;i++){
				output+="___"+this.actions[i].object.name+'>>'+this.actions[i].type+"\n";
				if(this.actions[i].type=="startAnimation"){
					var subAnimation= this.actions[i].object.animation;
					var subActions=subAnimation.getActions();
					for (var j = 0;j<subActions.length;j++){
						output+="______"+subActions[j].object.name+'>>'+subActions[j].type+"\n";
					}		
				}
			}
			return output;
		}
		this.getLength = function(){
			return this.actions.length;
		}
		this.isPlaying = function(){
			return this.playing;
		}
		this.isComplete = function(){
			return this.complete;
		}
		
		
		this.add = function ($action){
			this.actions.push($action);
			console.log('new action('+$action.type+') added to : '+this.name);
		}
		this.parse = function ($actionQueue){
			var actionsToAdd= $actionQueue.getActions();
			for(var i = 0;i<actionsToAdd.length;i++){
				this.add(actionsToAdd[i]);
			}
			return true;
		}
		
		//navigation
		this.play = function (){
				this.playing=true;
				var actionsDone=0;
				for (var i = 0;i<this.actions.length;i++){
					this.currentIndex=i;
					switch (this.actions[i].getStatus()){
						case  'playing':
							console.log('playing');
							i=this.actions.length+1;
						break;
						case  'ready' :
							this.currentAction=this.actions[i];
							this.playAction(this.currentAction);
							i=this.actions.length+1;
						break;
						case  'done' :
							actionsDone++;
						break;
					}
				}
				if(actionsDone==this.actions.length){
					if(this.looping){
						this.init();
						this.play();
					}else{
						this.complete=true;
					}
				}else{
					this.complete=false;
				}
		}

		this.stop = function (){
			this.playing=false;
		}
		this.loop = function (){
			this.looping=true;
		}
		this.kill = function (){
			this.actions=new Array();
			this.looping=false;
		}
		this.init = function() {
			for(var e=0;e<this.actions.length;e++){
				this.actions[e].setStatus('ready');
			}
		}
		
		// reading action and executing it
		this.playAction = function($action){
			console.log($action.getType());
			var queue=this;
			var values = $action.getValues();
			var object = values.object;
			var type = values.type;
			var duration = values.duration;
			var nextActionIndex = queue.getCurrentIndex()+1;			
			this.currentAction.setStatus('playing');
			console.log("!play Action!");
			console.log(this.currentAction.getStatus());
			var objectPosition = object.getPosition();	
			switch (type){
				case 'translate':
					if(objectPosition!=values.point){ 
					// on verife que les coords de départ et d'arrivée ne sont pas identiques
						var T = TweenLite.to(e, duration, {marginLeft:values.point.x,marginTop:values.point.y,onComplete:function(){
							queue.currentAction.setStatus('done');
							if(queue.playing){
								queue.play();
							}
						}});
					}else{
						queue.currentAction.setStatus('done');
						if(queue.playing){
							queue.play();
						}
					}
				break;						
				case 'moveTo':
					if(objectPosition.x != values.point.x && objectPosition.y != values.point.y){ 
						object.setPosition($values);
					}
					queue.currentAction.setStatus('done');
					if(queue.playing){
						queue.play();
					}
				break;			
				case 'rotate':
					//code		
				break;			
				case 'alpha':
					if(object.isHidden()){
						if(values.a>0){
							object.E.style.display='block';
						}
					}
					var A = TweenLite.to(e, duration, {alpha:values.a,onComplete:function(){
						queue.currentAction.setStatus('done');
						if(values.a==0){
							object.hide();
						}
						if(queue.playing){
							queue.play();
						}
					}});
				break;				
				case 'fade':
					var condition = objects[o].isHidden();
					switch (values.fade){
						case 'in' : 
							if(condition){
								e.style.display = 'block';
								var FI = TweenLite.to(e, duration, {alpha:1,onComplete:function(){
									queue.currentAction.setStatus('done');
									object.show();
									if(queue.playing){
										queue.play();
									}
								}});
							}else{
								queue.currentAction.setStatus('done');
								if(queue.playing){
									queue.play();
								}
							}
						break;						
						case 'out' : 
							if(!condition){
								var FO = TweenLite.to(e, duration, {alpha:0,onComplete:function(){
									object.hide();
									queue.currentAction.setStatus('done');
									if(queue.playing){
										queue.play();
									}
								}});
							}else{
								queue.currentAction.setStatus('done');
								if(queue.playing){
									queue.play();
								}
							}
						break;
					}
				break;
				case 'condition':
					queue.currentAction.setStatus('done');
					if(values.condition==false){
						queue.actions[nextActionIndex].setStatus('done');
					}

					if(queue.playing){
						queue.play();
					}
				break;					
				case 'startAnimation':
					queue.currentAction.setStatus('done');
					object.animation.init();
					object.animation.play();
					if(queue.playing){
						queue.play();
					}

				break;
				case 'playImageSequence':

					if(values.from=='end')values.from=object.imageSequence.images.length-1;
					if(values.from=='start')values.from=0;
					if(values.from=='current')values.from=object.imageSequence.currentImage;
					if(values.to=='end')values.to=object.imageSequence.images.length-1;
					if(values.to=='start')values.to=0;
					var finalDuration=duration;
					object.imageSequence.onComplete=function(){	
						queue.currentAction.setStatus('done');
						object.imageSequence.stop();
						if(queue.playing){
							queue.play();
						}
					};
					if(object.imageSequence.play(values.way,values.from,values.to,values.loop)){
						console.log('--->sequence playing');
					}else{
						console.log('---> cannot play imageSequence!');
						queue.currentAction.setStatus('done');
						if(queue.playing){
							queue.play();
						}
					}
				break;
				case 'connect':
					EG.add(this.values);
					queue.currentAction.setStatus('done');
					if(queue.playing){
						queue.play();
					}
				break;
				case 'disconnect':
					this.values.desactivate();
					queue.currentAction.setStatus('done');
					if(queue.playing){
						queue.play();
					}
				break;
			}
		}
		this.getActionIndex = function ($action){
			for (var i = 0;i<this.actions.length;i++){
				if(this.actions[i]==$action){
					return i; 
					break;
				}
			}
			return false;
		}	
		this.getActionByIndex = function ($i){
			return this.actions[$i];
		}
		this.getCurrentIndex = function (){
			return this.currentIndex;
		}
		this.parseWith = function ($actionQueue){
			if($actionQueue!=null){
				for (var i=0;i<this.actions.length;i++){
					$actionQueue.add(this.actions[i]);
				}
			}
		}
	}
	function ObjectGroup (){ // class ObjectGroup ------(called by Panel,Layer,Multiplane) 
		//name
		this.name = "OG";

		//engine
		this.engine="";
		this.type="objectGroup";
		this.serial=this.d.getTime();
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
		
		//Objects
		this.objects = new Array();
		this.getObjects = function (){
			return this.objects;
		}
		this.addObject = function ($object){
			if(!this.isInGroup($object)){// on verifi si le groupe ne detiens pas déjà l'objet ajouté;
				this.objects.push($object);
				console.log($object.name+' added to ObjectGroup : '+this.name);
				return true;
			}
			console.log($object.name+' : Object allready in ObjectGroup');
			return false;
		}
		this.addObjects = function ($objects){
			var addedObjects = new Array(); //objects successfully added to the objectGroup
			for (var i = 0; i<$objects.length;i++){
				if(this.addObject($objects[i])){
					addedObjects.push($objects[i]);
				}
			}
			return addedObjects;
		}
		this.attachObjectsTo = function ($id){
			for (var i = 0; i<this.objects.length;i++){
				this.objects[i].attachTo($id);
			}
		}
		this.isInGroup = function ($object){
			var match = 0; 
			for(var j = 0 ; j<this.objects.length;j++){
				if (this.objects[j]==$object||this.objects[j].name == $object.name){
					match++;
				}
			}
			if(match==0){
				return false;
			}else{
				return true;
			}
		}
		this.setAttribute = function ($attribute,$value){
			for(var j = 0 ; j<this.objects.length;j++){
				this.objects[j][$attribute] = $value;
			}
		}
		//init
		this.init = function (){
			this.objects = new Array();
		}
	}
	function Panel($name,$parentId){  // class Panel ------(called by UserInterface)
		// name
		this.name = $name+'.panel' ;
		this.getName = function (){
			return this.name;
		}
		
		//Engine
		this.engine="";
		this.type="panel";
		this.serial=this.d.getTime();
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
		
		//  container
		this.container = new Object(this.name);
		this.container.attachTo($parentId);
		this.container.setAbsolute();
		this.getContainer = function (){
			return this.container;
		}
		
		//objects
		this.objects = new ObjectGroup();
		this.addObjects = function($objects){
			this.objects.addObjects($objects);
			this.objects.attachObjectsTo(this.name);
		}
		
		//animation
		this.wrapped = false;
		this.unwrap = function ($actionQueue){
			//this.container.show();
			var objectList = this.objects.getObjects();
			for(var i = 0;i<objectList.length;i++){
				$actionQueue.add(new Action(objectList[i],'alpha',1,0.2));
			}
			this.wrapped = false;
		}		
		this.wrap = function ($actionQueue){
			var objectList = this.objects.getObjects();
			for(var i = 0;i<objectList.length;i++){
				$actionQueue.add(new Action(objectList[i],'alpha',0,0.2));
			}
			this.wrapped = true;
		}
		// init
		this.init = function(){
			var objectList = this.objects.getObjects();
			for(var i = 0;i<objectList.length;i++){
				objectList[i].hide();
			}
			this.wrapped = true;
		}
		//DOM
		this.buildFromDOM = function(){

		}
	}
	function UserInterface($name){  // class UserInterface ------()
		//name
		this.name = $name;
		this.getName = function (){
			return this.name;
		}
		
		//engine
		this.engine="";
		this.type="UI";
		this.serial=this.d.getTime();
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
		
		//actionQueue
		this.actionQueue = new ActionQueue(this.name+'.actionQueue');
		
		//panels
		this.panels = new Array();
		this.getPanels = function (){
			return this.panels;
		}
		this.getPanelByName = function ($name){
			for (var i = 0 ; i<this.panels.length; i++){
					if(this.panels[i].name==$name){
						return this.panels[i];
					}
			}
			return false;
		}
		this.getPanelByIndex = function ($index){
			if(this.panels[$index]!=null){
				return this.panels[$index];
			}
			return false;
		}
		this.addPanels = function ($panels){
			for (var i = 0 ; i<$panels.length; i++){
				if(!this.isInPanels($panels[i])){
					this.panels.push($panels[i]);
				}
			}
		}
		this.isInPanels = function ($panel){
			var match = 0; 
			for(var j = 0 ; j<this.panels.length;j++){
				if (this.panels[j]==$panel){
					match++;
				}
			}
			if(match==0){
				return false;
			}
			return true;
		}
		
		this.preparePanelAnimation= function($panel){
			var phase1 = new ActionQueue('phase1');
			var phase2 = new ActionQueue('phase2');
			for (var i = 0 ; i<this.panels.length; i++){
				if(this.panels[i]==$panel){
					if(this.panels[i].wrapped == true){
						this.panels[i].unwrap(phase2);
					}
				}else{
					if(this.panels[i].wrapped == false){
						this.panels[i].wrap(phase1);
					}
					//this.panels[i].container.fadeOut(1);
				}
			}
			var animation = new Array();
			animation[0]=phase1;
			animation[1]=phase2;
			return animation;
		}
		this.initPanels = function (){
			for (var i = 0 ; i<this.panels.length; i++){
				this.panels[i].init ();
			}
		}
	}
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
	function Camera($id){  // class Camera ------(called by Multiplane) 
	
		//name 
		this.name = $id;
		this.getName = function (){
		return this.name;
		}
		//engine
		this.engine="";
		this.type="camera";
		this.d = new Date();
		this.serial=this.d.getTime();
		this.getType = function(){return this.type}
		this.getSerial = function(){return this.serial}
		EG.add(this);
	
		//container
		this.container = new Object($id);
		this.container.setCSS = "Camera";
		this.container.hide();
	}
	
	
	// FONCTIONS UTILITAIRES CROSS BROWSERS :
	
	function isAnArray($object){
		if ($object.constructor === Array) return true;
		else return false;
	}
	function px($string){
		return parseFloat($string, 10);
	}
	function getStyle($element, $cssprop){
		var result = "";
		 if ($element.currentStyle) //IE
		  result= $element.currentStyle[$cssprop]
		 else if (document.defaultView && document.defaultView.getComputedStyle) //Firefox
		  result= document.defaultView.getComputedStyle($element, "")[$cssprop]
		 else if ($element.style)//try and get inline style
		  result= $element.style[$cssprop]
		 else return false;
		 if(result.search("px")){
			return px(result);
		 }else{
			return result;
		 }
	}
    function getParentElement ($element) {
		var parentElement = $element.parentElement;
		if (!parentElement) {
			parentElement = $element.parentNode;
		}
		return parentElement;
    }
	function addEvent($elem,$eventType,$handler) {
		 if ($elem.addEventListener)
			 $elem.addEventListener ($eventType,$handler,false);
		 else if ($elem.$attachEvent)
			 $elem.attachEvent ('on'+$eventType,$handler); 
	}
	function cumulativeOffset($element) {
		var top = 0, left = 0;
		do {
			top += $element.offsetTop  || 0;
			left += $element.offsetLeft || 0;
			$element = $element.offsetParent;
		} while($element);

		return {
			y: top,
			x: left
		};
	}
	function getRotationDegrees($obj) {
		var matrix = $obj.css("-webkit-transform") ||
		$obj.css("-moz-transform")    ||
		$obj.css("-ms-transform")     ||
		$obj.css("-o-transform")      ||
		$obj.css("transform");
		if(matrix !== 'none') {
			var values = matrix.split('(')[1].split(')')[0].split(',');
			var a = values[0];
			var b = values[1];
			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
		} else { var angle = 0; }
		return (angle < 0) ? angle +=360 : angle;
	}	
	function getTime(){
		var d = new Date();
		var serial = d.getTime()
		return serial;
	}
	function getNumWithSetDec( $num, $numOfDec ){
		var pow10s = Math.pow( 10, $numOfDec || 0 );
		return ( $numOfDec ) ? Math.round( pow10s * $num ) / pow10s : $num;
	}
	function addElementsToArray($elements,$toArray){
		for(var i =0;i<$elements.length;i++){
			var match=0;
			for(var j = 0;j<$toArray.length;j++){
				if($elements[i]==$toArray[j]){
					match++;
				}
			}
			if(match==0){
				$to.push($elements[i]);
			}else{
				$to.push($elements[i]);
			}
		}
	}
	//
