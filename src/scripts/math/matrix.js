class Matrix4f{
	
	constructor(entries){
		this.array=Array(4).fill().map(v=>new Array(0,0,0,0));
		this.array[0][0]=entries;
		this.array[1][1]=entries;
		this.array[2][2]=entries;
		this.array[3][3]=0;
	}
	set(vec){
		this.array[0][0]=vec.x;
		this.array[1][1]=vec.y;
		this.array[2][2]=vec.z;
	}
	static Multiply(matrix,vector){
		var x=matrix.array[0][0]*vector.x+matrix.array[1][0]*vector.y+matrix.array[2][0]*vector.z;
		var y=matrix.array[0][1]*vector.x+matrix.array[1][1]*vector.y+matrix.array[2][1]*vector.z;
		var z=matrix.array[0][2]*vector.x+matrix.array[1][2]*vector.y+matrix.array[2][2]*vector.z;
		var w=vector.x*matrix.array[0][3]+vector.y*matrix.array[1][3]+vector.z*matrix.array[2][3]+matrix.array[3][3];
		var nv= new Vector3f(x,y,z);
		if(w!=0){
			nv.x/=w;
			nv.y/=w;
			nv.z/=w;
		}
		return nv;
	}
	 setRotationZ(angle){
		this.array[0][0]= Math.cos(angle);
		this.array[0][1]=-Math.sin(angle);
		this.array[0][2]=0;
		this.array[1][0]= Math.sin(angle);
		this.array[1][1]= Math.cos(angle);
		this.array[1][2]=0;
		this.array[2][0]=0;
		this.array[2][1]=0;
		this.array[2][2]=1;
	}
	 setRotationX(angle){
		this.array[0][0]=1;
		this.array[0][1]=0;
		this.array[0][2]=0;
		this.array[1][0]=0;
		this.array[1][1]= Math.cos(angle);
		this.array[1][2]=-Math.sin(angle);
		this.array[2][0]=0;
		this.array[2][1]=Math.sin(angle);
		this.array[2][2]=Math.cos(angle);
	}
	 setRotationY(angle){
		this.array[0][0]= Math.cos(angle);
		this.array[0][1]=0;
		this.array[0][2]=-Math.sin(angle);
		this.array[1][0]=0;
		this.array[1][1]=1;
		this.array[1][2]=0;
		this.array[2][0]=Math.sin(angle);
		this.array[2][1]=0;
		this.array[2][2]=Math.cos(angle);
	}
}

