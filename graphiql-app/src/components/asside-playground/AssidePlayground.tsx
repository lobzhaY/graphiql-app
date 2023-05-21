import GraphQLSchemaTree from 'components/GraphQLSchemaTree/GraphQLSchemaTree';
import { buildClientSchema, getIntrospectionQuery, printSchema } from 'graphql';
import React, { useEffect, useState } from 'react';
import './AssidePlayground.scss';

function AssidePlayground() {
  const [openDocumentation, setOpenDocumentation] = useState<boolean>(false);
  const [schemaPrint, setSchemaPrint] = useState<any>();
  const [printMenu, setPrintMenu] = useState<JSX.Element>();
  const [visibleClass, setVisibleClass] = useState<boolean>(true);
  const url = 'https://rickandmortyapi.com/graphql';

  const getSchema = async () => {
    const schema = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    })
      .then((res) => res.json())
      .then((schemaJSON) => setSchemaPrint(schemaJSON.data['__schema'].types))
    // .then((sce) => buildTree(sce.data['__schema'].types))
    // .then(schemaJSON => printSchema(buildClientSchema(schemaJSON.data)))
    // .then(clientSchema => setSchemaPrint(clientSchema)); 
  };

  function build(list) {

    const html: JSX.Element[] = [];
    let item, deep;

    for (item in list) {

      deep = typeof list[item] == 'object';

      // console.log(Array.isArray(list[item]));


      html.push(<li key={item} onClick={(e) => changeClass(e)} ><span>{item} </span>{deep ? build(list[item]) : list[item]}</li>)

    }

    return <ul style={{ visibility: !visibleClass ? 'hidden' : 'visible' }}>{html}</ul>
  }

  function changeClass(e) {
    console.log(e.target.childNodes);
    const parent = e.target.parentNode;
    console.log(Object.entries(parent))
  }

  useEffect(() => {
    getSchema();
  }, []);

  useEffect(() => {
    if (schemaPrint) {
      setPrintMenu(build(schemaPrint));
    }
  }, [schemaPrint])

  return (
    <div className={openDocumentation ? 'aside-playground-open' : 'aside-playground'}>
      <div onClick={() => setOpenDocumentation(!openDocumentation)}>
        <div className="img-close">
          <svg className="svg" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.3333 1H5.66667C3.08934 1 1 3.08934 1 5.66667V38.3333C1 40.9107 3.08934 43 5.66667 43H38.3333C40.9107 43 43 40.9107 43 38.3333V5.66667C43 3.08934 40.9107 1 38.3333 1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 1V43M26.6667 15L33.6667 22L26.6667 29" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div className="img-open">
          <svg className="svg" width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38.3333 1H5.66667C3.08934 1 1 3.08934 1 5.66667V38.3333C1 40.9107 3.08934 43 5.66667 43H38.3333C40.9107 43 43 40.9107 43 38.3333V5.66667C43 3.08934 40.9107 1 38.3333 1Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 1V43M31.3333 29L24.3333 22L31.3333 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
      <div className="documentation">
        {schemaPrint?.map(function (item) {
          return <GraphQLSchemaTree schema={item} />;
        })}
      </div>
    </div>
  );
}

export default AssidePlayground;
