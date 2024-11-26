const minimax = (board, depth, isMaximizing) => {
    // ตรวจสอบผู้ชนะ
    const winner = checkWinner(board);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (!board.includes('-')) return 0;
  
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '-') {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = '-';
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === '-') {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = '-';
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };
  
  const getBotMove = (boardState) => {
    let bestScore = -Infinity;
    let bestMove = null;
    const board = boardState.split('');
  
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '-') {
        board[i] = 'O';
        const score = minimax(board, 0, false);
        board[i] = '-';
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };
  
  module.exports = { getBotMove };