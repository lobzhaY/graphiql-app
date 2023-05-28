import React, { useState } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';

import Sidebar from 'components/asside-playground/aside/Sidebar';
import Textarea from '../../components/textarea/Textarea';

import './Playground.scss';

import arrowUp from '../../assets/arrow_v.png';
import arrowDown from '../../assets/arrow_down.png';

const url = 'https://rickandmortyapi.com/graphql';

function Playground() {
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
  const [headers1, setHeaders1] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('');
  const [changeArrow, setChangeArrow] = useState<boolean>(false);

  const { t } = useTranslation();

  const makeRequest = async (query: string) => {
    let headersFromTextarea;

    try {
      headersFromTextarea = headers1 !== '' && JSON.parse(headers1);
    } catch (err) {
      toast.error(`${t('errors.headers')}`);
    }
    let variablesFromTextarea;
    try {
      variablesFromTextarea = variables !== '' && JSON.parse(variables);
    } catch (err) {
      toast.error(`${t('errors.variables')}`);
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        ...headersFromTextarea,
      },

      body: JSON.stringify({ query, variables: variables ? variablesFromTextarea : '' }),
    });
    await res
      .json()
      .then((data) => setResponse(JSON.stringify(data, null, ' ')))
      .catch(() => {
        toast.error(`${t('errors.request')}`);
      });
  }; 

  const onclickRequestHandler = () => {
    setResponse('');
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
      <div className="editor-container">
        <Sidebar />
        <div className="editor-left-container">
          <div onClick={onclickRequestHandler} className="editor-play">
            <svg
              className="svg"
              xmlns="http://www.w3.org/2000/svg"
              height="48"
              fill="#ffffff"
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
                  <img className="arrow-round" src={arrowUp} alt="arrow" />
                ) : (
                  <img className="arrow-round" src={arrowDown} alt="arrow_down" />
                )}
              </span>
            </div>
            <ToastContainer />
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
                defaultValue={headers1}
                setValue={setHeaders1}
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
