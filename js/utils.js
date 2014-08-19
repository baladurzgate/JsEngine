	// FONCTIONS UTILITAIRES CROSS BROWSERS :
	
	function isAnArray($object){
		if ($object.constructor === Array) return true;
		else return false;
	}
	function px($string){
		return parseFloat($string, 10);
	}
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
    function getParentElement ($element) {
		var parentElement = $element.parentElement;
		if (!parentElement) {
			parentElement = $element.parentNode;
		}
		return parentElement;
    }
	function addEvent($elem,$eventType,$handler) {
		 if ($elem.addEventListener)
			 $elem.addEventListener ($eventType,$handler,false);
		 else if ($elem.$attachEvent)
			 $elem.attachEvent ('on'+$eventType,$handler); 
	}
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
		} else { var angle = 0; }
		return (angle < 0) ? angle +=360 : angle;
	}	
	function getTime(){
		var d = new Date();
		var serial = d.getTime()
		return serial;
	}
	function getNumWithSetDec( $num, $numOfDec ){
		var pow10s = Math.pow( 10, $numOfDec || 0 );
		return ( $numOfDec ) ? Math.round( pow10s * $num ) / pow10s : $num;
	}
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
	function getVarName($var)
	{
	  for (var name in window)
	  {
		if (window[name]==$var)
		return(name);
	  }
	  return("");
	}

	function connect_($A,$attrA,$B,$attrB){
		EG.add(new Connection($A,$attrA,$B,$attrB));
	}