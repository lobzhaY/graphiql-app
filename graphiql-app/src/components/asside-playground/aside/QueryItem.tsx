import React from 'react';

import { Link, Route, Routes } from 'react-router-dom';

import { FieldTypeData, QueryFields } from './QueryFields';

import { Field, FullType } from './types';

function QueryItem({ name, fields, items }: { name: string; fields: Field[]; items: FullType[] }) {
  return (
    <li>
      <Link to={`*/query/${name}`}>{name}</Link>
      <Routes>
        <Route path={`*/query/${name}/*`} element={<QueryFields fields={fields} />} />
        {fields.map((field: Field) => (
          <Route
            key={field.type.name}
            path={`*/query/Query/*/field/${field.type.name}`}
            element={<FieldTypeData items={items} typeName={field.type.name} />}
          />
        ))}
      </Routes>
    </li>
  );
}

export default QueryItem;
