class Loader{
	
	constructor(){
		
	}
	
static LoadCube(mesh,color){
	//south
	mesh.push(Object.create(Triangle).set([0,0,0],[0,1,0],[1,1,0]).setColor(color));
	mesh.push(Object.create(Triangle).set([0,0,0],[1,1,0],[1,0,0]).setColor(color));
	//east
	mesh.push(Object.create(Triangle).set([1,0,0],[1,1,0],[1,1,1]).setColor(color));
	mesh.push(Object.create(Triangle).set([1,0,0],[1,1,1],[1,0,1]).setColor(color));
	//north
	mesh.push(Object.create(Triangle).set([1,0,1],[1,1,1],[0,1,1]).setColor(color));
	mesh.push(Object.create(Triangle).set([1,0,1],[0,1,1],[0,0,1]).setColor(color));
	//west
	mesh.push(Object.create(Triangle).set([0,0,1],[0,1,1],[0,1,0]).setColor(color));
	mesh.push(Object.create(Triangle).set([0,0,1],[0,1,0],[0,0,0]).setColor(color));
	//top
	mesh.push(Object.create(Triangle).set([0,1,0],[0,1,1],[1,1,1]).setColor(color));
	mesh.push(Object.create(Triangle).set([0,1,0],[1,1,1],[1,1,0]).setColor(color));
	//bottom
	mesh.push(Object.create(Triangle).set([1,0,1],[0,0,1],[0,0,0]).setColor(color));
	mesh.push(Object.create(Triangle).set([1,0,1],[0,0,0],[1,0,0]).setColor(color));
	loaded=true;
}	


static LoadObjFile(mesh,name){
	async function getFromRepository(){
	const  url="https://raw.githubusercontent.com/charlesgles9/models/main/"+name;
	const response=  await fetch(url);
	const data= await  response.text();
    const verts=[];
	const faces=[];
	const normals=[];
	const array=data.split("\n");
	
	array.forEach((line)=>{
		// load vertex information
		if(line.startsWith("v")){
			let arr=line.split(" ");
			var vec3d= new Vector3f(arr[1],arr[2],arr[3]);
			verts.push(vec3d);
		}
		if(line.startsWith("vn")){
			let arr=line.split(" ");
			var vec3d= new Vector3f(arr[1],arr[2],arr[3]);
			normals.push(vec3d);
		}
		// load face information
		if(line.startsWith("f")){
			let f=line.split(" ");
			// contains both normal and face data
			let face=[0,0,0];
			//console.log(line);
			for(var i=0;i<f.length;i++){
			let indices=f[i].split("/");
				face[i-1]=indices[0];
			}
			//console.log(face);
		   var triangle=Object.create(Triangle)
		    .set(verts[(face[0]-1)].getArray(),
		         verts[(face[1]-1)].getArray(),
		         verts[(face[2]-1)].getArray());
			mesh.push(triangle);
		}
	});
	
}

loaded=true;
getFromRepository();
	
}
	
	
	
}
