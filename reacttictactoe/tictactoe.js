const Square = ({id, newState}) => {
  const [status, setStatus] = React.useState(null);
  const XorO = [null, "X", "O"];

  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  });

  return (
    <button className={XorO[status]}
      onClick={(e) => {
        let nextPlayer = newState(id);
        setStatus(nextPlayer);
      }}
    >
      <h1>{XorO[status]}</h1>
    </button>
  );
};

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));
  let status = `Player: ${player}`;
  let winner = checkWinner(state);
  if (winner) status = `Player ${winner} wins!`;

  const newState = idOfSquare => {
    let thePlayer = player;
    state[idOfSquare] = player;
    setState(state);
    let nextPlayer = ((player + 1) % 2) == 0 ? 2 : 1;
    setPlayer(nextPlayer);
    return thePlayer;
  }
  function renderSquare(i) {
    return <Square id={i} newState={newState}></Square>;
  }
  return (
    <div
      className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
