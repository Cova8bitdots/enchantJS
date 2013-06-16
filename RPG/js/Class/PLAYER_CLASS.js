/* CLASS CHARACTER
 * This has members : sprite       :: sprite object from EnchantJS
 *                  : selectedFlag :: Flag whether is selected or not
 *                  : can_move     :: Flag whether this object can move or not
 *                  :  
 *                  :  
 * 
 */
function _2DimPoint()
{
    this.x=0;
    this.y=0;
}


/* Define new Class */
var CHARACTER = enchant.Class.create(enchant.Sprite,
{
   initialize:function(x,y,img,frame){
       /* Sprite from enchantJS*/    
       enchant.Sprite.call(this,32,32);
       this.x = x;
       this.y = y;
       this.image = img;
       /* image direction   -1:left  1:right  3:   4:   */
       this.direction=1;
       this.frame = frame;

       /*  Flags  */
       this.selectedFlag=0;
       this.can_move=0;
       this.collisionFlag=0;
       /* To remember Trajectory*/
       index = 0;
       this.trajectory = new Array();
       this.index=0;

       /* difference between point of center of sprite and touched point*/
       this.diff= new _2DimPoint();
       this.diff.x=0;
       this.diff.y=0;
   }     
});


/* Method which check if this object is selected or not
 * 
 * 
 * 
 * 
 * 
 */
function IS_SELECTED(e){
      if((this.x -16<= e.x) &&(e.x<= this.x + 40) &&
       (this.y -16<= e.y) &&(e.y<= this.y + 40) 
      ){
	  this.selectedFlag=1;
	  this.can_move=0;
	  this.diff.x = Math.round(e.x) - this.x;
	  this.diff.y = Math.round(e.y) - this.y;

	  /*init trajectory array*/
	  this.trajectory.length=0;
	  /* set first position */
	  this.trajectory[0]=new Array();
	  this.trajectory[0]['x'] = Math.round(e.x)-this.diff.x;
	  this.trajectory[0]['y'] = Math.round(e.y)-this.diff.y;
	  /* easy to see being selected*/
	  this.opacity = 0.5;
      }
    else{//Not selected
	this.selectedFlag=0;
	this.diff.x=0;
	this.diff.y=0;
    }
}


var radius = 30;
function TRACE_TRAJECTORY(e){
    if(this.selectedFlag  && this.can_move == 0){
	var text="Trajectory dx="+this.diff.x+",dy="+this.diff.y+
	    "length="+this.trajectory.length+"   <br>";
	for(var i=0; i<this.trajectory.length; i++){
	    text += "(x,y,dist)=("+this.trajectory[i]['x']+","+
		this.trajectory[i]['y']+","+
    		this.trajectory[i]['dist']+")<br>";
	}
    	document.getElementById("data").innerHTML=text;

	var E_x = Math.round(e.x)-this.diff.x,
        E_y = Math.round(e.y)-this.diff.y;
	var dist = Math.sqrt( Math.pow(this.trajectory[this.index]['x'] - E_x ,2)
			     +Math.pow(this.trajectory[this.index]['y'] -E_y ,2) ); 
                           //       ________________________________
	if( dist > radius){// if ^/(prev.x-e.x)^2 +(prev.y - e.y)^2 > radius
	    this.index++;
	    this.trajectory[this.index] = new Array();
	    this.trajectory[this.index]['x'] = Math.round(e.x)-this.diff.x;
	    this.trajectory[this.index]['y'] = Math.round(e.y)-this.diff.y;
	    this.trajectory[this.index]['dist']=Math.round(dist);
	}    
    }
}


