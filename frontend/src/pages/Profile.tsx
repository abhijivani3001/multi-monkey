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
import { formatDate } from '@/utils/formatDate';

const Profile = () => {
  const { user } = useAuthContext();
  const { setScores } = useScoresContext();
  const { isLoading, setIsLoading } = useLoadingContext();

  const [chartData, setChartData] = useState<IScoreChartData[]>([]);
  const [avgRawWpm, setAvgRawWpm] = useState<number>(0);
  const [avgNetWpm, setAvgNetWpm] = useState<number>(0);

  useEffect(() => {
    const fetchScores = async () => {
      if (user === null) return;

      setIsLoading(true);
      try {
        const res: IGetScoresResponse = await getScores({ id: user._id });
        if (res.success) {
          setScores(res.data.scores);
        }

        let totalRawWpm = 0,
          totalNetWpm = 0;

        const newChartData: IScoreChartData[] = res.data.scores.map((score) => {
          totalRawWpm += score.rawWpm;
          totalNetWpm += score.netWpm;

          return {
            netWpm: score.netWpm,
            rawWpm: score.rawWpm,
            accuracy: score.accuracy,
            date: score.date,
          };
        });

        setChartData(newChartData);
        if (newChartData.length !== 0) {
          setAvgRawWpm(Number((totalRawWpm / newChartData.length).toFixed(2)));
          setAvgNetWpm(Number((totalNetWpm / newChartData.length).toFixed(2)));
        }
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
    <div className='w-full space-y-6'>
      <Card className='bg-slate-900 mt-4 bg-opacity-80 p-4 flex justify-between items-stretch gap-6'>
        <div className='flex justify-center items-center gap-4'>
          <img
            src={user.photo}
            alt='profile photo'
            className='w-20 h-20 rounded-full shadow-sm border'
          />

          <div className='flex flex-col gap-1 justify-center items-start max-w-[20rem] line-clamp-1'>
            <div className='text-2xl font-bold'>{user.name}</div>
            <div className='text-xs font-light text-slate-400'>
              Joined {formatDate(user.createdAt)}
            </div>
          </div>
        </div>

        <VerticalDivider />

        <div className='flex-1'>
          <div className='flex justify-evenly items-center h-full'>
            <div className='flex flex-col justify-center w-full items-start'>
              <div className='text-3xl font-semibold'>{chartData.length}</div>
              <div className='text-xs font-light text-slate-400'>
                tests completed
              </div>
            </div>

            <div className='flex flex-col justify-center items-start w-full'>
              <div className='text-3xl font-semibold'>{avgNetWpm}</div>
              <div className='text-xs font-light text-slate-400'>net wpm</div>
            </div>

            <div className='flex flex-col justify-center items-start w-full'>
              <div className='text-3xl font-semibold'>{avgRawWpm}</div>
              <div className='text-xs font-light text-slate-400'>raw wpm</div>
            </div>
          </div>
        </div>
      </Card>

      <div className=''>
        {chartData.length >= 2 && <WpmChart chartData={chartData} />}
      </div>
    </div>
  );
};

export default Profile;
