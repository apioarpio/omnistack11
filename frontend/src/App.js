import React, {useState} from 'react';
import Header from "./Header";
import Routes from "./routes";

import './global.css'

function App() {

    const [counter, setCounter] = useState(0);

    function increment() {
        setCounter(counter + 1);
    }

    return (
        <Routes/>
    );
}

export default App;
