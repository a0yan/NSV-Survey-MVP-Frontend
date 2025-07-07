import React from 'react';
import { Text, View } from 'react-native';

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T, idx: number) => string | number;
  title?: string;
}

function Table<T>({ columns, data, rowKey, title }: TableProps<T>) {
  return (
    <View className="bg-white  rounded-xl border border-gray-200  overflow-hidden">
      {title && (
        <Text className="font-bold text-base px-4 pt-4 pb-2 text-gray-900">{title}</Text>
      )}
      {/* Header */}
      <View className="flex-row border-b border-gray-100  px-4 py-2 bg-gray-50 ">
        {columns.map((col) => (
          <Text
            key={String(col.key)}
            className="font-medium text-xs text-gray-500 flex-1"
          >
            {col.label}
          </Text>
        ))}
      </View>
      {/* Rows */}
      {data.map((row, idx) => (
        <View
          key={rowKey(row, idx)}
          className="flex-row items-center px-4 py-3 border-b border-gray-100 "
        >
          {columns.map((col) => {
            const value = row[col.key];
            return (
              <View key={String(col.key)} className="flex-1">
                    <Text className="text-sm text-gray-900 ">{String(value)}</Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

export default Table;
