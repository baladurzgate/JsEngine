	function Indicator ($min,$max,$witness,$channel,$region){
	
		//Engine
		this.type="indicator";
		this.engine="";
		this.serial =EG.generateSerial();
		
		this.input_var = new Variable(0);
		
		this.setInput = function($i){
			
			this.input_var.setValue($i);
		
		}
		
		var pRatio = new Clamp('1d',0,$max,1,true);
		connect_($region,$channel,pRatio,'range');
		
		var over = new Limit('1d',0,1);
		connect_($region,$channel,over,'max');
		
		connect_(this.input_var,'output',pRatio,'input');
		connect_(pRatio,'output',over,'input');
		connect_(over,'output',$witness,$channel);
	
	}
	
	
	

	
	
