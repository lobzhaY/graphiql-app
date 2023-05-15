import { useState } from 'react';
import Textarea from '../../components/textarea/Textarea';
import './Playground.scss';


function Playground() {
  const url = 'https://rickandmortyapi.com/graphql'
    const initialRequest = `query allCh{
      characters {
        results {
          name
        }
      }
    }`
  const [request, setRequest] = useState<string>(initialRequest)
  const [response, setResponse] = useState<string>('')
  const [variables, setVariables] = useState<string>('')
  const [headers, setHeaders] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('')
  const [changeArrow, setChangeArrow] = useState<boolean>(false)
  const [openDocumentation, setOpenDocumentation] = useState<boolean>(false)

  const makeRequest = async (query:string) => {
        const res = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ query })
    });
    const dataResults =  await res.json().then((data) =>JSON.stringify(data) )
    setResponse(dataResults)
      }

    const onclickRequestHandler = () => {
      makeRequest(request)
     }

     const onClickVariables = () => {
      setActiveTab('variables')
      setChangeArrow(true)
     }

     const onClickHeaders = () => {
      setActiveTab('headers')
      setChangeArrow(true)
     }

     const onClickChangeArrow = () => {
      setChangeArrow(!changeArrow)
      changeArrow ?  setActiveTab('') : setActiveTab('variables')
      
     }

  return (
    <div className="wrapper-playground">
      <div className={openDocumentation ? 'aside-playground-open' : 'aside-playground'}>
       <div onClick={()=> setOpenDocumentation(!openDocumentation)}>
          <svg className='doka-svg' width="40" height="50" viewBox="0 0 40 50" fill='currentColor' xmlns="http://www.w3.org/2000/svg">
           <path fillRule="evenodd" clipRule="evenodd" d="M6.15385 0C5.3378 0 4.55517 0.324175 3.97813 0.90121C3.4011 1.47824 3.07692 2.26087 3.07692 3.07692V21.5385C3.07692 22.1505 3.32005 22.7375 3.75283 23.1702C4.18561 23.603 4.77258 23.8462 5.38461 23.8462C5.99665 23.8462 6.58362 23.603 7.0164 23.1702C7.44918 22.7375 7.69231 22.1505 7.69231 21.5385V4.61538H21.5385V13.0769C21.5385 16.0492 23.9508 18.4615 26.9231 18.4615H35.3846V44.6154H11.5385C10.9264 44.6154 10.3395 44.8585 9.90668 45.2913C9.4739 45.7241 9.23077 46.311 9.23077 46.9231C9.23077 47.5351 9.4739 48.1221 9.90668 48.5549C10.3395 48.9876 10.9264 49.2308 11.5385 49.2308H36.9231C37.7391 49.2308 38.5218 48.9066 39.0988 48.3296C39.6758 47.7525 40 46.9699 40 46.1538V13.7723C40.0008 12.9748 39.6919 12.2081 39.1385 11.6338L28.8062 0.938461C28.5192 0.641614 28.1755 0.405548 27.7954 0.244321C27.4153 0.0830938 27.0067 4.01945e-06 26.5938 0L6.15385 0ZM34.8554 13.8462L26.1538 4.83077V13.0769C26.1538 13.5015 26.4985 13.8462 26.9231 13.8462H34.8554ZM0 41.5385C0 38.4783 1.21566 35.5434 3.37954 33.3795C5.54342 31.2157 8.47827 30 11.5385 30H18.4615V26.1538C18.4615 24.7846 20.0092 24.1015 20.9169 25.0677L27.6923 32.3077L20.9169 39.5477C20.0092 40.5138 18.4615 39.8277 18.4615 38.4615V34.6154H11.5385C9.70235 34.6154 7.94143 35.3448 6.64311 36.6431C5.34478 37.9414 4.61538 39.7023 4.61538 41.5385V43.8461C4.61538 44.4582 4.37225 45.0452 3.93948 45.4779C3.5067 45.9107 2.91973 46.1538 2.30769 46.1538C1.69565 46.1538 1.10868 45.9107 0.675907 45.4779C0.243131 45.0452 9.12008e-09 44.4582 0 43.8461V41.5385Z"/>
          </svg>
        </div>
      </div>
     <div className='editor-container'>
        <div className='editor-left-container'>
          <div onClick={onclickRequestHandler} className='editor-play'>
            <svg xmlns="http://www.w3.org/2000/svg" height="48"  fill="gray" viewBox="0 96 960 960" width="48"><path d="m392 743 260-169-260-169v338ZM140 896q-24 0-42-18t-18-42V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680V316H140v520Zm0 0V316v520Z"/></svg>
          </div>
        <Textarea class={'request-container'}  defaultValue={request} setValue={setRequest} />
        <div className='variables-wrapper'>
           <div className='variables-header'>
             <span onClick={onClickVariables} className={activeTab === 'variables' ? 'tab-active' : ''}>Variables</span>
             <span onClick={onClickHeaders} className={activeTab === 'headers' ? 'tab-active' : ''}>Headers</span>
             <span onClick={onClickChangeArrow}>
              {changeArrow ? 
                <img className='arrow-round' src="src/assets/arrow_v.png" alt="arrow"/> :  
                <img className='arrow-round' src="src/assets/arrow_down.png" alt="arrow_down"/>}
              </span>
            </div>
      
          {activeTab === 'variables' ? <Textarea class={'variables-container'}  defaultValue={variables} setValue={setVariables} /> : null}
          {activeTab === 'headers' ? <Textarea class={'variables-container'}  defaultValue={headers} setValue={setHeaders} /> : null}
        </div>
        </div>
        
        <div className='response-container'>
          {response}
        </div>
     </div>
    </div>
  );
}

export default Playground;
