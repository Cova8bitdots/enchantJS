/* CLASS CHARACTER
 * This has members : sprite       :: sprite object from EnchantJS
 *                  : selectedFlag :: Flag:whether is selected or not
 *                  : can_move     :: Flag:whether this object can move or not
 *                  : collisionFlag:: Flag:if this object is collision to others
 *                  : haveFlag     :: Flag:the object has a Flag or not
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
       this.haveFlag=0;
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
      if((this.x <= e.x) &&(e.x<= this.x + this.width) &&
       (this.y <= e.y) &&(e.y<= this.y + this.height) 
      ){
	  this.selectedFlag=1;
	  this.can_move=0;
	  this.collision =0;
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
    /* Out of main window*/
    if(e.x<0 || game.width < e.x || e.y<0 || game.height < e.y ){
	this.can_move=1;
	this.index =0;
	this.opacity=0.8;
    }else{
	/* Within the main window*/
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
}



/* Driven by End of clicking or dragging
 * 
 */
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
}


var UpdateClk = 5;
var tick=0;
function DRAW_TRAJECTORY(e){

    if( (this.index < this.trajectory.length) && 
	(this.selectedFlag==1) && (this.can_move ==1)){
	// Moving
	var dx=0,dy=-1;
	if( Math.round(Math.abs(this.x - this.trajectory[this.index]['x'])) >
	    Math.round(Math.abs(this.y - this.trajectory[this.index]['y'])) )
	{//horizontal moving
	    dx = this.trajectory[this.index]['x']-this.x <0 ? -1:
		this.trajectory[this.index]['x']-this.x ==0 ? 0:
		1;
	    if(map.hitTest(this.x+dx,this.y)  || map.hitTest(this.x+dx+this.width-1,this.y)||
	       map.hitTest(this.x+dx,this.y+this.height-1) || map.hitTest(this.x+dx+this.width-1,this.y+this.height-1) || CHECK_COLLISION(dx,dy,this))
	    {//will be collision
	    	dx =0;
	    	//this.can_move=0;
		/* update point to avoid collision*/
		if(this.index +1< this.trajectory.length)
		{
		if(this.trajectory[this.index]['y'] == this.trajectory[this.index+1]['y']) this.can_move =0;
		this.trajectory[this.index]['x'] = this.x;
		this.trajectory[this.index]['y'] = this.trajectory[this.index+1]['y'];
		}
		else
		{
		    this.can_move =0;
		}
	    }
		this.x += dx;
	    // update image frame 
	    if( ( Math.round(Math.abs(this.x - this.trajectory[this.index]['x'])) %5 ==0) )DrawImageFrame(dx,0,this);
	}else{ //vertical Moving
	    dy = this.trajectory[this.index]['y']-this.y <0 ? -1
		: this.trajectory[this.index]['y']-this.y == 0 ? 0
		: 1;

	    if(map.hitTest(this.x,this.y+dy) || map.hitTest(this.x+this.width-1,this.y+dy) ||
	       map.hitTest(this.x,this.y+dy+this.height-1)||map.hitTest(this.x+this.width-1,this.y+dy+this.height-1) || CHECK_COLLISION(dx,dy,this))
	    {//will be collision
	    	dy =0;
	    	//this.can_move=0;
		/* update point to avoid collision*/
		if(this.index +1< this.trajectory.length)
		{
		    if(this.trajectory[this.index]['x'] == this.trajectory[this.index+1]['x']) this.can_move =0;
		this.trajectory[this.index]['y'] = this.y;
		this.trajectory[this.index]['x'] = this.trajectory[this.index+1]['x'];
		}
		else
		{
		    this.can_move =0;
		}
	    }
	    
	    this.y += dy;
	    // update image frame 
	    if( ( Math.round(Math.abs(this.y - this.trajectory[this.index]['y'])) %5 ==0) )
		DrawImageFrame(0,dy,this);
	}

	if( ( Math.round(Math.abs(this.x - this.trajectory[this.index]['x'])) <= 1)&& 
	    ( Math.round(Math.abs(this.y - this.trajectory[this.index]['y'])) <= 1) )
	  {
	    this.index++; 
	  }
	if(this.index >= this.trajectory.length || (this.can_move==0) )
	{//Object arrived at distination ,thus Moving ended.
	    this.frame =  this.frame%3==0? this.frame+1
		:this.frame %3 == 2 ? this.frame-1
		:this.frame; 
	    this.selectedFlag=0;
	    this.can_move=0;	
	    this.opacity=1.0;
	    this.trajectory.length =0;
	    this.index=0;
	}
    } 
}


function CHECK_MAPTILE(){
    /* set the blue tile(mapdata =  3) enable to get flags
     * set the red tile(mapdata = 2) as owned Aera
     */
    
    
    if( map.checkTile(this.x+this.width/2,this.y+this.height/2) == 2)
    {
	this.haveFlag=1;
    }

    if(map.checkTile(this.x+this.width/2,this.y+this.height/2) == 3 && this.haveFlag)
    {
	alert("Take the Flag !!");
	this.haveFlag=0;
    }
}

/* DrawImageFrame(dx,dy,obj)
 * 
 * dx : amount of moving toward x-axis
 * dy : amount of moving toward y-axis
 * obj: this object
 * 
 */
