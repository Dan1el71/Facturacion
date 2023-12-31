/* eslint-disable react-hooks/rules-of-hooks */
import { ColumnDef } from '@tanstack/react-table'
import { Invoice } from '../../types/types'
import { useEffect, useState } from 'react'

const defaultColumn: Partial<ColumnDef<Invoice>> = {
  cell: ({ getValue, row: { index }, column: { id, columnDef }, table }) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onBlur()
        table.options.meta?.setEditedRows((old) => ({
          ...old,
          [index]: false,
        }))
      } else if (e.key === 'Escape') {
        setValue(initialValue)
        table.options.meta?.setEditedRows((old) => ({
          ...old,
          [index]: false,
        }))
      }
    }

    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    if (columnDef.meta?.editable && table.options.meta?.editedRows[index]) {
      return (
        <input
          id={index.toString()}
          className="text-center w-20 bg-[white] text-black font-medium rounded-md border border-gray-800"
          value={value as string}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          type={columnDef.meta?.type}
        />
      )
    }

    return <div>{value as string}</div>
  },
}

export default defaultColumn
