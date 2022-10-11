import React from 'react'
import { Doughnut } from 'react-chartjs-2';
const data =[
    {
      label: 'Series 1',
      data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
    },
    {
      label: 'Series 2',
      data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
    }
  ]

function Chart() {
  return (
    <div>
        <Doughnut data={data} />
    </div>
  )
}

export default Chart;