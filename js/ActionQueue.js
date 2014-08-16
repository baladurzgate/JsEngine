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