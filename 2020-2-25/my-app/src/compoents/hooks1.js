import React,{useState} from 'react';

export default function (){
    const [num,setnum] = useState(0);
    return (
        <button onClick={()=>{setnum(num+1)}}>{num}</button>
    )
}