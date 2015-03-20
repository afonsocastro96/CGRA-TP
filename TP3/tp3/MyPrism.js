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

	for(i = 0; i < this.slices; i++){
		for(j = 0; j < this.stacks;j++){
		this.vertices.push(Math.cos((i*Math.PI)/(this.slices/2)),Math.sin((i*Math.PI)/(this.slices/2)),1/stacks);
		}
		this.vertices.push(Math.cos(((i+1)*Math.PI)/(this.slices/2)),Math.sin(((i+1)*Math.PI)/(this.slices/2)),0);
		this.vertices.push(Math.cos(((i+1)*Math.PI)/(this.slices/2)),Math.sin(((i+1)*Math.PI)/(this.slices/2)),1);
	}

	this.indices = [
	/*3,1,0,
 	0,2,3*/
	];

	for(i=0; i < this.slices;i++){
		this.indices.push(3+i*4,1+i*4,0+i*4);
		this.indices.push(0+i*4,2+i*4,3+i*4);
	}

 	/*this.indices = [
 	3,1,0,
 	0,2,3
 	];*/

 	/*this.normals = [
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, 1,
 	0, 0, 1
 	];*/

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
