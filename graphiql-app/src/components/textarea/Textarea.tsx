import React from 'react';
import '../../pages/Playground/Playground.scss'

type PropsType = {
    class: string;
    defaultValue: string;
    setValue: (defaultValue: string)=> void 

}

function Textarea(props: PropsType) {
 
  return (
    <>
    <textarea className={props.class} onChange={(e)=>props.setValue(e.target.value)} defaultValue={props.defaultValue} />
    </>
  );
}

export default Textarea;
