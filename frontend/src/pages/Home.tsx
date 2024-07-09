import SwitchModeTab from '@/components/mode/SwitchModeTab';
import TextArea from '@/components/textarea/TextArea';
import { account } from '@/config/appwrite/appwriteConfig';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    const fun = async () => {
      try {
        const user = await account.get();
        console.log(user);
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
