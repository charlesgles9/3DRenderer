class MDLObject{
	
	constructor(x,y,z){
		
		this.position= new Vector3f(x,y,z);
		this.rotation=new Vector3f(0,0,0);
		this.scale= new Vector3f(100,100,100);
		this.rotationMatrix=new Matrix4f(0);
		this.mesh=[];
		this.angle=0;
		this.factor=0.5;
	}
	setRotation(x,y,z){
		this.rotation.set(x,y,z);
	}
	setPosition(x,y,z){
		this.position.set(x,y,z);
	}
	setScale(x,y){
		this.scale.set(x,y,0);
	}
	getMesh(){
		return this.mesh;
	}
	
	increaseAngle(){
		this.angle=(this.angle+this.factor)%360;
	}
	
	rotateAroundOrigin(angles,w,h,depth,origin){
		this.position.rotateOrigin(angles,w,h,depth,origin);
	}
	
	
}
