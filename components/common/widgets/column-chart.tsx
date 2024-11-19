import Chart from '../../ui/chart';

const BarChart = ({ series, colors, categories, title }: any) => {
  const options = {
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        stacked: false,
        stackType: '100%',
      },

      plotOptions: {
        bar: {
          columnWidth: '65%',
          endingShape: 'flat',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: false,
        width: 2,
      },
      grid: {
        borderColor: '#F7F7F7',
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      colors: colors,
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        categories: categories,
      },
      yaxis: {
        show: true,
        labels: {
          show: true,
          style: {
            color: '#161F6A',
            fontSize: '14px',
            fontFamily: "'Lato', sans-serif",
          },
        },
      },
    },
    series: [
      {
        name: title,
        data: series,
      },
    ],
  };

  return (
    <div className='bg-light  rounded w-full h-full border-2 border-gray-200 shadow-md'>
      <div
        className='grid grid-cols-1 w-full h-full'
        style={{ display: 'block' }}
      >
        <Chart
          options={options.options}
          series={options.series}
          height='350'
          width='100%'
          type='bar'
        />
      </div>
    </div>
  );
};

export default BarChart;
