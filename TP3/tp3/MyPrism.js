/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/


	
 	this.vertices = [
 	];
 	this.normals = [
 	];
 	this.indices = [
 	];

 	var angulo = 2*Math.PI/this.slices;

 	for(i = 0; i < this.stacks+1;i++){
 		for(j = 0; j < this.slices;j++){
 			this.vertices.push(Math.cos(j*angulo),Math.sin(j*angulo),i/this.stacks);
 			this.normals.push(Math.cos(angulo/2)+j*angulo,Math.sin(angulo/2)+j*angulo,0);
 			this.vertices.push(Math.cos((j+1)*angulo),Math.sin((j+1)*angulo),i/this.stacks);
 			this.normals.push(Math.cos(angulo/2)+j*angulo,Math.sin(angulo/2),0);
 		}
 	}

	for(i=0; i < this.stacks;i++){
		for(j=0; j < this.slices;j++){
			this.indices.push(i*(this.slices*2)+j*2,i*(this.slices*2)+j*2+1,(i+1)*(this.slices*2)+j*2+1);
			this.indices.push(i*(this.slices*2)+j*2,(i+1)*(this.slices*2)+j*2+1,(i+1)*(this.slices*2)+j*2);
		}
	}

	/*
	for(i = 0; i < this.slices; i++){
		for(j =0 ; j < this.stacks;j++){
			this.vertices.push(Math.cos((i*Math.PI)/(this.slices/2)),Math.sin((i*Math.PI)/(this.slices/2)),j/this.stacks);
			this.vertices.push(Math.cos(((i+1)*Math.PI)/(this.slices/2)),Math.sin(((i+1)*Math.PI)/(this.slices/2)),j/this.stacks);
			this.vertices.push(Math.cos((i*Math.PI)/(this.slices/2)),Math.sin((i*Math.PI)/(this.slices/2)),(j+1)/this.stacks);
			this.vertices.push(Math.cos(((i+1)*Math.PI)/(this.slices/2)),Math.sin(((i+1)*Math.PI)/(this.slices/2)),(j+1)/this.stacks);
	        this.vertices.push(Math.cos((i*Math.PI)/(this.slices/2)),Math.sin((i*Math.PI)/(this.slices/2)),0);
			this.vertices.push(Math.cos((i*Math.PI)/(this.slices/2)),Math.sin((i*Math.PI)/(this.slices/2)),1);
			this.vertices.push(Math.cos(((i+1)*Math.PI)/(this.slices/2)),Math.sin(((i+1)*Math.PI)/(this.slices/2)),0);
			this.vertices.push(Math.cos(((i+1)*Math.PI)/(this.slices/2)),Math.sin(((i+1)*Math.PI)/(this.slices/2)),1);
		}
	}
	*/


	for(i=0; i < this.slices;i++){/*
			this.indices.push(3+i*2,2+i*2,0+i*2);
			this.indices.push(0+i*2,1+i*2,3+i*2);
			*/
		/*this.indices.push(3+i*4,2+i*4,0+i*4);
		this.indices.push(0+i*4,1+i*4,3+i*4);*/
			}

 	/*this.normals = [
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, 1
 	];*/

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
