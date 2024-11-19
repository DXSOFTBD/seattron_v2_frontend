import Chart from '../../ui/chart';

const DonutChart = ({ series, labels, colors }: any) => {
  const options = {
    options: {
      colors: colors,
      labels: labels,
      plotOptions: {
        pie: {
          size: 300,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return Number(val).toFixed(0) + '%';
        },
      },
      legend: {
        show: false,
      },

      value: {
        show: true,
        fontSize: '16px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 400,
        color: undefined,
        offsetY: 16,
        formatter: function (val: any) {
          return val;
        },
      },
      chart: {
        type: 'pie',
      },

      pie: {
        pie: {
          size: '300',
        },
      },
    },
    plotOptions: {
      pie: {
        states: {
          hover: {
            colors: ['rgba(62, 240, 30, 0.4)', 'rgba(249, 35, 32, 0.4)'],
          },
        },
      },
    },
    series: series,
  };

  return (
    <div className='w-full max-h-[300px] h-[300px] flex items-center justify-center'>
      <Chart
        options={options.options}
        series={options.series}
        width='100%'
        height='100%'
        type='pie'
      />
    </div>
  );
};

export default DonutChart;
