import Loader from '@/components/loader/Loader';
import SwitchModeTab from '@/components/mode/SwitchModeTab';
import TextArea from '@/components/textarea/TextArea';
import { useLoadingContext } from '@/context/Loading/LoadingContext';

const Home = () => {
  const { isLoading } = useLoadingContext();

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
