
let turn = 1;
let previousMove = 0;
const cells = document.querySelectorAll('.cell');
const winningCombos = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];
var boardOwners = [ '', '', '', '', '', '', '', '', '' ];
var winningBoards = new Set();
var tieBoards = new Set();


startGame();

function startGame() {
	winningBoards.clear();
	tieBoards.clear();
	boardOwners = [ '', '', '', '', '', '', '', '', '' ];
	updateFullBoardDisplay('', '', 'white');
	previousMove = 0;
	turn = 1;

	document.querySelector(".endGame").style.display = "none";
	document.querySelector(".endGame .gameText").innerText = '';

	for(var i = 0; i < 81; i++)
	{
		cells[i].innerText = '';
		cells[i].addEventListener('click', checkLegalMove, false);
	}
}

function endGame(player) {
	updateFullBoardDisplay('limegreen', 'orange', 'white');
	for(var i = 0; i < 81; i++)
	{
		cells[i].removeEventListener('click', checkLegalMove, false);
	}

	document.querySelector(".endGame").style.display = "block";
	document.querySelector(".endGame .gameText").innerText = "Player: " + player + " Wins!"; 
}


function checkLegalMove(cell) {
	if(document.getElementById(cell.target.id).innerText == '' && checkLegalBoard(cell.target.id))
	{
		var player = turn % 2 == 1 ? 'X' : 'O';

		document.getElementById(cell.target.id).innerText = player;

		previousMove = cell.target.id;
		var boardNum = previousMove % 10;
		var newTable = "table" + boardNum;
		
		var checkLastTable = Math.floor(previousMove / 10);
		var lastTable = "table" + checkLastTable;
		
		checkBoardForWin(checkLastTable, player);
		checkBoardForTie(checkLastTable);

		// If the previous move sent us to a completed board, we can now go anywhere
		if(winningBoards.has(boardNum) || tieBoards.has(boardNum))
		{
			updateFullBoardDisplay('limegreen', 'orange', 'yellow');
		}
		else
		{
			updateFullBoardDisplay('limegreen', 'orange', 'white');
			document.getElementById(newTable).style.background = 'yellow';
		}

		if(checkForOverallWinner(player))
		{
			endGame(player);
		}

		turn++;
	}
}

function updateFullBoardDisplay(winColor, tieColor, currentSelectionColor)
{
	for(var i = 1; i < 10; ++i)
	{
		var newTable = "table" + i;
		if(winningBoards.has(i))
		{
			//updateWinDisplay(i);
			document.getElementById(newTable).style.background = winColor;
			continue;
		}
		else if(tieBoards.has(i))
		{
			document.getElementById(newTable).style.background = tieColor;
			continue;
		}

		document.getElementById(newTable).style.background = currentSelectionColor;
	}
}

function updateWinDisplay(boardNum)
{
	var player = boardOwners[boardNum - 1];
	if(player == 'X')
	{
		var cell = boardNum * 10;
		document.getElementById(cell + 1).innerText = 'X';
		document.getElementById(cell + 2).innerText = 'X';
		document.getElementById(cell + 3).innerText = 'X';
		document.getElementById(cell + 4).innerText = 'X';
		document.getElementById(cell + 5).innerText = 'X';
		document.getElementById(cell + 6).innerText = 'X';
		document.getElementById(cell + 7).innerText = 'X';
		document.getElementById(cell + 8).innerText = 'X';
		document.getElementById(cell + 9).innerText = 'X';

		
		document.getElementById(cell + 1).style.background = 'limegreen';
		document.getElementById(cell + 2).style.background = 'white';
		document.getElementById(cell + 3).style.background = 'limegreen';
		document.getElementById(cell + 4).style.background = 'white';
		document.getElementById(cell + 5).style.background = 'limegreen';
		document.getElementById(cell + 6).style.background = 'white';
		document.getElementById(cell + 7).style.background = 'limegreen';
		document.getElementById(cell + 8).style.background = 'white';
		document.getElementById(cell + 9).style.background = 'limegreen';
	}
	else
	{
		var cell = boardNum * 10;
		document.getElementById(cell + 1).innerText = 'O';
		document.getElementById(cell + 2).innerText = 'O';
		document.getElementById(cell + 3).innerText = 'O';
		document.getElementById(cell + 4).innerText = 'O';
		document.getElementById(cell + 5).innerText = 'O';
		document.getElementById(cell + 6).innerText = 'O';
		document.getElementById(cell + 7).innerText = 'O';
		document.getElementById(cell + 8).innerText = 'O';
		document.getElementById(cell + 9).innerText = 'O';
		
		document.getElementById(cell + 1).style.background = 'limegreen';
		document.getElementById(cell + 2).style.background = 'limegreen';
		document.getElementById(cell + 3).style.background = 'limegreen';
		document.getElementById(cell + 4).style.background = 'limegreen';
		document.getElementById(cell + 5).style.background = 'white';
		document.getElementById(cell + 6).style.background = 'limegreen';
		document.getElementById(cell + 7).style.background = 'limegreen';
		document.getElementById(cell + 8).style.background = 'limegreen';
		document.getElementById(cell + 9).style.background = 'limegreen';
	}
}

