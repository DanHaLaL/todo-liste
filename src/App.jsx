// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Todo from "./page/Todo"
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Page from './page/Page2'
import Detail from './page/Detail'


function App() {
  // const [count, setCount] = useState(0)
  // let i = 0;

  return (
    <>
      {/* <Todo>
      </Todo> */}
      <Router>
        <Routes>
          <Route path='/' element={<Todo />}></Route>
          <Route path='/Page2' element={<Page/>}></Route>
          <Route path='/detail/:id' element={<Detail/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
