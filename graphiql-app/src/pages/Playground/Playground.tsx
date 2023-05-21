import { useState } from 'react';
import Textarea from '../../components/textarea/Textarea';
import './Playground.scss';
import React from 'react';
import AssidePlayground from '../../components/asside-playground/AssidePlayground';

function Playground() {
  const url = 'https://rickandmortyapi.com/graphql';
  const initialRequest = `query allCh{
      characters {
        results {
          name
        }
      }
    }`;
  const [request, setRequest] = useState<string>(initialRequest);
  const [response, setResponse] = useState<string>('');
  const [variables, setVariables] = useState<string>('');
  const [headers, setHeaders] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('');
  const [changeArrow, setChangeArrow] = useState<boolean>(false);

  const makeRequest = async (query: string) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query, variables: variables ? JSON.parse(variables) : '' }),
    });
    const dataResults = await res.json().then((data) => JSON.stringify(data, null, '\t'));
    setResponse(dataResults);
  };

  const onclickRequestHandler = () => {
    makeRequest(request);
  };

  const onClickVariables = () => {
    setActiveTab('variables');
    setChangeArrow(true);
  };

  const onClickHeaders = () => {
    setActiveTab('headers');
    setChangeArrow(true);
  };

  const onClickChangeArrow = () => {
    setChangeArrow(!changeArrow);
    changeArrow ? setActiveTab('') : setActiveTab('variables');
  };

  return (
    <div className="wrapper-playground">
      <AssidePlayground />
      <div className="editor-container">
        <div className="editor-left-container">
          {/* {schemaPrint?.map(function (item) {
            return <GraphQLSchemaTree schema={item} />;
          })} */}
          <div onClick={onclickRequestHandler} className="editor-play">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              fill="gray"
              viewBox="0 96 960 960"
              width="48"
            >
              <path d="m392 743 260-169-260-169v338ZM140 896q-24 0-42-18t-18-42V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680V316H140v520Zm0 0V316v520Z" />
            </svg>
          </div>
          <Textarea class={'request-container'} defaultValue={request} setValue={setRequest} />
          <div className="variables-wrapper">
            <div className="variables-header">
              <span
                onClick={onClickVariables}
                className={activeTab === 'variables' ? 'tab-active' : ''}
              >
                Variables
              </span>
              <span
                onClick={onClickHeaders}
                className={activeTab === 'headers' ? 'tab-active' : ''}
              >
                Headers
              </span>
              <span onClick={onClickChangeArrow}>
                {changeArrow ? (
                  <img className="arrow-round" src="src/assets/arrow_v.png" alt="arrow" />
                ) : (
                  <img className="arrow-round" src="src/assets/arrow_down.png" alt="arrow_down" />
                )}
              </span>
            </div>

            {activeTab === 'variables' ? (
              <Textarea
                class={'variables-container'}
                defaultValue={variables}
                setValue={setVariables}
              />
            ) : null}
            {activeTab === 'headers' ? (
              <Textarea
                class={'variables-container'}
                defaultValue={headers}
                setValue={setHeaders}
              />
            ) : null}
          </div>
        </div>

        <pre className="response-container">{response}</pre>
      </div>
    </div>
  );
}

export default Playground;
