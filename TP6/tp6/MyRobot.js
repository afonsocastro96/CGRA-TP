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
	this.head = new MyLamp(this.scene,20,20);
	this.arm1 = new MyCilinder(this.scene,20,20);
	this.circle3 = new MyCircle(this.scene,20);
	this.arm2 = new MyCilinder(this.scene,20,20);
	this.circle4 = new MyCircle(this.scene,20);

	/* Textura das jantes */
 	this.rims = new CGFappearance(this.scene);
	this.rims.loadTexture("resources/images/rim.jpg");
	this.rims.setDiffuse(0.2,0.2,0.2,1);
	this.rims.setSpecular(0.5,0.5,0.5,1);
	this.rims.setShininess(500);

	/* Textura das rodas */
 	this.wheel = new CGFappearance(this.scene);
	this.wheel.loadTexture("resources/images/wheel.png");
	this.wheel.setDiffuse(0.2,0.2,0.2,1);
	this.wheel.setSpecular(0.5,0.5,0.5,1);
	this.wheel.setShininess(500);

	/* R2-D2 */

	/* Textura do corpo */
 	this.r2d2Body = new CGFappearance(this.scene);
	this.r2d2Body.loadTexture("resources/images/r2d2-body.jpg");
	this.r2d2Body.setDiffuse(0.5,0.5,0.5,1);
	this.r2d2Body.setSpecular(0.5,0.5,0.5,1);
	this.r2d2Body.setShininess(500);

	/* Textura da cabeca */
 	this.r2d2Head = new CGFappearance(this.scene);
	this.r2d2Head.loadTexture("resources/images/r2d2-head2.png");
	this.r2d2Head.setDiffuse(0.5,0.5,0.5,1);
	this.r2d2Head.setSpecular(0.5,0.5,0.5,1);
	this.r2d2Head.setShininess(500);

	/* Woody */

	/* Cabeca */

	this.woody = new CGFappearance(this.scene);
	this.woody.loadTexture("resources/images/table.png");
	this.woody.setDiffuse(0.5,0.5,0.5,1);
	this.woody.setSpecular(0.5,0.5,0.5,1);
	this.woody.setShininess(500);

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
			this.x+= (1 + this.scene.speed / 100) * (Math.sin(this.angulo));
			this.z+= (1 + this.scene.speed / 100) * (Math.cos(this.angulo));
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

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y+0.3,this.z);
		this.scene.rotate(this.angulo,0,1,0);

	/* Corpo */
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.scene.scale(1,1,4);
		if(this.scene.currRobotAppearance == 'R2D2'|| this.scene.currRobotAppearance == 0)
			this.r2d2Body.apply();
		else if(this.scene.currRobotAppearance == 'Woody')
			this.woody.apply();
		this.body.display();
	this.scene.popMatrix();

	/* Topo do corpo (circulo) */
	this.scene.pushMatrix();
		this.scene.rotate(-Math.PI/2,1,0,0);
		this.circle.display();
	this.scene.popMatrix();

	/* Roda 1 */

	this.scene.pushMatrix();
		this.scene.translate(1,0.1,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(0.5,0.5,0.5);
		this.wheel.apply();
		this.wheel1.display();
		this.scene.translate(0,0,1);
		this.rims.apply();
		this.circle1.display();
	this.scene.popMatrix();

	/* Roda 2 */

	this.scene.pushMatrix();
		this.scene.translate(-1,0.1,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(0.5,0.5,0.5);
		this.wheel.apply();
		this.wheel2.display();
		this.scene.translate(0,0,1);
		this.rims.apply();
		this.circle2.display();
	this.scene.popMatrix();

	/* Cabeca */

	this.scene.pushMatrix();
		this.scene.translate(0,4,0);
		this.scene.rotate(-Math.PI/2,1,0,0);
		console.log(this.scene.currRobotAppearance);
		if(this.scene.currRobotAppearance == 'R2D2' || this.scene.currRobotAppearance == 0)
			this.r2d2Head.apply();
		else if(this.scene.currRobotAppearance == 'Woody')
			this.woody.apply();
		this.head.display();
	this.scene.popMatrix();

	/* Braco 1 */

	this.scene.pushMatrix();
		this.scene.translate(-0.9,2,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(0.5,1,0.5)
		this.arm1.display();
	this.scene.popMatrix();

	/* Circulo do braço 1*/

	this.scene.pushMatrix();
		this.scene.translate(-1.4,2,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(0.5,1,0.5)
		this.circle3.display();
	this.scene.popMatrix();

	/* Braco 2 */

	this.scene.pushMatrix();
		this.scene.translate(1.5,2,0);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(0.5,1,0.5)
		this.arm2.display();
	this.scene.popMatrix();

	/* Circulo do braço 2 */

	this.scene.pushMatrix();
		this.scene.translate(1.5,2,0);
		this.scene.rotate(Math.PI/2,0,1,0);
		this.scene.scale(0.5,1,0.5)
		this.circle4.display();
	this.scene.popMatrix();
};