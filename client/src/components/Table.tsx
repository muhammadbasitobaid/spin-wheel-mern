import { FC } from "react";

interface TableRowProps {
  rowNum: number;
}

const TableRow: FC<TableRowProps> = ({ rowNum }) => (
  <tr>
    <td className="min-w-[50px] text-center">{rowNum}</td>
    <td className="expanding-column text-center">
      {Math.random() < 0.5 ? "Yes" : "No"}
    </td>
    <td className="min-w-[50px]">
      <img
        src="/assets/icons/select.svg"
        alt="Select"
        className="w-6 h-6 mx-auto"
      />
    </td>
  </tr>
);

interface TableProps {
  numRows: number;
}

const Table: FC<TableProps> = ({ numRows }) => (
  <div className="p-8">
    <table className="border-collapse border border-gray-300">
      <tbody>
        {Array.from({ length: numRows }, (_, index) => (
          <TableRow key={index} rowNum={index + 1} />
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
