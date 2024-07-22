import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useAuthContext } from '@/context/Auth/AuthContext';
const chartData = [
  { desktop: 1833, mobile: 80 },
  { desktop: 305, mobile: 200 },
  { desktop: 237, mobile: 120 },
  { desktop: 73, mobile: 190 },
  { desktop: 209, mobile: 130 },
  { desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

const Profile = () => {
  const { user } = useAuthContext();

  if (user === null) {
    return (
      <>
        <div className='msg-title'>No user data available!</div>
      </>
    );
  }

  return (
    <>
      <div>{user.name}</div>

      <div className='max-w-screen-md mx-auto'>
        <Card>
          <CardHeader>
            <CardTitle>Area Chart - Axes</CardTitle>
            <CardDescription>
              Showing total visitors for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                  margin={{
                  left: 0,
                  right: 20,
                }}
                height={300}
                width={80}
              >
                <CartesianGrid vertical={false} horizontal={true} />
                <XAxis
                  label={{ value: 'Tests', position: 'insideBottom' }}
                  dataKey='wpm'
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickCount={40}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={7}
                  tickCount={10}
                  label={{
                    value: 'WPM',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Area
                  dataKey='mobile'
                  type='natural'
                  fill='var(--color-mobile)'
                  fillOpacity={0.4}
                  stroke='var(--color-mobile)'
                  stackId='a'
                  dot={true}
                />
                <Area
                  dataKey='desktop'
                  type='natural'
                  fill='var(--color-desktop)'
                  fillOpacity={0.4}
                  stroke='var(--color-desktop)'
                  stackId='a'
                  dot={true}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className='flex w-full items-start gap-2 text-sm'>
              <div className='grid gap-2'>
                <div className='flex items-center gap-2 font-medium leading-none'>
                  Trending up by 5.2% this month{' '}
                  <TrendingUp className='h-4 w-4' />
                </div>
                <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Profile;
