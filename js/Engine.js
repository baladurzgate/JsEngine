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
			loader:new Array(),
			object:new Array(),
			panel:new Array(),
			indicator:new Array(),
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
			limit:new Array(),
			random:new Array(),
			compare:new Array(),
			mobile:new Array(),
			vector:new Array(),
			orbit:new Array(),
			clock:new Array(),
			trigger:new Array(),
			variable:new Array(),
			meter:new Array(),
			matrix:new Array(),
			fonction:new Array(),
			userInput:new Array(),
			slider:new Array(),
			sequence:new Array(),
			imageLoader:new Array(),
			actionQueue:new Array(),
			action:new Array(),
			rope:new Array(),
			emitter:new Array(),
			particule:new Array(),
			particulesystem:new Array(),
			print:new Array()
			
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
						case "mobile":
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
			
				var RC=this.getConnections($thing);
				
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
		
		this.getConnections = function($thing){
		
			var list = new Array();
			
			for (var i = 0;i<this.outliner.connection.length;i++){
			
				var pickedConnection = this.outliner.connection[i];
				
				if(pickedConnection.A==$thing || pickedConnection.B==$thing){
					list.push(pickedConnection);
					console.log(pickedConnection);
				}
			}
			return list;
		}
		
		
		//objects
		this.clone = function ($thing,$newId){
		
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
		
		this.flush_processes  =  function (){
		
			for (var i = 0;i<this.processes.length;i++){
				if(this.processes[i].on==false){
					this.processes.splice(i,1);	
					break;
				}
			}
			return false;
		}
		
		this.findProcess=function($process){
		
			for (var i = 0;i<this.processes.length;i++){
				if(this.processes[i].ID==$process.ID){
					return this.processes[i];	
					break;
				}
			}
			return false;
		}
		
		this.desactivateProcess=function($process){
		
			var p = this.findProcess($process);
			
			if(p!==false){
			
				p.on = false;
				return true;
				
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
		
			if(this.running==true){
			
				this.flush_processes();
				
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