var direction;
function END_TRAJECTORY(e){
    this.can_move=1;
    
    this.index++;
    this.trajectory[this.index] = new Array();
    this.trajectory[this.index]['x'] = Math.round(e.x)-this.diff.x;
    this.trajectory[this.index]['y'] = Math.round(e.y)-this.diff.y;
      //init index
    this.index =0;

    if(this.trajectory[this.index]['x'] - this.x < 0){
	this.frame=10;
	this.direction=-1;
    }
    else{
	this.frame=19;
	this.direction=-1;
    }
    this.opacity=0.8;
    // var text="Trajectory dx="+this.diff.x+",dy="+this.diff.y+
    // 	"length="+this.trajectory.length+"   <br>";
    // for(var i=0; i<this.trajectory.length; i++){
    // 	text += "(x,y,ex,ey,dist)=("+this.trajectory[i]['x']+","+this.trajectory[i]['y']+
    // 	    ","+this.trajectory[i]['ex']+","+this.trajectory[i]['ey']+","+
    // 	    this.trajectory[i]['dist']+")<br>";
    // 	document.getElementById("data").innerHTML=text;
    // }
}


var UpdateClk = 5;
var tick=0;
function DRAW_TRAJECTORY(e){

    if( (this.index < this.trajectory.length) && 
	(this.selectedFlag==1) && (this.can_move ==1)){
	// Moving
	if( Math.round(Math.abs(this.x - this.trajectory[this.index]['x'])) >
	    Math.round(Math.abs(this.y - this.trajectory[this.index]['y'])) ){//horizontal moving
		var dx = this.trajectory[this.index]['x']-this.x <0 ? -1:1;
	    if(this.trajectory[this.index]['x']-this.x <0 )
	    {//Move left
		this.x += dx;
		if( ( Math.round(Math.abs(this.x - this.trajectory[this.index]['x'])) %5 ==0) )
		{
		    if( (this.frame<9) || (11<this.frame))this.frame=10;
		    if(this.frame == 9)this.direction=1;
		    else if(this.frame==11)this.direction=-1;
		    this.frame += this.direction;
		}
	    }else if (this.trajectory[this.index]['x'] - this.x > 0 ){//Move Right
		this.x+= dx;

		if( ( Math.round(Math.abs(this.x - this.trajectory[this.index]['x'])) %5 ==0) ){
		    if( (this.frame<18) || (20<this.frame))this.frame=19;
		    if(this.frame == 18)this.direction=1;
		    else if(this.frame==20)this.direction=-1;
		    this.frame += this.direction;
		}
	    }
	}else{ //vertical Moving
	    if(this.trajectory[this.index]['y']-this.y <0 )//Move up
	    {
		this.y--;
		if( ( Math.round(Math.abs(this.y - this.trajectory[this.index]['y'])) %5 ==0) )
		{
		    if( (this.frame<27) || (29<this.frame))this.frame=28;
		    if(this.frame == 27)this.direction=1;
		    else if(this.frame==29)this.direction=-1;
		    this.frame += this.direction;
		}
		
	    }else if (this.trajectory[this.index]['y'] - this.y > 0 ){//Move Right
		this.y++;
		if( ( Math.round(Math.abs(this.y - this.trajectory[this.index]['y'])) %5 ==0) ){
		    if( (this.frame<0) || (2<this.frame))this.frame=1;
		    if(this.frame == 0)this.direction=1;
		    else if(this.frame==2)this.direction=-1;
		    this.frame += this.direction;
		}
	    }
	}

	if( ( Math.round(Math.abs(this.x - this.trajectory[this.index]['x'])) <= 1)&& 
	    ( Math.round(Math.abs(this.y - this.trajectory[this.index]['y'])) <= 1) )
	  {
	    this.index++; 
	  }
	if(this.index >= this.trajectory.length || CHECK_COLLISION(this) )
	{//Object arrived at distination ,thus Moving ended.
	    this.frame =  this.frame%3==0? this.frame+1
		:this.frame %3 == 2 ? this.frame-1
		: this.frame; 
	    this.selectedFlag=0;
	    this.can_move=0;	
	    this.opacity=1.0;
	    this.trajectory.length =0;
	    this.index=0;
	}
    }
    
}


