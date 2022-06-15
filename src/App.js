
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { useEffect } from 'react';
import { gapi } from 'gapi-script'

const clientID = "758355478549-9f5muabk71ujaqcq2su6khat5muk3f97.apps.googleusercontent.com"

function App() {

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientID,
        scope: ""
      })
    }

    gapi.load('client:auth2',start);
  })

  return (
    <div>
      <BrowserRouter>
        <Routes>
          
          <Route path='' element={<Login/>} />
          <Route path='dashboard' element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
