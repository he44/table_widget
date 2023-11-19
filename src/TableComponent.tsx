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
    const [rows, setRows] = useState<TableRow[]>([
        { key: '--int-flag-1', keyType: 'integer', value: 0 },
        { key: '--bool-flag-1', keyType: 'bool', value: false },
        { key: '--string-flag-1', keyType: 'string', value: '' }
    ]);

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

    const deleteRow = (index: number) => {
        const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
        setRows(newRows);
    };

    return (
        <div style={{ width: '90%', margin: 'auto' }}>
            <table style={{ width: '100%', boxSizing: 'border-box' }}>
                <thead>
                    <tr>
                        <th>Flag</th>
                        <th colSpan={2}>Value</th>
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
                            <td>
                                <button onClick={() => deleteRow(index)} style={{ border: 'none', background: 'none' }}>
                                    &#10006; {/* Represents a tiny cross */}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
            <div style={{ textAlign: 'right', marginTop: '10px' }}>
                <button
                    onClick={addNewRow}
                    style={{
                        width: '30%', // Shorter width
                        padding: '5px', // Adjust padding for height
                        textAlign: 'center',
                        backgroundColor: 'rgba(138, 43, 226, 0.65)', // Foxglove purple with transparency
                        color: 'white', // Text color
                        fontWeight: 'bold', // Bold font
                        border: 'none', // Optional: remove border
                        borderRadius: '5px', // Optional: rounded corners
                        cursor: 'pointer' // Changes cursor on hover
                    }}
                >
                    Set a new flag
                </button>
            </div>
            <input
                type="text"
                placeholder='Other flags you might want to pass. E.g. --other-flag="some value"'
                style={{ width: '100%', marginTop: '20px', height: '15px', padding: '10px', boxSizing: 'border-box' }} // Add some styling as needed
            />
        </div >
    );
};

export default TableComponent;
