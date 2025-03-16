interface DisplayTableProps<R extends string, C extends string> {
  rows: R[];
  columns: C[];
  renderItem: (row: R, column: C) => React.ReactNode;
}

export const DisplayTable = <R extends string, C extends string>({
  rows,
  columns,
  renderItem,
}: DisplayTableProps<R, C>) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ padding: "8px", textAlign: "left" }} />
            {columns.map((column) => (
              <th key={column} style={{ padding: "8px", textAlign: "center", fontWeight: "bold" }}>
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <td style={{ padding: "8px", fontWeight: "bold", textAlign: "left" }}>{row}</td>
              {columns.map((column) => (
                <td key={`${row}-${column}`} style={{ padding: "8px", textAlign: "center" }}>
                  {renderItem(row, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
