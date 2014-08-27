// FONCTIONS UTILITAIRES CROSS BROWSERS :
	
	function isAnArray($object){
	
		if ($object.constructor === Array) return true;
		
		else return false;
		
	}
	
//________________________________________________________________________
	
	function px($string){
	
		return parseFloat($string, 10);
		
	}
	
//________________________________________________________________________
	
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
	
//________________________________________________________________________
		
    function getParentElement ($element) {
	
		var parentElement = $element.parentElement;
		
		if (!parentElement) {
			parentElement = $element.parentNode;
		}
		return parentElement;
    }

//________________________________________________________________________

	function addEvent($elem,$eventType,$handler) {
	
		 if ($elem.addEventListener)
			 $elem.addEventListener ($eventType,$handler,false);
		 else if ($elem.$attachEvent)
			 $elem.attachEvent ('on'+$eventType,$handler); 
	}

//________________________________________________________________________

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
	
//________________________________________________________________________

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
			
		} else {
		
			var angle = 0; 
		}
			
		return (angle < 0) ? angle +=360 : angle;
	}	
	
//________________________________________________________________________

	function getTime(){
	
		var d = new Date();
		
		var serial = d.getTime();
		
		return serial;
	}

//________________________________________________________________________

	function getNumWithSetDec( $num, $numOfDec ){
	
		var pow10s = Math.pow( 10, $numOfDec || 0 );
		
		return ( $numOfDec ) ? Math.round( pow10s * $num ) / pow10s : $num;
		
	}

//________________________________________________________________________

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

//________________________________________________________________________

	function getVarName($var)
	{
	  for (var name in window)
	  {
	  
		if (window[name]==$var)return(name);
		
	  }
	  
	  return("");
	  
	}

//________________________________________________________________________

	function getCategoriesIn($Array){
	
		if($Array.length>0){
		
			var stored={items:new Array(),occurences:new Array()};
			
			for (var i = 0;i<$Array.length;i++){
			
				if(i==0){
				
					stored.items.push($Array[i]);
					stored.occurences.push(1);
					
				}else{
				
					var count=0;
					
					for(var j=0;j<stored.items.length;j++){
					
						if($Array[i]==stored.items[j]){
							count++;
						}
					}
					if(count==0){
						stored.items.push($Array[i]);
					}else{
						stored.occurences.push(count);
					}
				}
			}
			
			return stored;
		}
		
		return false;
	}

//________________________________________________________________________

	function connect_($A,$attrA,$B,$attrB){
		var connection = new Connection($A,$attrA,$B,$attrB);
		EG.add(connection);
		return connection;
	}

//________________________________________________________________________

	function disconnect_($A,$attrA,$B,$attrB){
		var connection = new Connection($A,$attrA,$B,$attrB);
		connection.desactivate();
		return connection;
	}

//________________________________________________________________________

	function add_Mobile(){
		var m = new Mobile();
		EG.add(m);
		return m;
	}

//________________________________________________________________________

	function remove_Mobile($mobile){
		$mobile.desactivate();
		return $mobile;
	}

//________________________________________________________________________

	function clone_($patern){
	
		var clone = EG.clone($patern,'');
		
		clone.setAbsolute();
		clone.show();
		return clone;
	}	

//________________________________________________________________________

	function isInRegion($point,$region){
		var W = getStyle($region,"width")+1;
		var H = getStyle($region,"height")+1;
		var X = getStyle($region,"marginLeft")+getStyle($region,"left")+1;
		var Y = getStyle($region,"marginTop")+getStyle($region,"top")+1;
		var px = $point.x;
		var py = $point.y;
		
		if(px>X&&px<W+X&&py>Y&&py<Y+H){
			return true;
		}
		return false;
	}

//________________________________________________________________________
