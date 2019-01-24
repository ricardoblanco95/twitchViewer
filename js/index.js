
$(document).ready(function(){
  var users = ["auslove","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "vinesauce"];
  var verify = false;
  var html = "";
  var htmlAll="";
  var htmlOn="";
  var htmlOff="";
  var status="";
  var url = "";
  var profilePic="";
  var game="";
  var gameArr=[];
  var statusArr=[];
  var urlArr =[];
  var logoArr=[];
  var apiUrlArr=[];
  /* ORDERED ARRAYS FOR THE HTML CODE */ var statusOrdArr = []; var gameOrdArr = []; var urlOrdArr = []; var logoOrdArr = [];
  
    for(var j = 0; j <users.length; j++){
	  $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + users[j], function(data){
      
		 if(data.stream!==null){
         statusArr.push('online'); 
         gameArr.push(data.stream.game);
         
         }else{
         statusArr.push('offline');
         gameArr.push("none");
         }
		apiUrlArr.push(data._links.self);
		
    //console.log(apiUrlArr);
		//console.log(statusArr);
		//console.log(gameArr);
	  });
    
  
	$.getJSON("https://wind-bow.glitch.me/twitch-api/channels/" + users[j],function(data){
		if(data.status!==404){
			urlArr.push(data.url);
			logoArr.push(data.logo);
		}else{
			urlArr.push("none");
			logoArr.push("https://cdn.instructables.com/FFB/WMFG/FWBNM65X/FFBWMFGFWBNM65X.MEDIUM.jpg");
		}
		//console.log(urlArr);
		//console.log(logoArr);
	});
  }
  
  setTimeout(function(){orderingArrays();
  console.log(statusOrdArr);
  console.log(gameOrdArr);
  console.log(urlOrdArr);
  console.log(logoOrdArr);
  }, 2000);
  
  
  setTimeout(function(){ htmlBuilder(); $("#streamers").html(htmlAll);}, 3000);
  
  $("#all").on("click", function(){
    if(htmlAll!==""){
      $(".liOff").removeClass("active");
      $("#off").css("color","white");
      $(".liOn").removeClass("active");
      $("#on").css("color","white");
      $(".liAll").addClass("active");
      $("#all").css("color","black");
      $("#streamers").html(htmlAll);
    }});
  $("#on").on("click", function(){
    if(htmlAll!==""){
      $(".liOff").removeClass("active");
      $("#off").css("color","white");
      $(".liAll").removeClass("active");
      $("#all").css("color","white");
      $(".liOn").addClass("active");
      $("#on").css("color","black");
      $("#streamers").html(htmlOn);
    }});
  $("#off").on("click", function(){
    if(htmlAll!==""){
      $(".liOn").removeClass("active");
      $("#on").css("color","white");
      $(".liAll").removeClass("active");
      $("#all").css("color","white");
      $(".liOff").addClass("active");
      $("#off").css("color","black");
      $("#streamers").html(htmlOff);
    }});
  
  
  function findWord(word, str) {
   return str.split('/').some(function(w){return w.toLowerCase() === word.toLowerCase()});
}

  function htmlBuilder(){
    for(var i = 0; i < users.length; i++){
      
  if(statusOrdArr[i]==="online"){
    htmlOn+="<div id='rows' class='row'> <div class='col-md-3'><a href='"+urlOrdArr[i]+"' target='_blank'> <img src='"+logoOrdArr[i]+"'></a></div><div  class='col-md-9'><span id='online'>"+statusOrdArr[i]+"</span></br><span id='curr' >Currently streaming: "+gameOrdArr[i]+"</span></div></div>";
    htmlAll+= "<div id='rows' class='row'> <div class='col-md-3'><a href='"+urlOrdArr[i]+"' target='_blank'> <img src='"+logoOrdArr[i]+"'></a></div><div  class='col-md-9'><span id='online'>"+statusOrdArr[i]+"</span></br><span id='curr' >Currently streaming: "+gameOrdArr[i]+"</span></div></div>";
  }else if(statusOrdArr[i]==="offline"){
    htmlOff+="<div id='rows' class='row'> <div class='col-md-3'><a href='"+urlOrdArr[i]+"' target='_blank'> <img src='"+logoOrdArr[i]+"'></a></div><div class='col-md-9'><span id='offline'>"+statusOrdArr[i]+"</span><h1></h1></div></div>";
    htmlAll+="<div id='rows' class='row'> <div class='col-md-3'><a href='"+urlOrdArr[i]+"' target='_blank'> <img src='"+logoOrdArr[i]+"'></a></div><div class='col-md-9'><span id='offline'>"+statusOrdArr[i]+"</span><h1></h1></div></div>";
  }else if (statusOrdArr[i]==="none"){
    htmlAll+="<div id='rows' class='row'> <div class='col-md-3'><img src='"+logoOrdArr[i]+"'></div><div class='col-md-9'><span id='none'>"+statusOrdArr[i]+"</br>(USER NOT FOUND)</span><h1></h1></div></div>"
  }
  }
}
  
  
  
  function orderingArrays(){
   var band = 0;
	 console.log(users);
   console.log(apiUrlArr);
	 	 
    for(var l = 0; l < users.length; l++){
       if(l === (users.length - 1) ){band = 1;}
         for(var m = 0; m < users.length; m++){
            if(findWord(users[l],urlArr[m]) || (urlArr[m] === "none" && band === 1)){
            urlOrdArr.push(urlArr[m]);
			      logoOrdArr.push(logoArr[m]);
            } 
         }
      }
    band = 0;
    /*
    for(var j = 0; j < users.length; j++){
     if(j === (users.length - 1) ){band = 1;}	
		 for(var k =0; k < users.length; k++){
		 if(findWord(users[j],urlOrdArr[k]) || (urlOrdArr[k] === "none" && band === 1)){
		   if(urlOrdArr[k] === "none" && band === 1){
       statusOrdArr.push("none");
			 gameOrdArr.push("none");
     } else{
       statusOrdArr.push(statusArr[k]);
			 gameOrdArr.push(gameArr[k]);
     }
     }
    	
	 }
		 }*/
	 
	 for(var j = 0; j < users.length; j++){
     if(j === (users.length - 1) ){band = 1;}	
		  for(var k =0; k < users.length; k++){
		    if(findWord(users[j],apiUrlArr[k])){
         statusOrdArr.push(statusArr[k]);
			   gameOrdArr.push(gameArr[k]);
        }
      }
   }
	 
   for(var n = 0; n < users.length; n++){
    if(urlOrdArr[n]==="none"){
     statusOrdArr[n]="none"; 
    } 
   }
  
    for(var p = 0; p < logoOrdArr.length; p++){
      if(logoOrdArr[p]===null){
        logoOrdArr[p]="https://cdn.shopify.com/s/files/1/1103/5390/t/11/assets/noimage.jpg?14031454539697131190";
      }
    }
    
  } 
  
  Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
  };
  
  
  });