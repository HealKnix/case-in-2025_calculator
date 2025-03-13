import EChartsReact from 'echarts-for-react'
import React from 'react'

export const RadarChart = (props) => {
	const options: echarts.EChartsOption = {
		legend: {
			data: ['Прибыль за год'],
		},
		color: ['#11DDA8', '#11DDA8'],
		radar: {
			shape: 'circle',
			indicator: props.data.map((data) => ({
				name: data.name,
				max: data.max,
			})),
		},
		series: [
			{
				name: 'Budget vs spending',
				type: 'radar',
				data: [
					{
						value: props.data.map((data) => data.value),
						name: 'Прибыль за год',
					},
				],
			},
		],
	}

	return <EChartsReact option={options} {...props} />
}
