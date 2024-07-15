import SwitchModeTab from '@/components/mode/SwitchModeTab';
import TextArea from '@/components/textarea/TextArea';
import { account } from '@/config/appwrite/appwriteConfig';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const fun = async () => {
      try {
        const user = await account.get();
        const token = await account.getSession('current');
        console.log(user, token);
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, []);

  return (
    <>
      <SwitchModeTab />
      <TextArea />
    </>
  );
};

export default Home;
