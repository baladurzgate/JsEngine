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