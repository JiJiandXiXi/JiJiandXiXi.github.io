// JavaScript Document
function reSize()
{
	if(window.innerWidth<=1200)
	document.getElementById("pic_content").style.display="none";
	if(window.innerWidth>1200)
	document.getElementById("pic_content").style.display="block";
}
function dianwo(){
	alert("啊！你为什么要点人家呐！");
}
Item=function(UI){
	this.angle=0;
	this.UI=UI;
	this.update();
};
Item.ini={

	axle_w:400,
	axle_h:10,
	cen_x:500,
	cen_y:260

};
Item.prototype.update=function(){
	var J=this.UI.style,C=Item.ini,W=C.axle_w,H=C.axle_h,X=C.cen_x,Y=C.cen_y;
	var angle=this.angle/180*Math.PI;
	var left=Math.cos(angle)*W+X;
	var top=Math.sin(angle)*H+Y;
	var A=this.angle>270?this.angle-360:this.angle;
	var size=360-Math.abs(90-A)*3;
	this.UI.width=Math.max(size,120);
	var opacity=Math.max(10,size-180);
	J.filter='alpha(opacity='+opacity+')';
	J.opacity=opacity/100;
	J.left=(left-this.UI.offsetWidth/2)+'px';
	top=(top-this.UI.offsetHeight)+'px';
	J.top=top;
	J.zIndex=parseInt(size*100);

};
Nav_3D={

	items:[],
	dir:1,
	index:0,
	hover:false,
	add:function(item){
		this.items.push(item);
		item.index=this.items.length-1;
		item.UI.onclick=function (){
			var J=item.angle,M=Nav_3D;
			if(M.uping)return;
			if(J==90){
				return ;
			};
			M.wheel_90(item);
			M.index=item.index;
		};
		item.UI.onmouseover=function (){
			if(item.angle==90){
				Nav_3D.hover=true;
				clearTimeout(Nav_3D.autoTimer);
			};
		};
		item.UI.onmouseout=function (){
			if(item.angle==90){
				Nav_3D.hover=false;
				Nav_3D.auto();
			};
		};
		return this;
	},
	wheel_90:function(hot){
		if(this.uping)return;
		this.uping=true;
		var This=this;
		this.timer=setInterval(function (){
			clearTimeout(This.autoTimer);
			var A=hot.angle;
			This.dir=A<270&&A>90?-1:1;
			if(A==90){
				clearInterval(This.timer);
				This.uping=false;
				This.onEnd(hot);
			}
			if(A>270)A-=360;
			var set=Math.ceil(Math.abs((90-A)*0.1));
			for (var i=0;i<This.items.length;i++ ) {
				var J=This.items[i];
				J.angle+= (set*This.dir);
				J.update();
				if(J.angle>360)J.angle-=360;
				if(J.angle<0)J.angle +=360;
			};
		},15);
	},

	ready:function(){
		var J=this.items,step=parseInt(360/J.length);
		for (var i=0;i<J.length;i++) {J[i].angle=i*step+90;}
		this.wheel_90(this.items[0]);
		Nav_3D.prevHot=this.items[0].UI;
		Nav_3D.setHot();
	},

	setHot:function(isHot){
		if(!this.prevHot)return;
		with(this.prevHot.style){
			borderColor=isHot!==false?'#CC0000':'#00CCFF';
			cursor=isHot!==false?'default':"pointer";
		};
		return this;
	},
	
	auto:function(){
		this.index--;
		if(this.index<0)this.index=this.items.length-1;
		var J=this.items[this.index];
		this.setHot(false).prevHot=J.UI;
		this.setHot();
		this.wheel_90(J);
	},

	onEnd:function(hot){
		if(this.hover){
			return setTimeout(function(){Nav_3D.onEnd();},100);
		}
		this.autoTimer=setTimeout(function(){Nav_3D.auto();},1500);
	}

};
var imgs=document.getElementById("pics_3d").getElementsByTagName("IMG");
for (var i=0;i<imgs.length;i++ ) {
	Nav_3D.add(new Item(imgs[i]))
}
Nav_3D.ready();