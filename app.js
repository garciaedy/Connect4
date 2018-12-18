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
    
}