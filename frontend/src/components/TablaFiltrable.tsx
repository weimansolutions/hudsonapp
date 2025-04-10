'use client';

import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';

interface TablaFiltrableProps<T> {
  data: T[];
  visibleColumns: (keyof T)[];
  filterableFields?: (keyof T)[];
  numericalColumns?: (keyof T)[];
  title?: string;
}

export default function TablaFiltrable<T extends Record<string, any>>({
  data,
  visibleColumns,
  filterableFields = [],
  numericalColumns = [],
  title = 'Tabla',
}: TablaFiltrableProps<T>) {
  const [orden, setOrden] = useState<keyof T>(visibleColumns[0]);
  const [ascendente, setAscendente] = useState(true);
  const [globalSearch, setGlobalSearch] = useState('');
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [numericFilters, setNumericFilters] = useState<Record<string, { op: string; value1?: number; value2?: number }>>({});
  const [extraFilters, setExtraFilters] = useState<Record<string, string>>({});

  const valoresExtra = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const campo of filterableFields) {
      const unicos = Array.from(
        new Set(
          data
            .map((item) => item?.[campo])
            .filter((v) => v !== undefined && v !== null)
        )
      );
      result[campo as string] = ['Todos', ...unicos.map((v) => String(v))];
    }
    return result;
  }, [data, filterableFields]);

  const filteredData = useMemo(() => {
    let resultado = [...data];

    for (const campo of filterableFields) {
      const valor = extraFilters[campo as string];
      if (valor && valor !== 'Todos') {
        resultado = resultado.filter((item) => String(item[campo]) === valor);
      }
    }

    if (globalSearch.trim() !== '') {
      resultado = resultado.filter((item) =>
        visibleColumns.some((col) =>
          String(item[col]).toLowerCase().includes(globalSearch.toLowerCase())
        )
      );
    }

    for (const col of visibleColumns) {
      if (numericalColumns.includes(col)) {
        const f = numericFilters[col as string];
        if (f) {
          const { op, value1, value2 } = f;
          if (op && value1 !== undefined) {
            resultado = resultado.filter((item) => {
              const val = Number(item[col]);
              switch (op) {
                case '=': return val === value1;
                case '≠': return val !== value1;
                case '>': return val > value1;
                case '<': return val < value1;
                case '≥': return val >= value1;
                case '≤': return val <= value1;
                case 'entre':
                  if (value2 === undefined) return true;
                  return val >= value1 && val <= value2;
                default: return true;
              }
            });
          }
        }
      } else {
        const filtro = columnFilters[col as string];
        if (filtro && filtro.trim() !== '') {
          resultado = resultado.filter((item) =>
            String(item[col]).toLowerCase().includes(filtro.toLowerCase())
          );
        }
      }
    }

    resultado.sort((a, b) => {
      const aVal = a[orden];
      const bVal = b[orden];
      if (aVal < bVal) return ascendente ? -1 : 1;
      if (aVal > bVal) return ascendente ? 1 : -1;
      return 0;
    });

    return resultado;
  }, [data, orden, ascendente, globalSearch, columnFilters, numericFilters, extraFilters]);

  const manejarOrden = (col: keyof T) => {
    if (orden === col) {
      setAscendente(!ascendente);
    } else {
      setOrden(col);
      setAscendente(true);
    }
  };

  const exportarAExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredData.map((item) => {
        const fila: Partial<T> = {};
        visibleColumns.forEach((col) => {
          fila[col] = item[col];
        });
        return fila;
      })
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tabla');
    XLSX.writeFile(wb, 'tabla_filtrada.xlsx');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        {filterableFields.map((campo) => (
          <div key={String(campo)}>
            <label className="mr-2 font-medium capitalize">{String(campo)}:</label>
            <select
              value={extraFilters[campo as string] || 'Todos'}
              onChange={(e) =>
                setExtraFilters((prev) => ({
                  ...prev,
                  [campo as string]: e.target.value,
                }))
              }
              className="border px-2 py-1 rounded"
            >
              {valoresExtra[campo as string].map((val, i) => (
                <option key={i} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        ))}

        <input
          type="text"
          placeholder="Búsqueda general..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          className="border px-3 py-1 rounded w-64"
        />

        <button
          onClick={exportarAExcel}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Exportar a Excel
        </button>
      </div>

      <table className="w-full table-auto border border-gray-300 text-xs">
        <thead className="bg-gray-100">
          <tr>
            {visibleColumns.map((col) => (
              <th
                key={String(col)}
                className="border px-2 py-1 cursor-pointer hover:bg-gray-200"
                onClick={() => manejarOrden(col)}
              >
                {String(col).toUpperCase()} {orden === col ? (ascendente ? '▲' : '▼') : ''}
              </th>
            ))}
          </tr>
          <tr>
            {visibleColumns.map((col) => {
              if (numericalColumns.includes(col)) {
                const filter = numericFilters[col as string] || { op: '', value1: undefined, value2: undefined };
                return (
                  <th key={String(col)} className="border px-2 py-1">
                    <div className="flex flex-col gap-1">
                      <select
                        className="text-xs border rounded px-1"
                        value={filter.op}
                        onChange={(e) =>
                          setNumericFilters((prev) => ({
                            ...prev,
                            [col as string]: {
                              ...prev[col as string],
                              op: e.target.value,
                            },
                          }))
                        }
                      >
                        <option value="">--</option>
                        <option value="=">=</option>
                        <option value="≠">≠</option>
                        <option value=">">&gt;</option>
                        <option value="<">&lt;</option>
                        <option value="≥">≥</option>
                        <option value="≤">≤</option>
                        <option value="entre">Entre</option>
                      </select>

                      {filter.op === 'entre' ? (
                        <div className="flex gap-1">
                          <input
                            type="number"
                            className="w-1/2 border text-xs rounded px-1"
                            placeholder="min"
                            value={filter.value1 ?? ''}
                            onChange={(e) =>
                              setNumericFilters((prev) => ({
                                ...prev,
                                [col as string]: {
                                  ...prev[col as string],
                                  value1: Number(e.target.value),
                                },
                              }))
                            }
                          />
                          <input
                            type="number"
                            className="w-1/2 border text-xs rounded px-1"
                            placeholder="max"
                            value={filter.value2 ?? ''}
                            onChange={(e) =>
                              setNumericFilters((prev) => ({
                                ...prev,
                                [col as string]: {
                                  ...prev[col as string],
                                  value2: Number(e.target.value),
                                },
                              }))
                            }
                          />
                        </div>
                      ) : (
                        <input
                          type="number"
                          className="w-full border text-xs rounded px-1"
                          placeholder="valor"
                          value={filter.value1 ?? ''}
                          onChange={(e) =>
                            setNumericFilters((prev) => ({
                              ...prev,
                              [col as string]: {
                                ...prev[col as string],
                                value1: Number(e.target.value),
                              },
                            }))
                          }
                        />
                      )}
                    </div>
                  </th>
                );
              } else {
                return (
                  <th key={String(col)} className="border px-3 py-1">
                    <input
                      type="text"
                      placeholder={`Filtrar ${String(col)}`}
                      className="w-full border px-2 py-1 rounded text-xs"
                      value={columnFilters[col as string] || ''}
                      onChange={(e) =>
                        setColumnFilters((prev) => ({
                          ...prev,
                          [col as string]: e.target.value,
                        }))
                      }
                    />
                  </th>
                );
              }
            })}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {visibleColumns.map((col) => (
                  <td key={String(col)} className="border px-3 py-2">
                    {item[col]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={visibleColumns.length}
                className="text-center py-4 text-gray-500"
              >
                No hay resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
