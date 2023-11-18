import React, { useState, ChangeEvent } from 'react';
import Select, { SingleValue } from 'react-select';

type KeyType = 'integer' | 'bool' | 'string';

interface TableRow {
    key: string;
    keyType: KeyType;
    value: any;
}

const options: { value: string; label: string; type: KeyType }[] = [
    { value: '--bool-flag-1', label: '--bool-flag-1', type: 'bool' },
    { value: '--bool-flag-2', label: '--bool-flag-2', type: 'bool' },
    { value: '--bool-flag-3', label: '--bool-flag-3', type: 'bool' },
    { value: '--int-flag-1', label: '--int-flag-1', type: 'integer' },
    { value: '--int-flag-2', label: '--int-flag-2', type: 'integer' },
    { value: '--int-flag-3', label: '--int-flag-3', type: 'integer' },
    { value: '--string-flag-1', label: '--string-flag-1', type: 'string' },
    { value: '--string-flag-2', label: '--string-flag-2', type: 'string' },
    { value: '--string-flag-3', label: '--string-flag-3', type: 'string' },
];

const TableComponent: React.FC = () => {
    const [rows, setRows] = useState<TableRow[]>([]);

    const handleKeyChange = (
        selectedOption: SingleValue<{ value: string; label: string; type: KeyType }>,
        index: number
    ) => {
        const newRows = [...rows];
        newRows[index] = {
            ...newRows[index],
            key: selectedOption ? selectedOption.value : '',
            keyType: selectedOption ? selectedOption.type : 'string',
        };
        setRows(newRows);
    };

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        const newRows = [...rows];
        const { keyType } = newRows[index];
        newRows[index] = {
            ...newRows[index],
            value: keyType === 'bool' ? event.target.checked : event.target.value,
        };
        setRows(newRows);
    };

    const addNewRow = () => {
        const newRow: TableRow = { key: '', keyType: 'string', value: '' };
        setRows([...rows, newRow]);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td>
                            <Select
                                defaultValue={{ value: row.key, label: row.key, type: row.keyType }}
                                options={options}
                                onChange={(option) => handleKeyChange(option, index)}
                            />
                        </td>
                        <td>
                            {row.keyType === 'bool' ? (
                                <input
                                    type="checkbox"
                                    checked={row.value}
                                    onChange={(e) => handleValueChange(e, index)}
                                />
                            ) : row.keyType === 'integer' ? (
                                <input
                                    type="number"
                                    value={row.value}
                                    onChange={(e) => handleValueChange(e, index)}
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={row.value}
                                    onChange={(e) => handleValueChange(e, index)}
                                />
                            )}
                        </td>
                    </tr>
                ))}
                <tr>
                    <td colSpan={2}>
                        <button onClick={addNewRow} style={{ width: '100%' }}>Add Row</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default TableComponent;
