import { Chart as ChartJS,ArcElement,PointElement,LineElement,Filler, CategoryScale,LinearScale,BarElement,ChartOptions,Title,Tooltip,Legend,ChartData} from "chart.js";
import {Bar,Doughnut,Pie,Line} from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
    Filler,
)

interface BarChartProps{
    horizontal?:boolean,
    data_1:number[],
    data_2:number[],
    title_1:string,
    title_2:string,
    bgColor_1:string,
    bgColor_2:string,
    labels?:string[],

};
export const month=['January','Febuary','March','April','May','June','July'];

//chart 1 Bar Chart
export const BarChart=({horizontal,data_1=[],data_2=[],title_1,title_2,bgColor_1,bgColor_2,labels=month}:BarChartProps)=>{
 
const options:ChartOptions<"bar">={
    responsive:true,
    indexAxis:horizontal?"y":"x",
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
            text:"Chart.js Bar Chart",
        },
    },
    scales:{
        y:{
            beginAtZero:true,
            grid:{
                display:false,
            }

        },
        x:{
            grid:{
                display:false,
            }
        }
    },
   
} 
const data:ChartData<"bar",number[],string> = {
  labels,
  datasets: [
    {
      label: title_1,
      data:data_1,
      backgroundColor:bgColor_1,
      barThickness:"flex",
      barPercentage:1,
      categoryPercentage:0.4
    },
    {
      label:title_2,
      data: data_2,
      backgroundColor: bgColor_2,
      barThickness:"flex",
      barPercentage:1,
      categoryPercentage:0.4,
    },
  ],
};

    return <Bar options={options} width={horizontal?"200%":""} data={data} />
};
//chart 2 Doughnut Chart
interface doughnutChartProps{
    labels:string[],
    data:number[],
    backgroundColor:string[],
    cutout?:number | string,
    legends?:boolean,
    offset?:number[],

};
export const DoughnutChart=({labels,data,backgroundColor,cutout,legends=true,offset}:doughnutChartProps )=>{
    const doughnutData:ChartData<"doughnut",number[],string>={
        labels,
        datasets:[{
            data,backgroundColor,borderWidth:0,offset
        }],
    }
    const doughnutOption:ChartOptions<"doughnut">={
        responsive:true,
        plugins:{
            legend:{
                display:legends,
                position:"bottom",
                labels:{
                    padding:40,
                },
            },
        },
        cutout

    }
    return <Doughnut data={doughnutData} options={doughnutOption} />
}

// chart 3 Pie Chart

interface pieChartProps{
    labels:string[],
    data:number[],
    backgroundColor:string[],
    offset:number[],
};
export const PieChart=({labels,data,backgroundColor,offset}:pieChartProps)=>{
    const PieData:ChartData<"pie",number[],string>={
        labels,
        datasets:[
            {
                data,backgroundColor,borderWidth:1,offset,
            }
        ],
    };
    const PieOption:ChartOptions<"pie">={
        responsive:true,
        plugins:{
            legend:{
                display:false,
            },
        },
    };
    return <Pie data={PieData} options={PieOption} />

}



//chart 3 line chart

interface LineChartProps{
    data:number[],
    label:string,
    backgroundColor:string,
    borderColor:string,
    labels?:string[],
};
export const LineChart=({data,label,labels=month,backgroundColor,borderColor}:LineChartProps)=>{
    const LineOptions:ChartOptions<"line">={
        responsive:true,
        plugins:{
            legend:{
                display:false,
            },
            title:{
                display:false,
            },
        },
        scales:{
            y:{
                beginAtZero:true,
                grid:{
                    display:false,
                },
            },
            x:{
                grid:{
                    display:false,
                },
            },
        },
    };
    const LineData:ChartData<"line",number[],string>={
        labels,
        datasets:[
            {
                label,
                data,
                backgroundColor,
                borderColor,
                fill:true,
            }
        ]
    }


    return(
        <Line data={LineData} options={LineOptions} />
    )

}