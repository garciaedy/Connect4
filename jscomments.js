

class Game {
    constructor(selector) {
        // =================================dimesions of the connect four grid===============
        this.COLUMNS = 7
        this.ROWS = 6
        //================takes name displayed on in h3 tag of current player and display under title===========
        this.player = $(".player1").text()
        this.selector = selector
        this.gameDone = false
        this.movePlayer = function () { }
        this.gameBoard()
        this.eventListeners()
    }
    // ================built game board with for loops=========
    gameBoard() {
        const $circles = $(this.selector)
        //===== .empty removed content in gameboard if their was any=============
        $circles.empty()
        this.gameDone = false
        //==========set to grab that particular text to do the name input=======
        this.player = $(".player1").text()
        //==========made 6 rows for gameboard with a class name of row========
        for (let row = 0; row < this.ROWS; row++) {
            const $row = $('<div class = "row">')
            //==========made 7 columns for gameboard with a class name of col empty====
            for (let col = 0; col < this.COLUMNS; col++) {
                const $col = $('<div class = "col empty">')
                    //===========added attributes with the repective names equaling the array number of col or row    
                    .attr('data-col', col)
                    .attr('data-row', row)
                //attaches columns to rows 
                $row.append($col)
            }
            //attaches row & columns to the actual gameboard
            $circles.append($row)
        }
    }
    //=========event listeners!!===============
    eventListeners() {
        const $circles = $(this.selector)
        const that = this
        //========shows the number column u are in at the moment displayed in the dat-col attribute starting with number 0 like an array====
        function findLastEmptyCell(col) {
            const cells = $(`.col[data-col='${col}']`)
            for (let i = cells.length - 1; i >= 0; i--) {
                const $cell = $(cells[i])
                if ($cell.hasClass('empty')) {
                    return $cell;
                }
            }
            return null
        }
        //=============on hover add class to col empty as either next-Player1 or next-Player 2. This is where I am able to display where the emoji will be placed before click==============
        $circles.on('mouseenter', '.col.empty', function () {
            if (that.gameDone) return
            const col = $(this).data('col')
            const $lastEmptyCell = findLastEmptyCell(col)
            $lastEmptyCell.addClass(`next-${that.player}`)
        })
        //==========this makes it a hover and removes the class inputted on previous function
        $circles.on('mouseleave', '.col', function () {
            $('.col').removeClass(`next-${that.player}`)
        })
        //==========this onclick function removes the empty class=====
        $circles.on('click', '.col.empty', function () {
            if (that.gameDone) return
            const col = $(this).data('col')
            const $lastEmptyCell = findLastEmptyCell(col)
            $lastEmptyCell.removeClass(`empty next-${that.player}`)


            //========adds the coin dropping sound on click
            let audio = new Audio("images/drop.wav")
            audio.play()

            //========adds Player1 or Player2 class so it looks like col Player# and inputs the respective emoji pic i the connect 4 board
            $lastEmptyCell.addClass(that.player)
            $lastEmptyCell.data('player', that.player)

            const winner = that.checkForWinner(
                $lastEmptyCell.data('row'),
                $lastEmptyCell.data('col')
            )
            //=========show a sweet alert once the game is done and somebody wins=====
            if (winner) {
                that.gameDone = true;
                swal("Game Over! " + that.player + "has won!")
                $('.col.empty').removeClass('empty');
                return;
            }
            //===========changes from player to player and displays who's turn right above the gameBoard========
            that.player = (that.player === $(".player1").text()) ? $(".player2").text() : $(".player1").text()
            that.movePlayer()
            $(this).trigger('mouseenter')
        })
    }

    //===========winner function============

    checkForWinner(row, col) {
        const that = this
//===========i is the number (in array) of the data-row attribute and j is the number (in array) of the data-col attribute=== 
        function $getCell(i, j) {
            return $(`.col[data-row='${i}'][data-col='${j}']`)
        }
//=============parent function for the direction functions below
        function checkDirection(direction) {
            let total = 0;
            let i = row + direction.i
            let j = col + direction.j
            let $next = $getCell(i, j)
            while (i >= 0 &&
                i < that.ROWS &&
                j >= 0 &&
                j < that.COLUMNS &&
                $next.data('player') === that.player
            ) {
                total++
                i += direction.i
                j += direction.j
                $next = $getCell(i, j)
            }
            return total;
        }
//=============do you have at least 4 in a row in any direction to win
        function checkWin(directionA, directionB) {
            const total = 1 +
                checkDirection(directionA) +
                checkDirection(directionB)
            if (total >= 4) {
                return that.player;
            } else {
                return null
            }
        }
//======check diagonal win from bottom left to top right
        function checkDiagonalBLtoTR() {
            return checkWin({ i: 1, j: -1 }, { i: 1, j: 1 })
        }
//=====check diagonal win from top left to bottom right

        function checkDiagonalTLtoBR() {
            return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 })
        }
//======checks to see vertical win
        function checkVerticals() {
            return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 })
        }
//======checks to see horizontal win
        function checkHorizontals() {
            return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 })
        }
//======checks all functions to determine winner all ways
        return checkVerticals() ||
            checkHorizontals() ||
            checkDiagonalBLtoTR() ||
            checkDiagonalTLtoBR()
    }
}