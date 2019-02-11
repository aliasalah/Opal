
$(function(){
    
    
        var bnext,bprev,bslide,bstop,imgid,imgarr;
       var x=0,i=0;
        var int;
        
        imgarr=["slide1.png","slide2.jpg","slide3.jpg","slide4.jpg",];
        
         
    bnext=document.getElementById("right");
    bprev=document.getElementById("left");
    
    imgid=document.getElementById("im1");
    bnext.onclick=function(e)
    {
        if(i==imgarr.length-1)
            i=0;
        else
            i++;
        imgid.src=imgarr[i];
        
    } 
    bprev.onclick=function(e)
    {
      if(i==0)
            i=imgarr.length-1;
        else
            i--;
        imgid.src=imgarr[i];  
    }  
    
 /*$('li a').click(function(e) {
 
  localStorage.setItem("lastname", "Smith");

});
$(document).on('click', 'a', function () {
    alert(this.id);
});*/
$("#nav li a").on("click", function(){
 sessionStorage.setItem("path",$(this).attr("value"));
});
    
    
});