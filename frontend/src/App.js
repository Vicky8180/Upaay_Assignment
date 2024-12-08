

import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Auth from './components/auth/Auth';


function SecureRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user')); 
  return user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
 
        <Route
          path="/dashboard"
          element={
            <SecureRoute>
              <Dashboard />
            </SecureRoute>
          }
        />
       
        <Route path="/" element={<Auth />} />
        <Route path="*" element={<><h1 style={{color:"red", textAlign:"center"}}>Opps! Check the url.</h1>  </>} />
      </Routes>
    </Router>
  );
}

export default App;
