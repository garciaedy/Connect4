$(document).ready(function(){
    const game = new Game("#gameBoard")

  
    game.movePlayer = function() {
      $('#player').text(game.player)
    }
    
    // $('#restart').click(function() {
    //   game.restart();
    // })
  })

