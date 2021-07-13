import React, { useState } from 'react';

function App(props) {
    const [count, setCount] = useState(1)
    return <div>
        <h1>react ssr</h1>
        <h2>{count}</h2>
        <button onClick={() => { setCount(count + 1) }}>累加</button>
    </div>

}

export default <App></App>;