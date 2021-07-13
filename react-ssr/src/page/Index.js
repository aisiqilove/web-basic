import React, { useState, useEffect } from 'react';

function index(props) {
    const [count, setCount] = useState(1);
    const [list, setList] = useState([]);
    useEffect(() => {
        setList([{ name: 'web全栈', id: 1 },
        { name: 'js高级', id: 2 },
        { name: 'web小白', id: 3 },
        { name: 'java架构师', id: 4 },])
    }, [])
    return <div>
        <h1>react ssr</h1>
        <h2>{count}</h2>
        <button onClick={() => { setCount(count + 1) }}>累加</button>
        {list.map(item => <div key={item.id}>{item.name}</div>)}
    </div>

}

export default index;