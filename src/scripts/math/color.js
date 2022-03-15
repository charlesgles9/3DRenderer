class ColorARGB{
	
	constructor(){
		this.data=[0,0,0,0];
		this.rgb= new Vector3f(0,0,0);
	}
	
	set(a,r,g,b){
		this.data[0]=a;
		this.data[1]=r;
		this.data[2]=g;
		this.data[3]=b;
	}
	set(r,g,b){
		this.data[1]=r;
		this.data[2]=g;
		this.data[3]=b;
	}
	
	getARGB(){
		this.rgb.set(data[0],data[1],data[2]);
		return rgb;
	}
	
	static darkenColor(color,factor){
		let r=Math.min(Math.round(color.x *factor),255);
		let g=Math.min(Math.round(color.y *factor),255);
		let b=Math.min(Math.round(color.z *factor),255);
		return new Vector3f(r,g,b);
		
	}
	static getRGBString(color){
		return "rgb("+color.x+","+color.y+","+color.z+")";
	}
	
}
