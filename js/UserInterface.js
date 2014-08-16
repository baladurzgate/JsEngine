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