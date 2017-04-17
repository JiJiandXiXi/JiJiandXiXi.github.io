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
	var b=(window.innerWidth-1456)/2;
	b+="px"
	document.getElementById("bookTest").style.marginLeft=b;
}
