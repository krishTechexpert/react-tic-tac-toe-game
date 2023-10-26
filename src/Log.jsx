export default function Log({ list }) {
  return (
    <ol id="log">
      {list.map((item) => {
        return (
          <li key={`${item.square.row}${item.square.col}`}>
            {item.player} selected ({item.square.row},{item.square.col})
          </li>
        );
      })}
    </ol>
  );
}
