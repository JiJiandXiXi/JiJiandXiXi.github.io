// JavaScript Document
var bookI=2;
function changeIt(a)
{
	if(a.className=="book book-page-box"||a.className=="book book-page-box bookTurnRe")
	{a.className="book book-page-box-re bookTurn";
	a.style.zIndex=bookI;bookI+=1;}
	else if(a.className=="book book-page-box-re bookTurn")
	{a.className="book book-page-box bookTurnRe";
	a.style.zIndex=bookI;bookI-=1;}	
}
function reSize()
{
	var a=(window.innerWidth-1456)/2;
	a+="px"
	document.getElementById("bookTest").style.marginLeft=a;
}