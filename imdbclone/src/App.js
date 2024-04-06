import './App.css';
import Navbar from './Componants/Navbar';
import Banner from './Componants/Banner/Banner';
import Movies from './Componants/Movies/Movies';
import WatchList from './Componants/WatchList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
function App() {
  return (
    <div className=' bg-slate-500'>
      <BrowserRouter>
        <Routes>
          < Route path='/' element={
            <Fragment>
              <Navbar />
              <Banner />
              <Movies />
            </Fragment>
          }></Route>
          <Route path='/WatchList' element={
            <Fragment>
              <Navbar />
              <WatchList />
            </Fragment>
          }>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
