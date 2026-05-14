import * as React from 'react'
import { Row, Typography } from 'antd'
import { Column } from '@ant-design/plots';


export const DashboardPage = () => {

  const {Text} = Typography;

  const YearChart = () => {

    const chartConfig = {
      data: {
       value: [{
              month: 'Январь',
              sum: 100,
              category: 'Категория 1'
            },
            {
              month: 'Январь',
              sum: 200,
              category: 'Категория 2'
            },
            {
              month: 'Февраль',
              sum: 300,
              category: 'Категория 1'
            },
            {
              month: 'Февраль',
              sum: 250,
              category: 'Категория 2'
            }
      ],
      
      },
      xField: 'month',
      yField: 'sum',
      colorField: 'category',
      group: {padding: 0},
    }



    return  (<Column {...chartConfig}/>)
  }

  return (
    <>
        <YearChart />
      <Row>
        <Text style={{
          color: '#13c2c2'
        }}>
          График по году
        </Text>
      </Row>
      <Row>
        <Text style={{
          color: '#13c2c2'
        }}>
          График miscellaneous
        </Text>
      </Row>
    
    </>
  )

}
