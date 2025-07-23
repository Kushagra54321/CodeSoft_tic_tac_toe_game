// let board = Array(9).fill(' ');
// const boardDiv = document.getElementById('board');
// const resultDiv = document.getElementById('result');
// const statusDiv = document.getElementById('status');

// function renderBoard() {
//   boardDiv.innerHTML = '';
//   board.forEach((cell, i) => {
//     const div = document.createElement('div');
//     div.className = 'cell';
//     div.innerText = cell;
//     div.addEventListener('click', () => makeMove(i));
//     boardDiv.appendChild(div);
//   });
// }

// function makeMove(i) {
//   if (board[i] !== ' ' || resultDiv.innerText !== '') return;
//   board[i] = 'O';
//   statusDiv.innerText = "AI's Turn...";
//   renderBoard();

//   fetch('/move', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ board: board })
//   })
//     .then(res => res.json())
//     .then(data => {
//       board = data.board;
//       renderBoard();
//       if (data.winner === 'X') {
//         resultDiv.innerText = "AI Wins! 😈";
//         statusDiv.innerText = "";
//       } else if (data.winner === 'O') {
//         resultDiv.innerText = "You Win! 🥳";
//         statusDiv.innerText = "";
//       } else if (data.winner === 'Draw') {
//         resultDiv.innerText = "It's a Draw! 🤝";
//         statusDiv.innerText = "";
//       } else {
//         statusDiv.innerText = "Your Turn";
//       }
//     });
// }

// function resetBoard() {
//   board = Array(9).fill(' ');
//   resultDiv.innerText = '';
//   statusDiv.innerText = "Your Turn";
//   renderBoard();
// }
// renderBoard();


// let isPvP = false;
// let currentPlayer = 'O';
// let scores = { 'O': 0, 'X': 0, 'Draw': 0 };
// const scoreDiv = document.createElement('div');
// scoreDiv.className = "scoreboard";
// scoreDiv.innerHTML = `
//   <h3>Scoreboard</h3>
//   <p>You (O): <span id="score-o">0</span> | AI (X): <span id="score-x">0</span> | Draws: <span id="score-draw">0</span></p>
// `;
// document.querySelector(".container").insertBefore(scoreDiv, boardDiv);

// const toggleBtn = document.createElement("button");
// toggleBtn.innerText = "🌗 Toggle Dark/Light Mode";
// toggleBtn.className = "btn";
// toggleBtn.onclick = () => document.body.classList.toggle("light-mode");
// document.querySelector(".container").appendChild(toggleBtn);

// const modeBtn = document.createElement("button");
// modeBtn.innerText = "👬 Switch to PvP Mode";
// modeBtn.className = "btn";
// modeBtn.onclick = () => {
//   isPvP = !isPvP;
//   modeBtn.innerText = isPvP ? "🤖 Switch to vs AI" : "👬 Switch to PvP Mode";
//   resetBoard();
// };
// document.querySelector(".container").appendChild(modeBtn);

// function updateScore(winner) {
//   if (winner in scores) scores[winner]++;
//   document.getElementById("score-o").innerText = scores['O'];
//   document.getElementById("score-x").innerText = scores['X'];
//   document.getElementById("score-draw").innerText = scores['Draw'];
// }

// function makeMove(i) {
//   if (board[i] !== ' ' || resultDiv.innerText !== '') return;
//   board[i] = currentPlayer;
//   playSound();
//   renderBoard();

//   if (checkLocalWinner()) return;

//   if (!isPvP && currentPlayer === 'O') {
//     statusDiv.innerText = "AI's Turn...";
//     fetch('/move', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ board: board })
//     })
//       .then(res => res.json())
//       .then(data => {
//         board = data.board;
//         renderBoard();
//         if (data.winner !== 'None') {
//           resultDiv.innerText = getWinMessage(data.winner);
//           updateScore(data.winner);
//           animateWin();
//         } else {
//           statusDiv.innerText = "Your Turn";
//         }
//       });
//   } else {
//     currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
//     statusDiv.innerText = `${currentPlayer}'s Turn`;
//   }
// }

// function checkLocalWinner() {
//   const winner = getWinner(board);
//   if (winner) {
//     resultDiv.innerText = getWinMessage(winner);
//     statusDiv.innerText = '';
//     updateScore(winner);
//     animateWin();
//     return true;
//   }
//   return false;
// }

// function getWinner(b) {
//   const wins = [
//     [0,1,2], [3,4,5], [6,7,8],
//     [0,3,6], [1,4,7], [2,5,8],
//     [0,4,8], [2,4,6]
//   ];
//   for (let combo of wins) {
//     const [a,b,c] = combo;
//     if (b[a] !== ' ' && b[a] === b[b] && b[a] === b[c]) return b[a];
//   }
//   if (!b.includes(' ')) return 'Draw';
//   return null;
// }

