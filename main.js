
$(document).ready(function() {
	var user, computer;
	var $tiles = $('.casa');
	var $userScore = $('.stats_user .score');
	var $compScore = $('.stats_computer .score');
	var $msg = $('.msg');
	var userTurn = true, round = 0;
	
	$('.start span').on('click', function() {
		if(this.innerHTML === 'X') {
			user = 'X';
			computer = 'O';
		}
		else {
			user = 'O';
			computer = 'X';
		}
		$('.start').fadeOut();
		checkTurn();
	});
	
	$tiles.on('click', function() {
		if(this.innerHTML === '' && userTurn) {
			userTurn = false;
			this.innerHTML = user;
			if(!isGameOver())
				playComputer();
		}
	});
	
	function isGameOver() {
		var end = false;
		var win = 0;
		var a = checkBoard();
		if(a === -1)
			return;
		else if(a === 1)
			win = 2;
		
		for(var i = 0; i < 3 && !end; i++) {
			if($tiles[3*i].innerHTML !== '' && 
				 $tiles[3*i].innerHTML === $tiles[3*i + 1].innerHTML &&
				 $tiles[3*i].innerHTML === $tiles[3*i + 2].innerHTML) {
				end = true;
				if($tiles[3*i].innerHTML === user)
					win = 1;
				for(var j = 0; j < 3; j++)
					$tiles[3*i + j].style.color = '#ed6060';
			}
		}
		
		for(var i = 0; i < 3 && !end; i++) {
			if($tiles[i].innerHTML !== '' && 
				 $tiles[i].innerHTML === $tiles[3 + i].innerHTML &&
				 $tiles[i].innerHTML === $tiles[6 + i].innerHTML) {
				end = true;
				if($tiles[i].innerHTML === user)
					win = 1;
				for(var j = 0; j < 3; j++)
					$tiles[i + 3*j].style.color = '#ed6060';
			}
		}
		
		if(!end && $tiles[0].innerHTML !== '' && 
			$tiles[0].innerHTML === $tiles[4].innerHTML && 
			$tiles[0].innerHTML === $tiles[8].innerHTML) {
			end = true;
			if($tiles[0].innerHTML === user)
				win = 1;
			for(var j = 0; j < 3; j++)
				$tiles[3*j + j].style.color = '#ed6060';
		}
		
		if(!end && $tiles[2].innerHTML !== '' && 
			$tiles[2].innerHTML === $tiles[4].innerHTML && 
			$tiles[2].innerHTML === $tiles[6].innerHTML) {
			end = true;
			if($tiles[2].innerHTML === user)
				win = 1;
			for(var j = 0; j < 3; j++)
				$tiles[2 - j + 3*j].style.color = '#ed6060';
		}
		
		if(win === 2)
			end = true;
		if(end) {
			if(win === 1) {
				$msg.html('Você ganhou!');
				$userScore.html(parseInt($userScore.html()) + 1);
			}
			else if(win === 0) {
				$msg.html('Você Perdeu!');
				$compScore.html(parseInt($compScore.html()) + 1);
			}
			else
				$msg.html('Empate!');
			setTimeout(function(){
				$msg.html('');
				for(var i = 0; i < 3; i++) {
					for(var j = 0; j < 3; j++) {
						$tiles[3 * i + j].style.color = 'rgb(254, 254, 254)';
						$tiles[3 * i + j].innerHTML = '';
					}
				}
				round++;
				checkTurn();
			}, 3000);
			return 1;
		}
		return 0;
	};
	
	function checkBoard() {
		var c = 0;
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				if($tiles[3 * i + j].innerHTML !== '')
					c++;
			}
		}
		if(c <= 2)
			return -1;
		else if(c === 9)
			return 1; 
		else return 0;
	};
	
	function checkTurn() {
		if(round % 2 === 0) {
			$msg.html('Comece');
			userTurn = true;
		}
		else {
			userTurn = false;
			playComputer();
		}
		setTimeout(function(){ $msg.html(''); }, 3000);
	};
	
	function playComputer() {
		if(!checkRows(computer) && !checkColumns(computer) && 
		!checkDiagonal(computer) && !checkRows(user) && 
		!checkColumns(user) && !checkDiagonal(user)) {
			var r = Math.floor(Math.random() * 9);
			var i = 0, j = -1;
			while(r >= 0) {
				if(j == 2)
					i = (i + 1) % 3;
				j = (j + 1) % 3;
				if($tiles[3*i+j].innerHTML === '')
					r--;
			}
			$tiles[3*i+j].innerHTML = computer;
		}
		if(!isGameOver())
			userTurn = true;
	};

	function checkRows(p) {
		var c = 0, i, j;
		for(i = 0; i < 3; i++) {
			for(j = 0; j < 3; j++) {
				if($tiles[3*i+j].innerHTML === p)
					c++;
			}
			if(c === 2) {
				for(j = 0; j < 3; j++) {
					if($tiles[3*i+j].innerHTML === '') {
						$tiles[3*i+j].innerHTML = computer;
						return 1;
					}
				}
			}
			c = 0;
		}
		return 0;
	};
	function checkColumns(p) {
		var c = 0, i, j;
		for(i = 0; i < 3; i++) {
			for(j = 0; j < 3; j++) {
				if($tiles[3*j+i].innerHTML === p)
					c++;
			}
			if(c === 2) {
				for(j = 0; j < 3; j++) {
					if($tiles[3*j+i].innerHTML === '') {
						$tiles[3*j+i].innerHTML = computer;
						return 1;
					}
				}
			}
			c = 0;
		}
		return 0;
	};
	function checkDiagonal(p) {
		var c = 0;
		for(var i = 0; i < 3; i++) {
			if($tiles[3*i+i].innerHTML === p)
				c++;
		}
		
		if(c === 2)
			for(var i = 0; i < 3; i++)
				if($tiles[3*i+i].innerHTML === '') {
					$tiles[3*i+i].innerHTML = computer;
					return 1;
				}
		c = 0;
		for(var i = 0; i < 3; i++) {
			if($tiles[2 - i + 3*i].innerHTML === p)
				c++;
		}
		if(c === 2)
			for(var i = 0; i < 3; i++)
				if($tiles[2 - i + 3*i].innerHTML === '') {
					$tiles[2 - i + 3*i].innerHTML = computer;
					return 1;
				}
		return 0;
	};
});