import React, { useState } from 'react';

function GraphQLSchemaTree({ schema }) {
  const [show, setShow] = useState(false);

  const renderType = (type) => {
    if (type?.kind === 'OBJECT') {
      if (type?.fields) {
        return (
          <div className="title" onClick={() => setShow((prev) => !prev)}>
            <strong>{type?.name}</strong>
            {show && (
              <ul>
                {type?.fields?.map((field) => (
                  <li key={field.name}>
                    {field.name}: {field.type?.name}
                  </li>
                ))}
              </ul>
            )}
            {type?.fields?.map((field) => renderType(field.type))}
          </div>
        );
      }
    }

    if (type?.kind === 'LIST' || type?.kind === 'NON_NULL') {
      return renderType(type?.ofType);
    }

    return null;
  };

  return <div className="render">{renderType(schema)}</div>;
}

export default GraphQLSchemaTree;
