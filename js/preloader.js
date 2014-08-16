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