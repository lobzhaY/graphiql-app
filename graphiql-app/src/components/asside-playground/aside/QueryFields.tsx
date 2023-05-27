import React from 'react';

import { Link } from 'react-router-dom';

import { Field, FullType, TypeRef } from './types';

import './QueryFields.scss';

export function FieldTypeData({ typeName, items }: { typeName: string; items: FullType[] }) {
  const typeData = items.filter((item: FullType) => item.name === typeName);

  return (
    <div>
      <h3>{typeName} Data:</h3>
      {typeData[0].fields.map(
        (field: { name: string; description: string; type: TypeRef }, index) => (
          <div key={index}>
            <div className="fieldData__name">
              {field.name}: {field.type.name}
            </div>
            <div>{field.description}</div>
          </div>
        )
      )}
    </div>
  );
}

export function QueryFields({ fields }: { fields: Field[] }) {
  return (
    <div>
      <h3 className="field__h3">Fields:</h3>
      <ul>
        {fields.map((field) => (
          <li key={field.name} className="field__li">
            <div>
              {field.name} ({' '}
              {field.args.map((arg, index) => (
                <React.Fragment key={arg.name}>
                  {index > 0 && ', '}
                  <span>
                    <span className="field__arg">{arg.name}</span>:{' '}
                    {arg.type.ofType?.name ||
                      arg.type.name ||
                      arg.type.ofType?.ofType?.ofType?.name}
                  </span>
                </React.Fragment>
              ))}
              ):
              <Link
                className="field__link"
                to={`*/field/${field.type.name || field.type.ofType?.name}`}
              >
                <span className="field__type-name">
                  {' '}
                  {field.type.name || field.type.ofType?.name}
                </span>
              </Link>
            </div>
            <div>{field.description}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
