	//WebEngine by Alexandre Cormier (bighal.cormier@gmail.com)
	//Beta v1.2;

	
	// CLASSES :
	

	//---------VARIABLE GLOBALE EG-------------
	var EG=new Engine();
	//-----------------------------------------
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
			clamp:new Array(),
			random:new Array(),
			compare:new Array(),
			force:new Array(),
			vector:new Array(),
			clock:new Array(),
			trigger:new Array(),
			variable:new Array(),
			userInput:new Array(),
			imageSequence:new Array(),
			imageLoader:new Array(),
			actionQueue:new Array(),
			action:new Array()
		};
		var self = this;
		this.running=false;
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
			if($thing.type!==null){
				var RC=this.getRelatedConnections($thing);
				for(var i=0;i<RC.length;i++){
					RC[i].desactivate();
					//this.removeFromOutliner(RC[i]);
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
				if(pickedConnection.A==$thing || pickedConnection.B==$thing){
					listOfRelatedConnections.push(pickedConnection);
					console.log(pickedConnection);
				}
			}
			return listOfRelatedConnections;
		}
		
		
		//objects
		this.clone = function ($thing,$newId){
			console.log($thing);
			if($thing.type){
				switch($thing.type){
					case "object" : 
						var ElementToClone=$thing.E.cloneNode(true);
						if($newId==''){
							$newId=EG.generateSerial();
						}
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
			if(this.findProcess($process)==false){
				this.processes.push($process);
				if(this.processes.length==1){
					this.startMainLoop();
				}
			}
			return $process
		}
		this.removeProcess = function($process){
			$process.on=false;
			return this.processes.splice(this.getProcessIndex($process),1);
		}
		this.findProcess=function($process){
			for (var i = 0;i<this.processes.length;i++){
				if(this.processes[i].ID==$process.ID){
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
			if(this.running==true){
				for (var i = 0;i<this.processes.length;i++){
					var process = this.processes[i];
					if(process.on){
						process.f();
					}
				}
			}
		}
		this.play = function(){
			this.running = true;
		
		}
		this.stop = function(){
			this.running = false;
		
		}	
	}