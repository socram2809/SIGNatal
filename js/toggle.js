$(document).ready(function(){
	$(".active").click(function(){//esse metodo não pode ser permitido sem o usuário estar ligado
		$(".dropdown1").slideToggle();
		$(".dropdown2").slideToggle();
		$(".dropdown3").slideToggle();
		$("i",this).toggleClass("glyphicon glyphicon-chevron-down glyphicon glyphicon-chevron-right");
	});
	$(".dropdown1").click(function(){
		$(".ddropdown1").slideToggle();
		$("i",this).toggleClass("glyphicon glyphicon-minus glyphicon glyphicon-plus");
	});	
	$(".dropdown2").click(function(){
		$(".ddropdown2").slideToggle();
		$("i",this).toggleClass("glyphicon glyphicon-minus glyphicon glyphicon-plus");
	});	
	$(".dropdown3").click(function(){
		$(".ddropdown3").slideToggle();
		$("i",this).toggleClass("glyphicon glyphicon-minus glyphicon glyphicon-plus");
	});	
});