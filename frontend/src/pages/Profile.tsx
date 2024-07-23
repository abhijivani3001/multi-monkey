import { useAuthContext } from '@/context/Auth/AuthContext';
import { useScoresContext } from '@/context/Scores/ScoresContext';
import { useEffect, useState } from 'react';
import { useLoadingContext } from '@/context/Loading/LoadingContext';
import { getScores } from '@/api/score/score.api';
import { IGetScoresResponse } from '@/interfaces/response/score.response';
import Loader from '@/components/loader/Loader';
import { IScoreChartData } from '@/interfaces/chart';
import WpmChart from '@/components/chart/WpmChart';
import { Card } from '@/components/ui/card';
import VerticalDivider from '@/components/divider/VerticalDivider';

const Profile = () => {
  const { user } = useAuthContext();
  const { setScores } = useScoresContext();
  const { isLoading, setIsLoading } = useLoadingContext();

  const [chartData, setChartData] = useState<IScoreChartData[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      if (user === null) return;

      setIsLoading(true);
      try {
        const res: IGetScoresResponse = await getScores({ id: user._id });
        if (res.success) {
          setScores(res.data.scores);
        }

        const newChartData: IScoreChartData[] = res.data.scores.map(
          (score) => ({
            netWpm: score.netWpm,
            rawWpm: score.rawWpm,
            accuracy: score.accuracy,
            date: score.date,
          })
        );

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching scores:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScores();
  }, [user, setIsLoading, setScores]);

  if (isLoading) {
    return <Loader />;
  }

  if (user === null) {
    return (
      <>
        <div className='msg-title'>No user data available!</div>
      </>
    );
  }

  return (
    <div className='w-full'>
      <Card className='bg-slate-900 opacity-75 p-4 flex justify-between items-center gap-4'>
        <div className='flex justify-center items-center gap-4'>
          <img
            src={user.photo}
            alt='profile photo'
            className='w-20 h-20 rounded-full shadow-sm border'
          />
          <div className='flex flex-col justify-center items-start max-w-[20rem] line-clamp-1'>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        </div>

        <VerticalDivider />

        <div className='flex-1'>
          Lorem dignissimos! Labore! Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Iusto fuga quo itaque atque suscipit ut cupiditate
          laboriosam praesentium delectus adipisci accusamus iste voluptates,
          cumque optio quisquam est quod expedita obcaecati tempore! Ipsam
          corporis, neque excepturi beatae, culpa architecto veritatis tempore
          consequuntur similique nostrum distinctio? Aliquid dolor pariatur quod
          ex distinctio!
        </div>
      </Card>

      <div className=''>
        {chartData.length >= 2 && <WpmChart chartData={chartData} />}
      </div>
    </div>
  );
};

export default Profile;
