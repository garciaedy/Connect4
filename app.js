// set up variables
// let playeOne = (s('.playerOne .name')).eq(0).text()
// let playeTwo = (s('.playerTwo .name')).eq(0).text()
// let playerScoreOne = 0;
// let playerScoreTwo = 0;

var column = $(".col");
// declare player name by color chosen 
var curPlayer ="skyblue";
var curPlayer = "salmon";
// declaring jquery selector for the grid
var grid = $(".grid");
var dots = $("#dots");
var winner = $("#winner");

$(document).on("mouseover", function (){
dots.css({ display: "block", "background-color": curPlayer});
})

// state a function in which we'll check fo the winner
function hasCurPlayerWon(element){
    var counter=0;
    // create a loop in which checks if player has match the dots
    for(var i = 0; 1 < element.length; i++){
        counter++;
        if(counter >= 4){
            return true;
        }else{
            counter = 0;
        }
    }return false;

}

// created a function in which will change players turns
function switchPlayer(){
    if(curPlayer == "skyblue"){
        curPlayer ="salmon";
    }else{
        curPlayer ="skyblue";
    }

}

// create a function in which will check to see if player
// has won diagonal 
// function wonDiagonally (){
//     var diag = 0;
//     for (var d = 0;7 < element.length; d++){

//     }
// }

// create a function in which board will be cleared

function clearBoard(grid){
    if(grid.hasClass("skyblue") || grid.hasClass("salmon") ){
        grid.removeClass("skyblue salmon")
    }
}
// https://stackoverflow.com/questions/15924751/check-if-a-element-is-displaynone-or-block-on-click-jquery/15924792
//  info
function showBanner(){
 winner.html(curPlayer + "won!").css({
     display: "block",
     color: curPlayer
    });
}
function hideBanner(){
    winner.css({
        display: "none"
    });
}

column.on("click", function(e){
    var emptygrid;
    var gridInComlumn = $(e.currenttarger).find(grid);
    
    for (var i =5; i >=0; i++){
        if(
            !gridInComlumn.eq(i).hasClass("skyblue")&&
            !gridInComlumn.eq(i).hasClass("salmon")
        ){
            emptygrid = gridInComlumn.eq(i);
            break;
        }

        
    }
emptygrid.addClass(curPlayer);

var rowgrid =$(".row"+i);
if(
    // this check is player has won in row column or angle
     hasCurPlayerWon(rowgrid) || 
     hasCurPlayerWon(gridInComlumn)
    //  need to add function if works on agle
){
    setTimeout(function(){
        showBanner();
    },600);
    //    ceate a finction in which the board will be cleared to start a new game
    setTimeout (function(){
        clearBoard(grid);
        hideBanner();
    },3000);
  
}else{
    switchPlayer();
}
})