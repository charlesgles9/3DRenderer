var Triangle={
	 vectors:null,
	 vcolor:new Vector3f(80,80,80),
	 normal:null,
	 set(a,b,c){
		 this.vectors=[];
		 this.vectors.push(new Vector3f(a[0],a[1],a[2]));
		 this.vectors.push(new Vector3f(b[0],b[1],b[2]));
		 this.vectors.push(new Vector3f(c[0],c[1],c[2]));
		 return this;
	 },
	 setColor(color){
		this.vcolor=color;
		return this;
	 },
	 getColor(){
		return ColorARGB.getRGBString(this.vcolor);
	 }
};
var Star={
	position:null,
	set(x,y,z){
		this.position=new Vector3f(x,y,z);
	}
	
};
var date= new Date();
var projectionMatrix= new Matrix4f(0);
var camera= new Vector3f(500,450,2);
var loaded=false;
var renderer= new Renderer(document.getElementById("canvas"));
var mDLobj=[];
var stars=[];
var time;
var dt=0;
var p_frame=0;
var fps=0;
var origin= new Vector3f(0,0,0);

function Initialize(){
	mDLobj.push(new MDLObject(600,100,1));
	mDLobj.push(new MDLObject(650,250,2));
	mDLobj.push(new MDLObject(650,150,3.5));
	mDLobj.push(new MDLObject(650,100,4.5));
	mDLobj.push(new MDLObject(350,450,4.5));
	mDLobj.push(new MDLObject(200,450,4.2));
	mDLobj.push(new MDLObject(650,550,2.5));
	mDLobj.push(new MDLObject(550,650,5.5));
	mDLobj[0].setRotation(1,1,0);
	mDLobj[1].setRotation(0,1,0);
	mDLobj[2].setRotation(1,1,1);
	mDLobj[3].setRotation(1,0,1);
	mDLobj[4].setRotation(0,1,0);
	mDLobj[6].setRotation(0,1,1);
	mDLobj[7].setRotation(1,1,0);
	mDLobj[5].setRotation(0,0,1);
	mDLobj[0].setScale(300,300);
	mDLobj[1].setScale(250,250);
	mDLobj[2].setScale(250,180);
	mDLobj[3].setScale(150,150);
	mDLobj[4].setScale(350,350);
	mDLobj[6].setScale(250,250);
	mDLobj[7].setScale(250,250);
	
	mDLobj[5].setScale(250,250);
	Loader.LoadCube(mDLobj[0].getMesh(),new Vector3f(255,0,0));
	Loader.LoadCube(mDLobj[1].getMesh(),new Vector3f(255,255,0));
	Loader.LoadCube(mDLobj[2].getMesh(),new Vector3f(0,255,0));
	Loader.LoadCube(mDLobj[3].getMesh(),new Vector3f(0,0,255));
	Loader.LoadObjFile(mDLobj[4].getMesh(),"sphere.obj");
	Loader.LoadObjFile(mDLobj[5].getMesh(),"sphere.obj");
	Loader.LoadObjFile(mDLobj[6].getMesh(),"Asteroid3.obj");
	Loader.LoadObjFile(mDLobj[7].getMesh(),"Asteroid1.obj");
	mDLobj[4].factor=0.2;
	mDLobj[5].factor=0.1;
	origin.set(350,450,5.5);
	// create a star field
	for(let i=0;i<100;i++){
		const x=Math.random()*renderer.canvas.width;
		const y=Math.random()*renderer.canvas.height;
		const star=Object.create(Star);
		star.set(x,y,0);
		stars.push(star);
		
	}
	var zfar=0.1;
	var znear=100;
	var fov=90;
	var a=450/850;
	var fovRadius=1.0/Math.tan(fov*0.5/180*3.142);
	projectionMatrix.array[0][0]=a*fovRadius;
	projectionMatrix.array[1][1]=fovRadius;
	projectionMatrix.array[2][2]=zfar/(zfar-znear);
	projectionMatrix.array[3][2]=(-zfar*znear)/(zfar-znear);
	projectionMatrix.array[2][3]=1.0;
	projectionMatrix.array[3][3]=0.0;
	keyEventListener();
	// set up lighting values 
	const v1=parseFloat(document.getElementById("illuminationX").value);
	const v2=parseFloat(document.getElementById("illuminationY").value);
	const v3=parseFloat(document.getElementById("illuminationZ").value);
    renderer.light.set(-1.5*(v1+0.1)/100,
                       -1.5*(v2+0.1)/100,-1.5*(v3+0.1)/100)
}

