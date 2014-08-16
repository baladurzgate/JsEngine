	function Average($averageType,$numOfDec,$round){ 
		//engine
		this.type="average"
		this.serial=EG.generateSerial();
		this.name=this.serial;
		this.engine="";
		EG.add(this);
		//input
		this.input = new Array();
		this.setInput = function($number,$i){
			this.input[$number]=$i;
		}
		//output
		this.output = 0;
		this.getOutput= function(){
			var calcul =0;
			switch($averageType){
				case "average":
					calcul = this.getAverage();
				break;
				case "variance":
					calcul = this.getVariance();
				break;				
				case "deviation":
					calcul = this.getDeviation();
				break;
			}
			if($round)calcul=Math.round(calcul);
			this.output=calcul;
			return this.output;
			
		}
		//calculs
		var numArr = this.input;
		this.getAverage = function($numOfDec ){
			var i = numArr.length, 
				sum = 0;
			while( i-- ){
				sum += numArr[ i ];
			}
			return getNumWithSetDec( (sum / numArr.length ), $numOfDec );
		}
		this.getVariance = function(numOfDec ){
			var avg = this.getAverage( numArr, $numOfDec ), 
				i = numArr.length,
				v = 0;
		 
			while( i-- ){
				v += Math.pow( (numArr[ i ] - avg), 2 );
			}
			v /= numArr.length;
			return getNumWithSetDec( v, numOfDec );
		}
		this.getDeviation = function($numOfDec ){
			var stdDev = Math.sqrt( this.getVariance( numArr, $numOfDec ) );
			return getNumWithSetDec( stdDev, $numOfDec );
		};
	}