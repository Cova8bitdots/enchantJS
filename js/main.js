enchant();
window.onload = preload;


var game,scene,player;
var Img_Ary;

function preload(){
     game = new Game(320,320);
     game.fps=30;
    Img_Ary=['./img/chara1.png',
	     './img/chara2.png',
	     './img/chara3.png',
	     './img/chara4.png',
	     './img/chara5.png',
	     './img/ColorTile.png'
	    ];
     
    game.preload(Img_Ary);    
     game.onload = initialize;
     game.start();
}

var MoveFlag=0;

function initialize(){
    
    scene = new Scene();
    scene.backgroundColor = '#f68845';
    game.pushScene(scene);

    
    player = new Array();
    var Len=5;
    
    for(var i=0; i<Len; i++){
	player[i] = new Sprite(32,32);
	player[i].image = game.assets['./img/ColorTile.png'];
	player[i].frame= i%8;
	player[i].x=i*32;
	player[i].y=i*32;
	player[i].addEventListener(Event.TOUCH_START,INTER_RECT);
	player[i].addEventListener(Event.TOUCH_MOVE,function(e){
				if(MoveFlag){this.x=e.x-dx;this.y=e.y-dy;}
			    });

	scene.addChild(player[i]);
    }
    main();
}//end of initialize()
   
var dx=0,dy=0;
function main(){
   
}


function INTER_RECT(e){
    if((this.x -16<= e.x) &&(e.x<= this.x + 40) &&
       (this.y -16<= e.y) &&(e.y<= this.y + 40) 
      ){
	  MoveFlag=1;
	  dx = e.x-this.x;
	  dy = e.y-this.y;
      }
    else {
	MoveFlag=0;
	dx=0;
	dy=0;
    }
}