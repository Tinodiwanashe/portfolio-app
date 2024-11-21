import React from 'react'

type ListComponentProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    className?: string;
}

// generic component can use a <,> or with an extend `<T extends {}>` constraint so it doesnt error
const ListComponent = <T extends {}>({ items, renderItem, className}: ListComponentProps<T>) => {
  return (
    <ul className={className}>
        {items.map((item) => (
          renderItem(item)
        ))}
    </ul>
  )
}

export default ListComponent

// In the List component's type definition, the <T extends {}> syntax is used to specify a type parameter called T. 
// Type parameters are used to create generic types in TypeScript, which allow you to define a type that can work with a variety of different types.

// The extends {} part of the type parameter definition specifies that the T type parameter must be a subtype of the empty object type {}. 
// This means that it can be any type except for null or undefined.