function DrawImageFrame(dx,obj){
    	if( dx <0 )//moving left
		{
		    if( (obj.frame<9) || (11<obj.frame))obj.frame=10;
		    if(obj.frame == 9)obj.direction=1;
		    else if(obj.frame==11)obj.direction=-1;
		    obj.frame += obj.direction;
		}
    else{//Move Right
	if( (obj.frame<18) || (20<obj.frame))obj.frame=19;
	if(obj.frame == 18)obj.direction=1;
	else if(obj.frame==20)obj.direction=-1;
	obj.frame += obj.direction;
    }


}



var COLLISION_DISTANCE = 32;//*Math.sqrt(2);
function CHECK_COLLISION(obj){
    if(obj.trajectory.length < 0 ) return false;
    var dx = obj.trajectory[this.index]['x']-obj.x <0 ? -1:1,
    dy= obj.trajectory[this.index]['y']-obj.y <0 ? -1:1;
    for(var i=0; i<player.length; i++)
    {
	var others = player[i];
	if(obj == others)continue;
	/*check collision, if true, stop moving*/
	//if( others.intersect(obj)  )
	if( others.within(obj,COLLISION_DISTANCE)  )
	{
	    alert("COLLISION");
	    obj.collisionFlag=1;
	    obj.x -= dx; obj.y -=  dy;
	    return true;
	}
    }
    this.collision=0;
    return false;
}





function DEBUG(){
  document.getElementById("status").innerHTML=
	"Obj1:("+player[0].x+","+player[0].y+")"+
	"Obj2:("+player[1].x+","+player[1].y+")"+
	"Obj3:("+player[2].x+","+player[2].y+")"+"<br>"+
	"Tile status: "+map.checkTile(player[0].x,player[0].y)+"  :  "+
	map.checkTile(player[1].x,player[1].y)+"  :  "+
	map.checkTile(player[2].x,player[2].y)+" <br>"+
	"Collision Tile?: "+map.hitTest(player[0].x,player[0].y)+"  :  "+
	map.hitTest(player[1].x,player[1].y)+"  :  "+
	map.hitTest(player[2].x,player[2].y)+" <br>"+
	"---------------------------------------------------------<br>"+
	"frame: "+player[0].frame+"  :  "+player[1].frame+"  :  "+player[2].frame+" <br> "+
	"selectedFlag: "+player[0].selectedFlag+"  :  "+player[1].selectedFlag+"  :  "+player[2].selectedFlag+" <br> "+
	"can_move ?: "+player[0].can_move+"  :  "+player[1].can_move+"  :  "+player[2].can_move+" <br> "+
"Collision ?: "+player[0].collisionFlag+"  :  "+player[1].collisionFlag+"  :  "+player[2].collisionFlag+" <br> "+
	"---------------------------------------------------------<br>"+
	"length: "+player[0].trajectory.length+"  :  "+player[1].trajectory.length+"  :  "+player[2].trajectory.length+" <br> "+
	"index: "+player[0].index+"  :  "+player[1].index+"  :  "+player[2].index+" <br> ";

    document.getElementById("status").innerHTML += "<br>---------------------------------------------------------<br>map<br>";

    var text="";
    for(var j=0; j<map.length; j++){
    	text += "<br>";
    	for(var i=0; i<map[0].length; i++)
    	    text += map[j][i].frame+",";
    }
    document.getElementById("status").innerHTML += text;


    document.getElementById("status").innerHTML += "<br>---------------------------------------------------------<br>collision map<br>";
    text="";
    for(var j=0; j<map.length; j++){
	text += "<br>";
	for(var i=0; i<map[0].length; i++)
	    text += map.collisionData[j][i]+",";
    }
    document.getElementById("status").innerHTML += text;
    // == 1)map[j][i].collisionData=0;
    // else map[j][i].collisionData=1;
	
}