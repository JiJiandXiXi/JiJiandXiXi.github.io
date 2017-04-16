// JavaScript Document
	window.onload=function(){
		var rt=new imgRound("imgContainer",120,210,300,30,230,0.01);
		setInterval(function(){rt.roundMove()},20)
	}
	function imgRound(id,w,h,x,y,r,dv,rh,ah){
		if (ah==undefined) ah=1;
		if (rh==undefined) rh=10;
		var dv=dv*ah; //旋转速度
		var pi=3.1415926575;
		var d=pi/2;
		var pd=Math.asin(w/2/r);
		var smove=true;
		var imgArr=new Array();
		var objectId=id;
		var o=document.getElementById(objectId);
		o.style.position="relative";
		var arrimg=o.getElementsByTagName("img");
		var pn=arrimg.length; //图片数量
		var ed=pi*2/pn;
		for (n=0;n<arrimg.length;n++){
			var lk=arrimg[n].getAttribute("link");
			if (lk!=null) arrimg[n].setAttribute("title",lk)
			arrimg[n].onclick=function(){
				if (this.getAttribute("link")!=null){
					if (this.getAttribute("target")!="_blank") window.location=(this.getAttribute("link"))
					else window.open(this.getAttribute("link"))
				}
			}
			arrimg[n].onmouseout=function(){smove=true;}
			arrimg[n].onmouseover=function(){smove=false;}
			arrimg[n].style.position="absolute";
			imgArr.push(arrimg[n]);
		}
		this.roundMove=function(){
			for (n=0;n<=pn-1;n++){
				var o=imgArr[n];
				var ta=Math.sin(d+ed*n),strFilter;
				if (ta<0) o.style.left=Math.cos(d+ed*n-pd)*r+x+"px";
				else o.style.left=Math.cos(d+ed*n+pd)*r+x+"px";
				o.style.top=ta*rh+rh+y+"px";
				var zoom=Math.abs(Math.sin((d+ed*n)/2+pi/4))*0.5+0.5;
				o.style.width=Math.abs(Math.cos(d+ed*n+pd)-Math.cos(d+ed*n-pd))*zoom*r+"px";
				o.style.height=zoom*h+"px";
				if (ta<0) {ta=(ta+1)*80+20;o.style.zIndex=0;}
				else {ta=100;o.style.zIndex=1}
				if (o.style.zIndex<=0) strFilter="FlipH(enabled:true)"
				else strFilter="FlipH(enabled:false)";
				strFilter=strFilter+" alpha(opacity="+ta+")";
				o.style.opacity=ta/100;
				o.style.filter=strFilter;
			}
			if (smove) d=d+dv;
		}
	}
