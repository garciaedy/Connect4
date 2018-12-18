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

