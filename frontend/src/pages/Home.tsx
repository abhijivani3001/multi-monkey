import Loader from '@/components/loader/Loader';
import SwitchModeTab from '@/components/mode/SwitchModeTab';
import TextArea from '@/components/textarea/TextArea';
import { useAuthContext } from '@/context/Auth/AuthContext';
import { useLoadingContext } from '@/context/Loading/LoadingContext';
import { useEffect } from 'react';

const Home = () => {
  const { user } = useAuthContext();
  const { isLoading } = useLoadingContext();

  useEffect(() => {
    const fun = async () => {
      try {
        console.log(user);
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SwitchModeTab />
          <TextArea />
        </>
      )}
    </>
  );
};

export default Home;
