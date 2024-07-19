import SwitchModeTab from '@/components/mode/SwitchModeTab';
import TextArea from '@/components/textarea/TextArea';
import { useAuthContext } from '@/context/Auth/AuthContext';
import { useEffect } from 'react';

const Home = () => {
  const { user } = useAuthContext();

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
      <SwitchModeTab />
      <TextArea />
    </>
  );
};

export default Home;
