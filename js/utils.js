// FONCTIONS UTILITAIRES CROSS BROWSERS (en general) :
	
	function isAnArray($object){
	
		if ($object.constructor === Array) return true;
		
		else return false;
		
	}
	
//________________________________________________________________________
	
	function px($string){
	
		return parseFloat($string, 10);
		
	}
	
//________________________________________________________________________ 

	getDistance1d = function ($A,$B){
	
		var result=$B-$A;
		return result;
		
	}
	
	getDistance2d = function($point1, $point2){
	
		var xs = 0;
		var ys = 0;			 
		xs = $point2.x - $point1.x;
		xs = xs * xs;			 
		ys = $point2.y - $point1.y;
		ys = ys * ys;		 
		return Math.sqrt( xs + ys );
		
	}	
	
	getVector = function($point1, $point2,$speed){
	
		var output={x:0,y:0};
		if($speed!==0){
			var A = $point1;
			var B = $point2;
			var dx = getDistance1d(A.x,B.x)
			var dy = getDistance1d(A.y,B.y)
			var D = getDistance2d(A,B);
			if(D!==0){
				var T=D/$speed;
				output={
					x:dx/T,
					y:dy/T
				}
			}
			return output;
		}
		return output;
			
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
	
	function setStyle($element,$attr,$val){
	

		if($element.style.setAttribute){
		
			$element.style.setAttribute($attr,$val);
			
		}else{
		
			$element.style[$attr] = $val;
			
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
		
    function getChildrensOf ($element) {
	
		var parent = $element;
		var mess = parent.childNodes;
		var clean = new Array();
		for (var i = 0 ; i<mess.length;i++){
			if(mess[i].nodeName !== '#text'){
				clean.push(mess[i]);
			}
		}
		return clean;
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

	function Link_($A,$B,$model,$type){
		
		var bond=clone_($model);
		
		bond.setPivot("left top");
		
		var distance2d = new Distance('2d');
		
		var angle = new Angle(false);
	
		switch ($type){
		
			
			case 'elastic':
			
				connect_($A,"position",distance2d,"pointA");
				connect_($B,"position",distance2d,"pointB");
				connect_($A,"position",angle,"pointA");
				connect_($B,"position",angle,"pointB");
				connect_(angle,"angle",bond,"rotation");
				connect_($A,"position",bond,"position");
				connect_(distance2d,"distance",bond,"width");		
				
			break;
			
			case 'rigid':
				//WIP
			break;
			
			default :
			
				connect_($A,"position",distance2d,"pointA");
				connect_($B,"position",distance2d,"pointB");
				connect_($A,"position",angle,"pointA");
				connect_($B,"position",angle,"pointB");
				connect_(angle,"angle",bond,"rotation");
				connect_($A,"position",bond,"position");
				connect_(distance2d,"distance",bond,"width");		
			
		}

		
	}
	
//__________________________________________________________________________

	function stretch_($A,$B,$limit,$rigidity){
			
		var distance2d = new Distance('2d');
		connect_($A,"position",distance2d,"pointA");
		connect_($B,"position",distance2d,"pointB");
		
		var bypass = new Fonction();
		bypass.f = function ($inputs){
			var output = new Array();
			
			if( $rigidity > $limit ) {
			
				$rigidity = $limit;
				
			}
			
			var r = $rigidity / $limit;
			
			output[0] = ( $inputs[0] - $limit ) * r;
			
			return output ; 
		}			
		
		connect_(distance2d,'distance',bypass,0);		
		var V=new Vector(1,false);
		
		connect_(bypass,0,V,'speed');
		connect_($A,"position",V,"pointA");	
		connect_($B,"position",V,"pointB");	
		connect_(V,"output",$A,"force");
	}
	
	function push_($A,$B,$limit,$rigidity){
			
		var distance2d = new Distance('2d');
		connect_($A,"position",distance2d,"pointA");
		connect_($B,"position",distance2d,"pointB");
		
		var bypass = new Fonction();
		bypass.f = function ($inputs){
			var output = new Array();
			if($inputs[0] < $limit ) {
				output[0] = ( $inputs[0] - $limit ) * ( $rigidity / $limit );
			}else{
				output[0] = 0;
			}
			return output ; 
		}	

		connect_(distance2d,'distance',bypass,0);		
		var V=new Vector(1,false);
		
		connect_(bypass,0,V,'speed');
		connect_($A,"position",V,"pointA");	
		connect_($B,"position",V,"pointB");	
		connect_(V,"output",$A,"force");
	}	
	
//____________________________________________________________________________
	
	function bypass($input,$limit,$rigidity){
		var output = new Array();
		
		if( $rigidity > $limit ) {
		
			$rigidity = limit;
			
		}
		
		var r = $rigidity / $limit;
		
		output = ( $input - $limit ) * r;
		
		return output ; 
	}
	
//____________________________________________________________________________
				
	function raw_stretch_($mobile1,$mobile2,$limit,$rigidity,$i){
	
		
		var D = getDistance2d($mobile1.getPosition(),$mobile2.getPosition());
	
		var V = getVector($mobile1.getPosition(),$mobile2.getPosition(),bypass(D,$limit,$rigidity))
		$mobile1.addForce(V,$i);

	}
			
//____________________________________________________________________________

	function pointTo_($A,$B,$offset){
	
		var angle = new Angle(false);
		var offset = new Operator('+',$offset);
			
		connect_($A,'position', angle,'pointA');	
		connect_($B,'position', angle,'pointB');
		
		connect_(angle,'angle', offset,'inputX');
		connect_(angle,'angle', $A,'rotation');
		//connect_(offset,'outputX', $A,'rotation');
	
	}
	
//____________________________________________________________________________
	
	function getElementByName($Array,$name){
		for(var n=0; n<$Array.length;n++){
			if($Array[n].name == $name){
				return $Array[n];
			}
		}		
	}		
