

class Game {
    constructor(selector) {
        this.COLUMNS = 7
        this.ROWS = 6
        this.player = $(".player1").text()
        this.selector = selector
        this.gameDone = false
        this.movePlayer = function () { }
        this.gameBoard()
        this.eventListeners()
    }
    gameBoard() {
        const $circles = $(this.selector)
        $circles.empty()
        this.gameDone = false
        this.player = $(".player1").text()
        for (let row = 0; row < this.ROWS; row++) {
            const $row = $('<div class = "row">')
            for (let col = 0; col < this.COLUMNS; col++) {
                const $col = $('<div class = "col empty">')
                    .attr('data-col', col)
                    .attr('data-row', row)
                $row.append($col)
            }
            $circles.append($row)
        }
    }
    eventListeners() {
        const $circles = $(this.selector)
        const that = this

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
        $circles.on('mouseenter', '.col.empty', function () {
            if (that.gameDone) return
            const col = $(this).data('col')
            const $lastEmptyCell = findLastEmptyCell(col)
            $lastEmptyCell.addClass(`next-${that.player}`)


        });

        $circles.on('mouseleave', '.col', function () {
            $('.col').removeClass(`next-${that.player}`);
        })
        $circles.on('click', '.col.empty', function () {
            if (that.gameDone) return;
            const col = $(this).data('col');
            const $lastEmptyCell = findLastEmptyCell(col);
            $lastEmptyCell.removeClass(`empty next-${that.player}`)

            let audio = new Audio("images/drop.wav")
            audio.play()
            $lastEmptyCell.addClass(that.player);
            $lastEmptyCell.data('player', that.player);

            const winner = that.checkForWinner(
                $lastEmptyCell.data('row'),
                $lastEmptyCell.data('col')
            )
            if (winner) {
                that.gameDone = true
                swal(`Game Over! ${that.player} has won!`, {
                    button: false,
                })

            }

            that.player = (that.player === $(".player1").text()) ? $(".player2").text() : $(".player1").text();
            that.movePlayer();
            $(this).trigger('mouseenter');
        });
    }

    checkForWinner(row, col) {
        const that = this;

        function $getCell(i, j) {
            return $(`.col[data-row='${i}'][data-col='${j}']`);
        }

        function checkDirection(direction) {
            let total = 0;
            let i = row + direction.i;
            let j = col + direction.j;
            let $next = $getCell(i, j);
            while (i >= 0 &&
                i < that.ROWS &&
                j >= 0 &&
                j < that.COLUMNS &&
                $next.data('player') === that.player
            ) {
                total++;
                i += direction.i;
                j += direction.j;
                $next = $getCell(i, j);
            }
            return total;
        }

        function checkWin(directionA, directionB) {
            const total = 1 +
                checkDirection(directionA) +
                checkDirection(directionB);
            if (total >= 4) {
                return that.player;
            } else {
                return null;
            }
        }

        function checkDiagonalBLtoTR() {
            return checkWin({ i: 1, j: -1 }, { i: 1, j: 1 });
        }

        function checkDiagonalTLtoBR() {
            return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 });
        }

        function checkVerticals() {
            return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
        }

        function checkHorizontals() {
            return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
        }

        return checkVerticals() ||
            checkHorizontals() ||
            checkDiagonalBLtoTR() ||
            checkDiagonalTLtoBR();
    }

    restart() {
        this.gameBoard();
        this.movePlayer();
    }
}