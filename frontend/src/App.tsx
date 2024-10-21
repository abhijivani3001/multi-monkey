import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './utils/ProtectedRoute';
import EmailVerify from './pages/EmailVerify';
import { useAuthContext } from './context/Auth/AuthContext';
import { useEffect } from 'react';
import { getMe } from './api/users/user.api';
import { useLoadingContext } from './context/Loading/LoadingContext';
import { IUserResponse } from './interfaces/response/user.response';
import ForgotPassword from './pages/ForgotPassword.tsx';

function App() {
  const { isAuth, setIsAuth, setUser } = useAuthContext();
  const { setIsLoading } = useLoadingContext();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      const isAuthenticated = !!token;
      setIsAuth(isAuthenticated);

      if (!isAuthenticated) {
        setUser(null);
      } else {
        try {
          setIsLoading(true);
          const res: IUserResponse = await getMe();
          if (res.success) {
            setUser(res.data.user);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUser();
  }, [setIsLoading, setIsAuth, setUser, isAuth]);

  return (
    <div className='flex flex-col h-screen max-w-screen-xl mx-auto w-full px-4 md:px-2'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        {isAuth ? (
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
            <Route path='/forgot-password' element={<ForgotPassword />} />
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
    </div>
  );
}

export default App;
