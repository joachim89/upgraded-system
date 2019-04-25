let x = 3;
let y = 4;
let epx = 7;
let epy = 8;
let h = 400;
let w = 400;
let sz = 20;
let snakx = [];
let snaky = [];
let len = 1;
let points = 0;
let nx = 0;
let ny = 1;
let count=0;
let speed = 10;
let space = 0;
let mov=true;
let lines = [];
let saveScore = [];
let dead=false;
let mouse=true;
const pont = document.getElementById("poeng");

function checkKollisjon(){
	//console.log("initiate kollisjonssjekk...");
		for(let i=0; i < len; i++){
			//console.log("check: #" + i);
			if(snaky[i] == epy && snakx[i]==epx){
				console.log("Eplekræsj");
				console.log(y + "y - x" +x);
				console.log(snaky[i] + "sy - sx" +snakx[i]);
				return true;
				break;
			}
		}
	return false;
}
function checkKollisjon2(){
	//console.log("initiate kollisjonssjekk...");
		for(let i=0; i < len; i++){
			//console.log("check: #" + i);
			if(snaky[i] == y && snakx[i]==x){
				return true;
				break;
			}
		}
	return false;
}
function setup(){
	createCanvas(windowWidth, windowHeight);
	//frameRate(15);
	lines = loadStrings("highscore.txt");
	console.log(lines);

}
function draw(){
	//translate(100,10);
	if(mouseIsPressed){
		mouse=true;
	}
	if(keyIsDown(UP_ARROW)||keyIsDown(LEFT_ARROW)||keyIsDown(RIGHT_ARROW)||keyIsDown(DOWN_ARROW)){
		mouse=false;
	}
	noStroke();
	if(points > lines[0]){
			saveScore.unshift(points);
			lines.unshift(points);
			//saveStrings(saveScore,"highscore.txt" );
	}
	background(245,245,220);
	fill(0)
	rect(0,0,w,h);
		if(count % round(speed) == 0 && !dead){
		snakx.unshift(x);
	snaky.unshift(y);
	
	x+=nx;
	y+=ny;
	
	}
	if(checkKollisjon2()){
			fill(100,10,100);
		console.log("HIT!");		
		rect(0,0,w,h);
		dead = true;
	}

	if(x<0){
		x=(w/sz)-1;
	}
	if(x>(w/sz)-1) {
			x=0;
	}
	if(y<0){
		y=(h/sz)-1;
	}
	if(y>(h/sz)-1) {
			y=0;
	}

	
	
	
	//EPLE: 
	fill(0,255,0);
	rect((w/sz)*epx,(h/sz)*epy,(w/sz)-space,(h/sz)-space);
	
	if(x==epx && y == epy){
		points++;
		len++;
		epx = round(random((w/sz)-1));
		epy = round(random((h/sz)-1));
		if(checkKollisjon()){
			epx = round(random((w/sz)-1));
			epy = round(random((h/sz)-1));
		}
		//speed-=.1;
	}
		//HODE: 
	fill(255,0,0);
	rect((w/sz)*x,(h/sz)*y,(w/sz)-space,(h/sz)-space);
	
	
	
	
	// MAGE: 
	
	for(b=0;b<len;b++){
		
		fill(map(b,0,len,200,50),0,0);
		rect((w/sz)*snakx[b],(h/sz)*snaky[b],(w/sz)-space,(h/sz)-space);
	}
	//HALE:
	fill(100,10,100);
	rect((w/sz)*snakx[len],(h/sz)*snaky[len],(w/sz)-space,(h/sz)-space);
	//MOVES:
	if(!mov && !dead){
	if(keyIsDown(LEFT_ARROW)&&!keyIsDown(UP_ARROW)&&!keyIsDown(DOWN_ARROW)&&!keyIsDown(RIGHT_ARROW)){
		if(nx==0){
			nx=-1;
			ny=0;
			mov=true;
		}
	
		
	}
	if(keyIsDown(RIGHT_ARROW)&&!keyIsDown(UP_ARROW)&&!keyIsDown(DOWN_ARROW)&&!keyIsDown(LEFT_ARROW)){
		if(nx==0){
			nx=1;
			ny=0;
			mov=true;
		}
	}
	if(keyIsDown(UP_ARROW)&&!keyIsDown(LEFT_ARROW)&&!keyIsDown(DOWN_ARROW)&&!keyIsDown(RIGHT_ARROW)){
		if(ny==0){
		ny=-1;
		nx=0;
		mov=true;
		}
	}
	if(keyIsDown(DOWN_ARROW)&&!keyIsDown(UP_ARROW)&&!keyIsDown(LEFT_ARROW)&&!keyIsDown(RIGHT_ARROW)){
		if(ny==0){
		ny=1;
		nx=0;
		mov=true;
		}
	}
	}
	if(mouse){
		fill(255,50,50,80);
		rectMode(CENTER);
		rect((windowWidth/2)-25,windowHeight-(windowHeight/3),25,25); //Venstre knapp
		
		rect((windowWidth/2)+25,windowHeight-(windowHeight/3),25,25); //Høyre knapp
		fill(50,255,50,80);
		rect((windowWidth/2),windowHeight-(windowHeight/3)-25,25,25); // Opp knapp
		rect((windowWidth/2),windowHeight-(windowHeight/3)+25,25,25); //Ned knapp
		rectMode(CORNER)
	}
	if(mouseIsPressed){
		distX = (windowWidth/2) - mouseX;
		distY = (windowHeight-(windowHeight/3)) - mouseY;
		if(abs(distX) > abs(distY)){
			if(nx==0){
			ny=0;
			if(distX<0){
					nx=1;
			}else{
					nx=-1;
			}
		}
		}else{
			if(ny==0){
			nx=0;
			if(distY<0){
					ny=1;
			}else{
					ny=-1;
			}
		}
		}
	}
	
	

	mov= false;
	count++;
	//pont.textContent = points;
		fill(255,255,0);
	document.title= "SNAK: POINTS: " +points;
		text("Poeng: " + points,30,20);
	text("Snak: " + snakx[0],30,30);
	text("HISCORE: " + lines[0],30,40);
		if(dead){
		fill(0,0,0,50);
		rect(0,(h/2)-50,w,100);
		fill(255);
		textAlign(CENTER);
		text("GAME OVER.\npress space to try again",w/2,(h/2)-10);
		if(keyIsDown(32)||mouseIsPressed){
			len=1;
			points=0;
			x=4;
			y=4;
			dead=false;
			
		}
		}else{
			textAlign(LEFT);
		}
}



function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
  }
  