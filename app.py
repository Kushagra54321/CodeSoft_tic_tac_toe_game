from flask import Flask, render_template, request, jsonify
from ai import best_move, check_winner

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    board = data['board']
    if check_winner(board, 'O') or check_winner(board, 'X') or ' ' not in board:
        return jsonify({'board': board, 'winner': 'game_over'})

    ai_move = best_move(board)
    board[ai_move] = 'X'

    winner = 'None'
    if check_winner(board, 'X'):
        winner = 'X'
    elif check_winner(board, 'O'):
        winner = 'O'
    elif ' ' not in board:
        winner = 'Draw'

    return jsonify({'board': board, 'winner': winner})

# if __name__ == '__main__':
#     app.run(debug=True)
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=10000)
