import React, { Suspense, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Loader from '../../loader/Loader';

import { Schema } from './types';

import '../AssidePlayground.scss';

const SchemaItem = React.lazy(() => import('./SchemaItem'));

function Sidebar() {
  const [openDocumentation, setOpenDocumentation] = useState<boolean>(false);

  const [schema, setSchema] = useState<Schema | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchema = async (): Promise<void> => {
      try {
        const response = await fetch('https://rickandmortyapi.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
            query IntrospectionQuery {
              __schema {
                queryType { name }
                mutationType { name }
                subscriptionType { name }
                types {
                  ...FullType
                }
                directives {
                  name
                  description
                  args {
                    ...InputValue
                  }
                }
              }
            }
          
            fragment FullType on __Type {
              kind
              name
              description
              fields(includeDeprecated: true) {
                name
                description
                args {
                  ...InputValue
                }
                type {
                  ...TypeRef
                }
                isDeprecated
                deprecationReason
              }
              inputFields {
                ...InputValue
              }
              interfaces {
                ...TypeRef
              }
              enumValues(includeDeprecated: true) {
                name
                description
                isDeprecated
                deprecationReason
              }
              possibleTypes {
                ...TypeRef
              }
            }
          
            fragment InputValue on __InputValue {
              name
              description
              type { ...TypeRef }
              defaultValue
            }
          
            fragment TypeRef on __Type {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                  }
                }
              }
            }`,
          }),
        });

        const { data } = await response.json();
        setSchema(data.__schema);
      } catch (error) {
        console.error('Failed to fetch schema:', error);
      }
    };

    fetchSchema();
  }, []);

  const onClickDoc = () => {
    if (openDocumentation) {
      navigate('/graphiql');
    }
    setOpenDocumentation(!openDocumentation);
  };

  return (
    <div className={openDocumentation ? 'aside-playground-open' : 'aside-playground'}>
      <div onClick={onClickDoc}>
        <div className="img-close">
          <svg
            className="svg"
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.3333 1H5.66667C3.08934 1 1 3.08934 1 5.66667V38.3333C1 40.9107 3.08934 43 5.66667 43H38.3333C40.9107 43 43 40.9107 43 38.3333V5.66667C43 3.08934 40.9107 1 38.3333 1Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 1V43M26.6667 15L33.6667 22L26.6667 29"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="img-open">
          <svg
            className="svg"
            width="44"
            height="44"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38.3333 1H5.66667C3.08934 1 1 3.08934 1 5.66667V38.3333C1 40.9107 3.08934 43 5.66667 43H38.3333C40.9107 43 43 40.9107 43 38.3333V5.66667C43 3.08934 40.9107 1 38.3333 1Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 1V43M31.3333 29L24.3333 22L31.3333 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <div className="documentation">
        {schema && (
          <Suspense fallback={<Loader />}>
            <SchemaItem items={schema.types} />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
