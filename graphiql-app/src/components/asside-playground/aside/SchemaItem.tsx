import React from 'react';
import QueryItem from './QueryItem';
import { FullType } from './types';


interface SchemaItemProps {
  items: FullType[];
}

export const SchemaItem: React.FC<SchemaItemProps> = ({ items }) => {
 
  return (
  <div>
    <div>
    <h2>Schema</h2>
    </div>
        
        <ul>
          {items.map((item) => {
            if (item.name === 'Query') {
              return <QueryItem key={item.name} name={item.name} fields={item.fields} items={items}/>;
            }
            return null;
          })}
        </ul>
      </div>
  ); 
};
