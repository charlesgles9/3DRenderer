class Renderer{
	
	constructor(canvas,context){
		this.canvas=canvas;
		this.context=canvas.getContext("2d");
		this.array=[];
		this.camera=null;
		this.showWireFrame=false;
		this.light=new Vector3f(-0.8,-0.8,-0.8);
	}
	
 repaint(){
   this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
  }
  
  begin(camera){
	 this.array.splice(0,this.array.length);  
	 this.camera=camera; 
  }
  
  draw(obj){
	this.array.push(obj);    
  }
  
  end(){
	  // sort the models and draw elements that are far away first
	this.array.sort((a,b)=>{
		var w1=(a.position.z+a.position.z+a.position.z)/3;
		var w2=(b.position.z+b.position.z+b.position.z)/3;
		return w1<w2;
	});		
	
	// update angle
	this.array.forEach(obj=>{
			this.render(obj);
			obj.increaseAngle(0.5);
		});
  }
  
 render(obj){
	const projectedTris=[];
	const mesh=obj.getMesh();
	const rotationMatrix=obj.rotationMatrix;
	const position=obj.position;
	const rotation=obj.rotation;
	const scale=obj.scale;
	const angle=obj.angle;
	for(let triangle of mesh){
		let projected=[];
		let rotated=[];
		let translated=[];
		//perform rotations 
		 for(let vec of triangle.vectors){
			 var r;
			  rotationMatrix.setRotationY(((angle+0.01)/180*3.142)*rotation.y);
			  r=Matrix4f.Multiply(rotationMatrix,vec);
			  rotationMatrix.setRotationX(((angle+0.01)/180*3.142)*rotation.x)
			     r=Matrix4f.Multiply(rotationMatrix,r)
			  rotationMatrix.setRotationZ(((angle+0.01)/180*3.142)*rotation.z);
			     r=Matrix4f.Multiply(rotationMatrix,r)
			 rotated.push(Matrix4f.Multiply(rotationMatrix,r));
		 }
		// translate the z value of the model 
		for(let vec of rotated){
		    var trans=new Vector3f(vec.x,vec.y,vec.z+position.z+camera.z);
	     	translated.push(trans);
	     }
	    
	    //check if the triangle is visible relative to the camera position
	     let a = new Vector3f(translated[1].x-translated[0].x ,translated[1].y-translated[0].y,translated[1].z-translated[0].z);
	     let b = new Vector3f(translated[2].x-translated[0].x,translated[2].y-translated[0].y,translated[2].z-translated[0].z);
	     let normal=Vector3f.crossProduct(a,b).normalize();
	     let dot=Vector3f.dotProduct(normal,translated[0]);
	     if(dot<0){
		 var ptri=Object.create(Triangle).
		 set(Matrix4f.Multiply(projectionMatrix,translated[0]).getArray(),
		     Matrix4f.Multiply(projectionMatrix,translated[1]).getArray(),
		     Matrix4f.Multiply(projectionMatrix,translated[2]).getArray())
	      // perform directional lighting 
	     let dot=Vector3f.dotProduct(normal,this.light);
	     // make objects that are far away darker
	       dot=(dot+1)/(position.z+0.001+camera.z);
	     //  console.log(dot);
	     let color=ColorARGB.darkenColor(triangle.vcolor,dot);	
	     ptri.setColor(color);
	     projectedTris.push(ptri);
	  }
	}
	
	// sort the triangles based on the center of the z value
	projectedTris.sort((a,b)=>{
		var w1=(a.vectors[0].z+a.vectors[1].z+a.vectors[2].z)*0.3333;
		var w2=(b.vectors[0].z+b.vectors[1].z+b.vectors[2].z)*0.3333;
		return w1<w2;
	});
	   
	for(let projected of projectedTris){
		var p= new Vector3f(position.x+camera.x,position.y+camera.y,position.z);
		  for(let vec of projected.vectors)
	      vec.scale(scale.x,scale.y,scale.z);
	    this.context.fillStyle=projected.getColor();
	    // draw filled triangles 
		this.context.beginPath();
		this.context.moveTo((p.x+projected.vectors[0].x)/(camera.z+1),(p.y+projected.vectors[0].y)/(camera.z+1));
		this.context.lineTo((p.x+projected.vectors[1].x)/(camera.z+1),(p.y+projected.vectors[1].y)/(camera.z+1));
		this.context.lineTo((p.x+projected.vectors[2].x)/(camera.z+1),(p.y+projected.vectors[2].y)/(camera.z+1));
		this.context.closePath();
		this.context.fill();
		// draw wire frame
		this.context.strokeStyle=this.showWireFrame?"white":projected.getColor();
		this.context.beginPath();
	    this.context.moveTo((p.x+projected.vectors[0].x)/(camera.z+1),(p.y+projected.vectors[0].y)/(camera.z+1));
		this.context.lineTo((p.x+projected.vectors[1].x)/(camera.z+1),(p.y+projected.vectors[1].y)/(camera.z+1));
		this.context.lineTo((p.x+projected.vectors[2].x)/(camera.z+1),(p.y+projected.vectors[2].y)/(camera.z+1));
		this.context.closePath();
		this.context.stroke();
	}
	
	}
}
