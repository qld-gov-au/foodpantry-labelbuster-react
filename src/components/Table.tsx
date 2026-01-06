import React from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


type TableSectionRow = {
  cells: React.ReactNode[];
  className?: string;
};

type TableProps = {
  headers: React.ReactNode[];
  rows: TableSectionRow[];
  editableRows?: string[][];
  onRowsChange?: (rows: string[][]) => void;
  addRowLabel?: React.ReactNode;
  deleteRowLabel?: React.ReactNode;
  allowReorder?: boolean;
  caption?: string;
  subCaption?: string;
  footerRows?: TableSectionRow[];
  tableClassName?: string;
};

export const Table: React.FC<TableProps> = ({
  headers,
  rows,
  editableRows,
  onRowsChange,
  addRowLabel = "Add row",
  deleteRowLabel = "Delete",
  allowReorder = false,
  caption,
  subCaption,
  footerRows,
  tableClassName = "",
}) => {
  const isEditable = Array.isArray(editableRows) && !!onRowsChange;

  const handleCellChange = (
    rowIndex: number,
    cellIndex: number,
    value: string
  ) => {
    if (!editableRows || !onRowsChange) return;
    const nextRows = editableRows.map((row) => [...row]);
    if (!nextRows[rowIndex]) return;
    nextRows[rowIndex][cellIndex] = value;
    onRowsChange(nextRows);
  };

  const handleAddRow = () => {
    if (!editableRows || !onRowsChange) return;
    const newRow = headers.map(() => "");
    onRowsChange([...editableRows, newRow]);
  };

  const handleDeleteRow = (rowIndex: number) => {
    if (!editableRows || !onRowsChange) return;
    onRowsChange(editableRows.filter((_, index) => index !== rowIndex));
  };

  const handleReorder = (fromIndex: number, toIndex: number) => {
    if (!editableRows || !onRowsChange) return;
    if (fromIndex === toIndex) return;
    const nextRows = editableRows.map((row) => [...row]);
    const [moved] = nextRows.splice(fromIndex, 1);
    nextRows.splice(toIndex, 0, moved);
    onRowsChange(nextRows);
  };

  return (
    <div className="table-responsive qld-table" style={{ width: "60vw" }}>
      <table className={`table ${tableClassName}`.trim()}>
        {(caption || subCaption) && (
          <caption className="caption">
            {caption}
            {subCaption && <span className="sub-caption">{subCaption}</span>}
          </caption>
        )}

        <thead>
          <tr>
            {isEditable && allowReorder && <th scope="col"></th>}
            {headers.map((header, index) => (
              <th scope="col" key={index}>
                {header}
              </th>
            ))}
            {isEditable && <th scope="col">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {isEditable && editableRows
            ? editableRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  onDragOver={(event) => {
                    if (isEditable && allowReorder) {
                      event.preventDefault();
                    }
                  }}
                  onDrop={(event) => {
                    if (!isEditable || !allowReorder) return;
                    event.preventDefault();
                    const fromIndex = Number(
                      event.dataTransfer.getData("text/plain")
                    );
                    if (Number.isNaN(fromIndex)) return;
                    handleReorder(fromIndex, rowIndex);
                  }}
                >
                  {isEditable && allowReorder && (
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        draggable
                        onDragStart={(event) => {
                          event.dataTransfer.setData(
                            "text/plain",
                            String(rowIndex)
                          );
                          event.dataTransfer.effectAllowed = "move";
                        }}
                        aria-label="Reorder row"
                      >
                        <FontAwesomeIcon icon={faBars} />{" "}
                      </button>
                    </td>
                  )}
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <input
                        className="form-control"
                        aria-label={`Row ${rowIndex + 1}, Column ${
                          cellIndex + 1
                        }`}
                        type="text"
                        value={row[cellIndex] ?? ""}
                        onChange={(e) =>
                          handleCellChange(rowIndex, cellIndex, e.target.value)
                        }
                      />
                    </td>
                  ))}
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => handleDeleteRow(rowIndex)}
                    >
                      {deleteRowLabel}
                    </button>
                  </td>
                </tr>
              ))
            : rows.map((row, rowIndex) => (
                <tr className={row.className ?? ""} key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
        </tbody>

        {footerRows && footerRows.length > 0 && (
          <tfoot>
            {footerRows.map((row, rowIndex) => (
              <tr className={row.className ?? ""} key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
      {isEditable && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            margin: "10px 0 10px 0",
          }}
        >
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={handleAddRow}
          >
            {addRowLabel}
          </button>
        </div>
      )}
    </div>
  );
};
