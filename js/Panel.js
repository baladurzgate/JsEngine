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