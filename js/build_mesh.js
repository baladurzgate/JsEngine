	function build_mesh($cont_id,$cat_div_id){
		
		var mesh = new Array();
		
		var cats = new Array();
		
		var mouse = new UserInput('mouse',view,view);
		
		var elements = getChildrensOf(document.getElementById($cont_id));
		
		var branches = new Array();
		
		var minim_distance =50;
		var friction =1/5;
		
		for (var e=0;e<elements.length;e++){

			console.log(elements[e]);
			var element_cats = elements[e].getElementsByClassName($cat_div_id)[0].innerHTML;
			
			var element_cats = element_cats.split(',');
			
			if(element_cats.length>0){
				for (var s=0;s<element_cats.length;s++){
					cats.push(element_cats[s]);
				}
			}else{
				cats.push(element_cats[0]);
			}
			
			var branche_graph= new Object(elements[e].id);
			
			branche_graph.setAbsolute();
			branche_graph.show();
			
			var mb = add_Mobile();
			
			mb.setMass(1);
			mb.setFriction(friction);
			mb.size=branche_graph.getSize();
			mb.setPosition({
				x:center.position.x+(Math.random()*minim_distance/2)-minim_distance,
				y:center.position.y+(Math.random()*minim_distance/2)-minim_distance
			})
			
			var branche = {
			
				type:'branche',
				graph : branche_graph,
				cats : element_cats,
				nodes : new Array(),
				mobile : mb
			}
			
			mesh.push(branche);
			
			branches.push(branche);
			
		}
		
		var uniques_cats=(getCategoriesIn(cats));
		
		var nodes = new Array();
		
		for (var n = 0;n<uniques_cats.items.length;n++){
		
			var node_graph = clone_(node_pattern);
			
			var size = uniques_cats.occurences[n];
			
			var name =  uniques_cats.items[n];
			
			
			var mn = add_Mobile();
			
			mn.setMass(1);
			mn.setFriction(friction);
			mn.size=node_graph.getSize();
			mn.setPosition({
				x:center.position.x/size+(Math.random()*minim_distance/100)/size-minim_distance/200/size,
				y:center.position.y/size+(Math.random()*minim_distance/100)/size-minim_distance/200/size
			})
			
		
			var node = {

				type:'node',
				name :name,
				size : size,
				graph : node_graph,
				mobile : mn
			}
			
			mesh.push(node);		
			node_graph.E.innerHTML = uniques_cats.items[n];
			nodes.push(node);
		}	
		
		/*-------PHYSIQUE-------------------*/
		
		//NODES
		for (var n1=0;n1<nodes.length;n1++){
			
			//NODES PULL AND PUSH EACH OTHER
			for (var n2=0;n2<nodes.length;n2++){
			
				if(nodes[n1]!==nodes[n2]){
					stretch_(nodes[n1].mobile,nodes[n2].mobile, minim_distance*15,2/friction);
				}	
			}	
		}
		
		//BRANCHES
		for (var b=0;b<branches.length;b++){
		
			var list_of_cats= branches[b].cats;
			
			//BRANCHES PULL AND PUSH NODES AND NODES PULL AND PUSH BRANCHES
			for(var t=0;t<list_of_cats.length;t++){
			
				var node = getElementByName(nodes,list_of_cats[t]);
				stretch_(node.mobile,branches[b].mobile,minim_distance*node.size/2,2/friction);
				stretch_(branches[b].mobile,node.mobile,minim_distance*node.size/2,2/friction);
				
			}
			
			//BRANCHES PULL AND PUSH EACH OTHER
			for (var b2=0;b2<branches.length;b2++){
			
				if(branches[b].mobile !==branches[b2].mobile){
				
					stretch_(branches[b].mobile,branches[b2].mobile,minim_distance*13,2/friction);
					
				}
			}
		
		}
		
		return {m:mesh,b:branches,n:nodes};
		
	}