function checkLegalBoard(cellId)
{
	console.log("Cell = " + cellId + "    previousMove = " + previousMove);
	if(previousMove == 0)
	{
		return true;
	}
	else
	{
		var boardNum = previousMove % 10;
	console.log("Cell = " + cellId + "    board = " + boardNum);
		var cellBoard = Math.floor(cellId / 10);
		if(winningBoards.has(boardNum))
		{
			if(winningBoards.has(cellBoard))
			{
				return false;
			}
			
			return true;
		}
		else if(tieBoards.has(boardNum))
		{
			if(tieBoards.has(cellBoard))
			{
				return false;
			}

			return true;
		}
		
		var table = "table" + boardNum;

		// If we are going to a valid table, make sure we reset the color of the table we were just at
		if(checkBoard(cellId, boardNum))
		{
			document.getElementById(table).style.background = 'white';
			
			return true;
		}
		else
		{
			return false;
		}
	}
}

function checkBoard(cellId, boardNum)
{
	console.log("Cell = " + cellId + "    board = " + boardNum);
    if(cellId - (10 * boardNum) >= 1 && cellId - (10 * boardNum) <= 9)
	{
		return true;
	}

	return false;
}

function checkBoardForWin(boardNum, player)
{
	var winningComboSize = winningCombos.length;
	for(var i = 0; i < winningComboSize; ++i)
	{
		var combo = winningCombos[i];
		var comboSize = combo.length;
		var piece = document.getElementById((boardNum) * 10 + combo[0]).innerText;
		var isWinner = true;
		if(piece == '')
		{
			continue;
		}

		for(var j = 1; j < comboSize; ++j)
		{
			if(document.getElementById([(boardNum) * 10 + combo[j]]).innerText != piece)
			{
				isWinner = false;
				break;
			}
		}

		if(isWinner)
		{
			winningBoards.add(boardNum);
			boardOwners[boardNum - 1] = player;
			return true;
		}
	}

	return false;
}

function checkBoardForTie(boardNum)
{
	for(var i = 1; i < 10; ++i)
	{
		var cellId = (boardNum) * 10 + i;
		if(document.getElementById(cellId).innerText == '')
		{
			return false;
		}
	}

	tieBoards.add(boardNum);

	return true;
}


function checkForOverallWinner(player)
{
	var winningComboSize = winningCombos.length;
	for(var i = 0; i < winningComboSize; ++i)
	{
		var combo = winningCombos[i];
		var comboSize = combo.length;
		
		var player = boardOwners[combo[0] - 1];
		if(player == '')
		{
			continue;
		}

		var isWinner = true;

		for(var j = 1; j < comboSize; ++j)
		{
			var board = combo[j] - 1;
			if(boardOwners[board] != player)
			{
				isWinner = false;
				break;
			}
		}

		if(isWinner)
		{
			return true;
		}
	}

	return false;
}