/**
 * MyRobot
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyRobot(scene,x,y,z,angulo) {
	CGFobject.call(this,scene);

	this.x = x;
	this.y = y;
	this.z = z;
	this.angulo = angulo;
	this.body = new MyCilinder(this.scene,20,20);
	this.circle = new MyCircle(this.scene,20);
	this.wheel1 = new MyCilinder(this.scene,20,20);
	this.circle1 = new MyCircle(this.scene,20);
	this.wheel2 = new MyCilinder(this.scene,20,20);
	this.circle2 = new MyCircle(this.scene,20);

	this.initBuffers();
};

MyRobot.prototype = Object.create(CGFobject.prototype);
MyRobot.prototype.constructor=MyRobot;

MyRobot.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0.3, 0,
            -0.5, 0.3, 0,
            0, 0.3, 2,
			];

	this.indices = [
            0, 1, 2,
        ];    
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

MyRobot.prototype.moveRobot = function (direction){
	switch(direction){
		case 0:
			console.log(this.scene.speed);
			this.x+= (1 + this.scene.speed / 10) * (Math.sin(this.angulo));
			this.z+= (1 + this.scene.speed / 10) * (Math.cos(this.angulo));
			break;
		case 1:
			console.log(this.scene.speed);
			this.x+= -(1 + this.scene.speed / 10) * (Math.sin(this.angulo));
			this.z+= -(1 + this.scene.speed / 10) * (Math.cos(this.angulo));
			break;
		case 2:
			this.angulo+=Math.PI/6;
			break;
		case 3:
			this.angulo-=Math.PI/6;
			break;
	}
	this.scene.translate()
}

MyRobot.prototype.display = function () {

	/* Cilindro */

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y+4,this.z);
		this.scene.scale(1,4,1);
		this.scene.rotate(Math.PI/2,1,0,0);
		this.body.display();
	this.scene.popMatrix();

	/* Circulo */
	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y+4,this.z);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.circle.display();
	this.scene.popMatrix();

	/* Roda 1 */

	this.scene.pushMatrix();
		this.scene.translate(this.x+1.5,this.y+0.1,this.z);
		this.scene.scale(0.5,0.5,0.5);
		this.scene.rotate(-Math.PI/2+this.angulo,0,1,0);
		this.wheel1.display();
	this.scene.popMatrix();

	/* Circulo da roda */
	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y+0.1,this.z);
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.circle.display();
	this.scene.popMatrix();

	/* Roda 2 */

	this.scene.pushMatrix();
		this.scene.translate(this.x-1,this.y+0.1,this.z);
		this.scene.scale(0.5,0.5,0.5);
		this.scene.rotate((-Math.PI/2)+this.angulo,0,1,0);
		this.wheel2.display();
	this.scene.popMatrix();

    /*this.scene.pushMatrix();
    	this.scene.translate(this.x,this.y,this.z);
    	this.scene.rotate(this.angulo,0,1,0);
    	this.drawElements(this.primitiveType);
	this.scene.popMatrix();*/
};