// function getWinMessage(winner) {
//   return winner === 'Draw' ? "It's a Draw! 🤝" :
//          winner === 'X' ? (isPvP ? "Player X Wins! 🎉" : "AI Wins! 😈") :
//          "You Win! 🥳";
// }

// function animateWin() {
//   boardDiv.style.animation = "bounce 0.8s";
//   setTimeout(() => boardDiv.style.animation = "", 800);
// }

// function playSound() {
//   const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_01c601dc60.mp3?filename=click-124467.mp3");
//   audio.play();
// }

let board = Array(9).fill(' ');
const boardDiv = document.getElementById('board');
const resultDiv = document.getElementById('result');
const statusDiv = document.getElementById('status');

let isPvP = false;
let currentPlayer = 'O';
let scores = { 'O': 0, 'X': 0, 'Draw': 0 };

// Initial Render
renderBoard();
addScoreboard();
addButtons();

// ----------------------- Core Functions -------------------------

function renderBoard() {
  boardDiv.innerHTML = '';
  board.forEach((cell, i) => {
    const div = document.createElement('div');
    div.className = 'cell';
    div.innerText = cell;
    div.addEventListener('click', () => makeMove(i));
    boardDiv.appendChild(div);
  });
}

function makeMove(i) {
  if (board[i] !== ' ' || resultDiv.innerText !== '') return;
  board[i] = currentPlayer;
  playSound();
  renderBoard();

  const winner = getWinner(board);
  if (winner) {
    resultDiv.innerText = getWinMessage(winner);
    statusDiv.innerText = '';
    updateScore(winner);
    animateWin();
    return;
  }

  if (!isPvP && currentPlayer === 'O') {
    statusDiv.innerText = "AI's Turn...";
    fetch('/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board: board })
    })
      .then(res => res.json())
      .then(data => {
        board = data.board;
        renderBoard();
        const aiWinner = data.winner;
        if (aiWinner && aiWinner !== 'None') {
          resultDiv.innerText = getWinMessage(aiWinner);
          updateScore(aiWinner);
          animateWin();
          statusDiv.innerText = '';
        } else {
          statusDiv.innerText = "Your Turn";
        }
      });
  } else {
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
    statusDiv.innerText = `${currentPlayer}'s Turn`;
  }
}

function getWinner(b) {
  const wins = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let combo of wins) {
    const [a, bIndex, c] = combo;
    if (b[a] !== ' ' && b[a] === b[bIndex] && b[a] === b[c]) {
      return b[a];
    }
  }
  if (!b.includes(' ')) return 'Draw';
  return null;
}

function getWinMessage(winner) {
  return winner === 'Draw' ? "It's a Draw! 🤝" :
         winner === 'X' ? (isPvP ? "Player X Wins! 🎉" : "AI Wins! 😈") :
         isPvP ? "Player O Wins! 🥳" : "You Win! 🥳";
}

// ----------------------- Extra Features -------------------------

function resetBoard() {
  board = Array(9).fill(' ');
  resultDiv.innerText = '';
  statusDiv.innerText = isPvP ? `${currentPlayer}'s Turn` : "Your Turn";
  renderBoard();
}

function addScoreboard() {
  const scoreDiv = document.createElement('div');
  scoreDiv.className = "scoreboard";
  scoreDiv.innerHTML = `
    <h3>Scoreboard</h3>
    <p>You (O): <span id="score-o">0</span> | AI (X): <span id="score-x">0</span> | Draws: <span id="score-draw">0</span></p>
  `;
  document.querySelector(".container").insertBefore(scoreDiv, boardDiv);
}

function updateScore(winner) {
  if (winner in scores) scores[winner]++;
  document.getElementById("score-o").innerText = scores['O'];
  document.getElementById("score-x").innerText = scores['X'];
  document.getElementById("score-draw").innerText = scores['Draw'];
}

function animateWin() {
  boardDiv.style.animation = "bounce 0.8s";
  setTimeout(() => boardDiv.style.animation = "", 800);
}

function playSound() {
  const audio = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_01c601dc60.mp3?filename=click-124467.mp3");
  audio.play();
}

function addButtons() {
  const toggleBtn = document.createElement("button");
  toggleBtn.innerText = "🌗 Toggle Dark/Light Mode";
  toggleBtn.className = "btn";
  toggleBtn.onclick = () => document.body.classList.toggle("light-mode");
  document.querySelector(".container").appendChild(toggleBtn);

  const modeBtn = document.createElement("button");
  modeBtn.innerText = "👬 Switch to PvP Mode";
  modeBtn.className = "btn";
  modeBtn.onclick = () => {
    isPvP = !isPvP;
    modeBtn.innerText = isPvP ? "🤖 Switch to vs AI" : "👬 Switch to PvP Mode";
    currentPlayer = 'O';
    resetBoard();
  };
  document.querySelector(".container").appendChild(modeBtn);
}
