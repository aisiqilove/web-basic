import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Index from './page/Index';
import About from './page/About';

export default (
    <div>
        <Route path="/" exact component={Index}></Route>
        <Route path="/about" exact component={About}></Route>
    </div>
);
