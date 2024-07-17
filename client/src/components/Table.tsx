import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

interface TableRowProps {
  rowNum: number;
  value: string;
}

const TableRow: FC<TableRowProps> = ({ rowNum, value }) => (
  <tr>
    <td className="min-w-[50px] text-center">{rowNum}</td>
    <td className="expanding-column text-center">{value}</td>
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
  history: string[];
}

const Table: FC<TableProps> = ({ history }) => (
  <div className="p-8 w-full">
    {history.length === 0 ? (
      <p className="bold text-center">No History Found!!!</p>
    ) : (
      <table className="border-collapse border border-gray-300">
        <tbody>
          {history.map((value, index) => (
            <TableRow key={uuidv4()} rowNum={index + 1} value={value} />
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default Table;