function DrawImageFrame(dx,dy,obj){
    if( dx <0 && dy==0)//moving left
    {
	if( (obj.frame<9) || (11<obj.frame))obj.frame=10;
	if(obj.frame == 9)obj.direction=1;
	else if(obj.frame==11)obj.direction=-1;
	obj.frame += obj.direction;
    }
    else if(0<dx && dy ==0)
    {//Move Right
	if( (obj.frame<18) || (20<obj.frame))obj.frame=19;
	if(obj.frame == 18)obj.direction=1;
	else if(obj.frame==20)obj.direction=-1;
	obj.frame += obj.direction;
    }
    if(dx==0 && dy < 0)//moving up
    {
	if( (obj.frame<27) || (29<obj.frame))obj.frame=28;
	if(obj.frame == 27)obj.direction=1;
	    else if(obj.frame==29)obj.direction=-1;
	obj.frame += obj.direction;
    }
    else if(dx ==0 && dy>0)//Move down
    {
	if( (obj.frame<0) || (2<obj.frame))obj.frame=1;
	if(obj.frame == 0)obj.direction=1;
	else if(obj.frame==2)obj.direction=-1;
	obj.frame += obj.direction;
    }
}



var COLLISION_DISTANCE = 32;//*Math.sqrt(2);
function CHECK_COLLISION(dx,dy,obj){
    obj.x += dx;
    obj.y += dy;

    for(var i=0; i<player.length; i++)
    {
	var others = player[i];
	if(obj == others)continue;
	/*check collision, if true, stop moving*/
	if( others.intersect(obj)  )
	//if( others.within(obj,COLLISION_DISTANCE)  )
	{
	    obj.collisionFlag=1;
	    obj.x -= dx; obj.y -=  dy;
	    return true;
	}
    }
    obj.x -= dx; obj.y -=  dy;
    this.collisionFlag=0;
    return false;
}


function DEBUG(){
  document.getElementById("status").innerHTML=
	"Obj1:("+player[0].x+","+player[0].y+")"+
	"Obj2:("+player[1].x+","+player[1].y+")"+
	"Obj3:("+player[2].x+","+player[2].y+")"+"<br>"+

	"Obj1:("+(player[0].x+player[0].width-1)+","+(player[0].y+player[0].height-1)+")"+
	"Obj2:("+(player[1].x+player[1].width-1)+","+(player[1].y+player[1].height-1)+")"+
	"Obj3:("+(player[2].x+player[2].width-1)+","+(player[2].y+player[2].height-1)+")"+"<br>"+

	"Tile status: "+map.checkTile(player[0].x,player[0].y)+"  :  "+
	map.checkTile(player[1].x,player[1].y)+"  :  "+
	map.checkTile(player[2].x,player[2].y)+" <br>"+
	"Collision Tile?: "+map.hitTest(player[0].x,player[0].y)+" "+map.hitTest(player[0].x+player[0].width-1,player[0].y+player[0].height-1)+" :  "+
	map.hitTest(player[1].x,player[1].y)+" "+map.hitTest(player[1].x+player[1].width-1,player[1].y+player[1].height-1)+" :  "+
	map.hitTest(player[2].x,player[2].y)+" "+map.hitTest(player[2].x+player[2].width-1,player[2].y+player[2].height-1)+"<br>"+

	"---------------------------------------------------------<br>"+
	"frame: "+player[0].frame+"  :  "+player[1].frame+"  :  "+player[2].frame+" <br> "+
	"selectedFlag: "+player[0].selectedFlag+"  :  "+player[1].selectedFlag+"  :  "+player[2].selectedFlag+" <br> "+
	"can_move ?: "+player[0].can_move+"  :  "+player[1].can_move+"  :  "+player[2].can_move+" <br> "+
	"Collision ?: "+player[0].collisionFlag+"  :  "+player[1].collisionFlag+"  :  "+player[2].collisionFlag+" <br> "+
	"Have Flag?: "+player[0].haveFlag+"  :  "+player[1].haveFlag+"  :  "+player[2].haveFlag+" <br> "+
	"---------------------------------------------------------<br>"+
	"length: "+player[0].trajectory.length+"  :  "+player[1].trajectory.length+"  :  "+player[2].trajectory.length+" <br> "+
	"index: "+player[0].index+"  :  "+player[1].index+"  :  "+player[2].index+" <br> ";
    
    
    
    var text="(x,y,dist)=";
    var len = Math.max(player[0].trajectory.length,player[1].trajectory.length,player[2].trajectory.length);
    for(var i=0; i<len; i++){
	if(0< player[0].trajectory.length && i < player[0].trajectory.length )
	    text += "("+player[0].trajectory[i]['x']+","+player[0].trajectory[i]['y']+","+player[0].trajectory[i]['dist']+")";
	if(0<player[1].trajectory.length &&i<player[1].trajectory.length)
	    text += "("+player[1].trajectory[i]['x']+","+player[1].trajectory[i]['y']+","+player[1].trajectory[i]['dist']+")";
	if(0<player[2].trajectory.length && i<player[2].trajectory.length)
	    text += "("+player[2].trajectory[i]['x']+","+player[2].trajectory[i]['y']+","+player[2].trajectory[i]['dist']+")";
	text+= "<br>";
    }
    document.getElementById("data").innerHTML=text;
    
}