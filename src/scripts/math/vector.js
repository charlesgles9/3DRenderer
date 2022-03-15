
class Vector3f{
	
	constructor(x,y,z){
		this.x=x;
		this.y=y;
		this.z=z;
	}

  set(x,y,z){
	  this.x=x;
	  this.y=y;
	  this.z=z;
  }
	add(factor){
		this.x+=factor;
		this.y+=factor;
		this.z+=factor;
	}
	
	getLength(){
		return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);
	}
	
	normalize(){
		var length=this.getLength();
		return new Vector3f(this.x/length,this.y/length,this.z/length);
	}
	static crossProduct(vec1, vec2){
		var x=vec1.y*vec2.z-vec1.z*vec2.y;
		var y=vec1.z*vec2.x-vec1.x*vec2.z;
		var z=vec1.x*vec2.y-vec1.y*vec2.x;
		return new Vector3f(x,y,z);
	}
	static dotProduct(vec1,vec2){
		return vec1.x*vec2.x+vec1.y*vec2.y+vec1.z*vec2.z;
	}
	
   rotateX(angle){
	   let a=this.x;
	   let b=this.y;
	   this.x=(a*Math.cos(angle))+b*-Math.sin(angle);
	   this.y=a*Math.sin(angle)+b*Math.cos(angle);
   }
   		
   		// rotate a vector around an origin
   rotateOrigin(angle,w,h,depth,origin){
	   let a=this.x;
	   let b=this.y;
	   let c=this.z;
	 this.x=origin.x+w*Math.cos(angle);
	 this.y=origin.y+h*Math.sin(angle);
     this.z=origin.z+depth*Math.sin(angle);
   }
   
   rotateZ(angle){
	   let a=this.x;
	   let b=this.y;
	   this.x=(a*Math.cos(angle))+b*Math.sin(angle);
	   this.y=(-1)*a*Math.sin(angle)+b*Math.cos(angle);
   }
	scale(vec,scalar){
		return new Vector3f(vec.x*scalar,vec.y*scalar,vec.z*scalar);
	}
	scale(scalar){
		this.x*=scalar;
		this.y*=scalar;
		this.z*=scalar;
	}
	scale(x,y,z){
		this.x*=x;
		this.y*=y;
		this.z*=z;
	}
	
	 static sub(a,b){
		return new Vector3f(a.x-b.x,a.y-b.y,a.z-b.z);
	}
	getArray(){
		return [this.x,this.y,this.z];
	}
}
