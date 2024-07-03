import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './utils/ProtectedRoute';
import EmailVerify from './pages/EmailVerify';

function App() {
  const user = false;
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        {user ? (
          <>
            <Route
              path='/login'
              element={
                <Navigate to='/profile' state={{ from: location }} replace />
              }
            />
            <Route
              path='/signup'
              element={
                <Navigate to='/profile' state={{ from: location }} replace />
              }
            />
          </>
        ) : (
          <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </>
        )}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route
          path='/api/users/:userId/verify/:token'
          element={<EmailVerify />}
        />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
