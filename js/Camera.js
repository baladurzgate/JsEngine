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
	
	