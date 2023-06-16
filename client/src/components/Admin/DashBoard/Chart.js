import {Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend,
  } from 'chart.js';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    ArcElement,
    Legend
  );




  export const DoughnutChart = ({ users = [] }) => {
    const data = {
      labels: ['Subscribed', 'Not Subscribed'],
      datasets: [
        {
          label: 'Views',
          data: users,
          borderColor: ['rgb(62,12,171)', 'rgb(214,43,129)'],
          backgroundColor: ['rgba(62,12,171,0.3)', 'rgba(214,43,129,0.3)'],
          borderWidth: 1,
        },
      ],
    };
  
    return <Doughnut data={data} />;
  };



  /*function getLastYearMonths() {
    const labels = [];
  
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  
    const currentMonth = new Date().getMonth();
  
    const remain = 11 - currentMonth;
  
    for (let i = currentMonth; i < months.length; i--) {
      const element = months[i];
      labels.unshift(element);
      if (i === 0) break;
    }
  
    for (let i = 11; i > remain; i--) {
      if (i === currentMonth) break;
      const element = months[i];
      labels.unshift(element);
    }
  
    return labels;
  }*/


