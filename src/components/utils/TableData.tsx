interface TableDataProps {
  data: React.ReactNode;
}

export const TableData = ({ data }: TableDataProps) => {
  return <td className="px-4 py-2">{data}</td>;
};
