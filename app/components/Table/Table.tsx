import React from "react";
import Link from "next/link";

export interface TableItems {
  id: string;
  name: string;
  purchaseAmount: string;
  purchaseDate: string;
  purchaseType: string;
}

export interface TableHeaderItem {
  name: string;
}

export interface TableProps {
  headers: TableHeaderItem[];
  items: TableItems[];
}

const ThTable: React.FC<TableHeaderItem> = ({ name }) => {
  return <th key={name}>{name}</th>;
};

const TrTable: React.FC<TableItems> = ({
  id,
  name,
  purchaseDate,
  purchaseType,
  purchaseAmount
}) => {
  return (
    <tr key={id}>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>{name}</td>
      <td>{purchaseAmount}</td>
      <td>{purchaseDate}</td>
      <td>{purchaseType}</td>
      <th>
        <Link href={"/expense/" + id}>
          <button className="btn btn-ghost btn-xs">
            Editar
          </button>
        </Link>
      </th>
    </tr>
  );
};

const Table: React.FC<TableProps> = ({ headers, items }) => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              {headers &&
                headers
                  .filter((key) => key.name !== "id")
                  .map(({ name: columnName }) => (
                    <>
                      <ThTable name={columnName} />
                    </>
                  ))}
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map(
                ({
                  id: itemId,
                  name: itemName,
                  purchaseDate: itemDate,
                  purchaseType: itemType,
                  purchaseAmount: itemAmout,
                }) => (
                  <TrTable
                    key={itemId}
                    id={itemId}
                    name={itemName}
                    purchaseDate={itemDate}
                    purchaseType={itemType}
                    purchaseAmount={itemAmout}
                  />
                )
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