function setIllumination(e,axis){
	 let v=parseFloat(e.value);
		switch(axis){
			case '0':
			renderer.light.x=-1.5*(v+0.1)/100;
			break;
			case '1':
			renderer.light.y=-1.5*(v+0.1)/100;
			break;
			case '2':
			renderer.light.z=-1.5*(v+0.1)/100;
			break;
		}
}

function toggleWireFrame(e){
	renderer.showWireFrame=e.checked;
}
function getTimeStamp(){
	return window.performance&&window.performance.now?
	window.performance.now():date.getTime();
}

function getFps(){
	var delta=p_frame+1000;
	if(delta>=time){
		dt++;
	}else{
		fps=dt;
		p_frame=time;
		dt=0;
		
	}
	
}
var angle=2;
function loop(){
	time=getTimeStamp();
	renderer.repaint();
	// draw star field
	renderer.context.fillStyle="white";
	stars.forEach((star)=>{
		renderer.context.fillRect(star.position.x,star.position.y,1.5,1.5);
		
	});
	if(loaded){
		// pass in the camera and the objects to draw
	renderer.begin(camera);
	mDLobj.forEach(obj=>{
			renderer.draw(obj);
			obj.increaseAngle();
		});
	// draw the objects 
	renderer.end();
	// rotate the first moon
	mDLobj[4].rotateAroundOrigin(angle/180*3.142,450,150,3,origin);
	// rotate first asteroid
	mDLobj[6].rotateAroundOrigin(angle/180*3.142,350,150,3,origin);
	mDLobj[6].rotateAroundOrigin(angle/180*3.142,250,150,3,origin);
	// rotate second asteroid
	mDLobj[7].rotateAroundOrigin(angle/180*3.142,-350,150,5,origin);
	mDLobj[7].rotateAroundOrigin(angle/180*3.142,-250,150,5,origin);
	angle=(angle+0.2)%360;

	// calculate fps 	
	getFps()
 // draw fps 
    renderer.context.strokeStyle="white";
    renderer.context.font="12px Arial";
	renderer.context.strokeText("FPS: "+fps,20,20);
	// calculate number of triangles
	var count=0;
		mDLobj.forEach(obj=>{
			count+=obj.getMesh().length;
		});
	}
	// triangle count
    renderer.context.strokeStyle="white";
    renderer.context.font="12px Arial";
	renderer.context.strokeText("TRIANGLES: "+count,80,20);
	// draw vertices
	 renderer.context.strokeStyle="white";
    renderer.context.font="12px Arial";
	renderer.context.strokeText("VERTICES: "+count*3,220,20);
	requestAnimationFrame(loop,1000);
}

function keyEventListener(){
	window.addEventListener("keydown",(event)=>{
		var vel=200*(1/(fps+1));
		const key=event.key.toLowerCase();
		switch(key){
			case "w":
			camera.y-=vel;
			break;
			case "s":
			camera.y+=vel;
			break;
			case "a":
			camera.x-=vel;
			break;
			case "d":
			camera.x+=vel;
			break;
			case "z":
			camera.z=camera.z-0.01>0?camera.z-0.01:camera.z;
			break;
			case "x":
			camera.z+=0.01;
			break;
		}
	});
}

Initialize();
loop();

