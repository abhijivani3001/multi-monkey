import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { IScoreChartData } from '@/interfaces/chart';

const chartConfig = {
  netWpm: {
    label: 'Net WPM',
    color: 'hsl(var(--chart-1))',
  },
  rawWpm: {
    label: 'Raw WPM',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

interface WpmChartProps {
  chartData: IScoreChartData[];
}

const WpmChart: React.FC<WpmChartProps> = ({ chartData }) => {
  return (
    <>
      <ChartContainer className='h-[25rem] w-full mx-auto' config={chartConfig}>
        <ResponsiveContainer>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 0,
              right: 20,
            }}
          >
            <CartesianGrid vertical={false} horizontal={true} />
            <XAxis
              label={{ value: 'Tests', position: 'insideBottom' }}
              dataKey='wpm'
              tickLine={true}
              axisLine={true}
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
              content={<ChartTooltipContent indicator='line' />}
            />
            <Area
              dataKey='rawWpm'
              type='natural'
              fill='var(--color-rawWpm)'
              fillOpacity={0.4}
              stroke='var(--color-rawWpm)'
              // stackId='a'
              dot={true}
            />
            <Area
              dataKey='netWpm'
              type='natural'
              fill='var(--color-netWpm)'
              fillOpacity={0.4}
              stroke='var(--color-netWpm)'
              // stackId='a'
              dot={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );
};

export default WpmChart;
