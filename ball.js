var create = function(x,y,size){
    // set div attributes
    var div = document.createElement('div');
    div.id = 'ball';
    div.style.zIndex = '1';
    div.style.position = 'absolute';    
    div.style.left = x + 'px';    
    div.style.top = y + 'px';    
    div.style.width = size + 'px';    
    div.style.height = size +'px';    
    div.style.borderRadius = '50%';
    div.style.border = "1px solid maroon";
    div.style.background = "none";    

    // Then append the whole thing onto the body
    document.getElementsByTagName('body')[0].appendChild(div);

    return div;        
};
var create2 = function(h,v,x,y){
    // set div attributes
    var div = document.createElement('div');
    div.id = 'ball';
    div.style.zIndex = '1';
    div.style.position = 'absolute';    
    if (h === "left"){
        div.style.left = x + 'px';
    }else{
        div.style.right = x + 'px';
    }
    if(v === "top"){
        div.style.top = y + 'px';
    }else{
        div.style.bottom = y + 'px';
    }
    div.style.width = '100px';    
    div.style.height = '100px';    
    div.style.borderRadius = '50%';
    div.style.border = "1px solid maroon";
    div.style.background = "none";    

    // Then append the whole thing onto the body
    document.getElementsByTagName('div')[0].appendChild(div);

    return div;        
};
var create3 = function(h,v,x,y){
    // set div attributes
    var div = document.createElement('div');
    div.id = 'ball';
    div.style.zIndex = '1';
    div.style.position = 'absolute';    
    if (h === "left"){
        div.style.left = x + 'px';
    }else{
        div.style.right = x + 'px';
    }
    if(v === "top"){
        div.style.top = y + 'px';
    }else{
        div.style.bottom = y + 'px';
    }
    div.style.width = '20px';    
    div.style.height = '20px';    
    div.style.borderRadius = '50%';
    div.style.border = "1px solid maroon";
    div.style.background = "none";    

    // Then append the whole thing onto the body
    document.getElementById('flowerParent').appendChild(div);

    return div;        
};
function makeEightCircleFlower(){
    var ball;

    var size = 100;
    var topmost = 50;
    var leftmost = 400;
    var rightmost = 500;
    var bottommost = 150;
    var midVertical = (topmost + bottommost)/2;
    var midHorizontal = (leftmost + rightmost)/2;
    var positions = [];
    var x = leftmost;
    var y = midVertical;
    var counter = 0;
    positions.push({x:leftmost,y:midVertical,s:size});
    positions.push({x:rightmost,y:midVertical,s:size});
    positions.push({x:midHorizontal,y:topmost,s:size});
    positions.push({x:midHorizontal,y:bottommost,s:size});
    positions.push({x:leftmost + 14,y:topmost + 14,s:size});
    positions.push({x:leftmost + 14,y:bottommost - 14,s:size});
    positions.push({x:rightmost - 14,y:topmost + 14,s:size});
    positions.push({x:rightmost - 14,y:bottommost - 14,s:size});

    while (counter < positions.length){
        ball = positions[counter];
        create(ball.x, ball.y, ball.s);
        counter = counter + 1;
    }
}
function makeDonut(){
	create2("left","top",0, 100);
    create2("left","top",100, 0);
    create2("left","top",200, 100);
    create2("left","top",100, 200);
    create2("left","top",3, 75);
    create2("left","top",195,75);
    create2("left","top",12, 50);
    create2("left","top",186,52)
    create2("left","top",27,30);
    create2("left","top",172,30);
    create2("left","top",50,12);
    create2("left","top",150,12);
    create2("left","top",75, 2);
    create2("left","top",125,2);

    create2("left","top",3,129);
    create2("left","top",195,129);
    create2("left","top",12,150);
    create2("left","top",186,151);
    create2("left","top",29, 172);
    create2("left","top",171, 172);
    create2("left","top",50, 187);
    create2("left","top",150,187);
    create2("left","top",75, 198);
    create2("left","top",125, 197);
    create2("left","top",100, 100);
}
function makeDonut2(){
	create2("left","top",0, 100);
    create2("left","top",100, 0);
    create2("left","top",200, 100);
    create2("left","top",100, 200);
    create2("left","top",3, 75);
    create2("right","top",3,75);
    create2("left","top",12, 50);
    create2("right","top",12,50)
    create2("left","top",27,30);
    create2("right","top",27,30);
    create2("left","top",49,12);
    create2("right","top",49,12);
    create2("left","top",75, 2);
    create2("right","top",74,2);

    create2("left","top",3,129);
    create2("right","top",3,129);
    create2("left","top",12,150);
    create2("right","top",12,151);
    create2("left","top",28, 172);
    create2("right","top",28, 172);
    create2("left","top",49, 187);
    create2("right","top",47,187);
    create2("left","top",75, 198);
    create2("right","top",75, 197);
    create2("left","top",100, 100);
}
function makeFlower(){
    create3("left","top",78,0);
    create3("right","top",54,3);
    create3("left","top",56,2);
    create3("left","top",36,10);
    create3("right","top",35,11);
    create3("left","top",20,24);
    create3("right","top",19,26);
    create3("left","top",7,42);
    create3("right","top",7,44);
    create3("left","top",0,63);
    create3("right","top",0,65);
    create3("left","bottom",0,68);
    create3("right","bottom",0,66);
    create3("left","bottom",5,46);
    create3("right","bottom",5,45);
    create3("left","bottom",17,27);
    create3("right","bottom",17,27);
    create3("left","bottom",33,12);
    create3("right","bottom",33,12);
    create3("left","bottom",53,3);
    create3("right","bottom",53,3);
    create3("left","bottom",78,0);
}
var ball;
makeEightCircleFlower();
makeDonut2();
makeFlower();


var div = document.createElement('div');
    div.id = 'ball';
    div.style.zIndex = '1';
    div.style.position = 'absolute';    
    div.style.left = '20px';    
    div.style.top = '20px';    
    div.style.width = '132px';    
    div.style.height = '132px';    
    div.style.borderRadius = '50%';
    div.style.border = "1px solid maroon";
    div.style.background = "none";

    document.getElementById('flowerParent').appendChild(div);