import React from 'react'
import ReactDom from 'react-dom'
import App from '../src/App'
import { BrowserRouter } from "react-router-dom";
const Page = <BrowserRouter>{App}</BrowserRouter>
// 注水
ReactDom.hydrate(Page, document.getElementById('root'))
