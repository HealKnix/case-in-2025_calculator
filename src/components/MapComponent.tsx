import 'leaflet/dist/leaflet.css'

import L from 'leaflet'
// Fix for marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import React from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'

import { RadarChart } from './ui/radar-chart'

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

interface Route {
	id: string
	name: string
	color: string
	points: [number, number][]
	markers: {
		position: [number, number]
		name: string
		description?: string
	}[]
}

interface MapComponentProps {
	routes: Route[]
	isWinter: boolean
}

const data = {
	summer: [
		{
			name: 'Якутск',
			value: 62,
			max: 500,
		},
		{
			name: 'Тикси',
			value: 38,
			max: 500,
		},
		{
			name: 'Экспорт',
			value: 375,
			max: 500,
		},
		{
			name: 'Соседние\nрегионы',
			value: 38,
			max: 500,
		},
	],
	winter: [
		{
			name: 'Якутск',
			value: 432,
			max: 500,
		},
		{
			name: 'Тикси',
			value: 63,
			max: 500,
		},
		{
			name: 'Экспорт',
			value: 0,
			max: 500,
		},
		{
			name: 'Соседние\nрегионы',
			value: 46,
			max: 500,
		},
	],
}

const MapComponent: React.FC<MapComponentProps> = ({ routes, isWinter }) => {
	const defaultCenter: [number, number] = [65.44016487, 120.23982217]

	return (
		<>
			<MapContainer
				center={defaultCenter}
				zoom={4}
				scrollWheelZoom={true}
				style={{ height: 'calc(80dvh - 50px)' }}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>

				{routes.map(route => (
					<React.Fragment key={route.id}>
						{route.points.length > 1 && (
							<Polyline
								positions={route.points}
								color={route.color || (isWinter ? '#3b82f6' : '#10b981')}
								weight={4}
							>
								<Popup>
									<div>
										<h3 className='font-bold'>{route.name}</h3>
										<p>
											Длина маршрута:{' '}
											{calculateRouteLength(route.points).toFixed(2)} км
										</p>
									</div>
								</Popup>
							</Polyline>
						)}

						{route.markers.map((marker, index) => (
							<Marker
								key={`${route.id}-marker-${index}`}
								position={marker.position}
							>
								<Popup>
									<div>
										<h3 className='font-bold'>{marker.name}</h3>
										{marker.description && <p>{marker.description}</p>}
									</div>
								</Popup>
							</Marker>
						))}
					</React.Fragment>
				))}
				<div
					style={{
						position: 'absolute',
						width: '100%',
						height: '17px',
						backgroundColor: 'white',
						bottom: '0',
						zIndex: 1000,
					}}
				></div>
			</MapContainer>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						width: '100px',
						height: '5px',
						backgroundColor: '#d3d3d3',
						borderRadius: '5px',
						marginTop: '45px',
					}}
				></div>
				<RadarChart
					data={data[isWinter ? 'winter' : 'summer']}
					style={{
						height: '500px',
						width: '100%',
						marginTop: '100px',
					}}
				/>
				<span
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '10px',
						color: '#11DDA8',
						fontSize: '24px',
					}}
				>
					<svg
						width='16'
						height='25'
						viewBox='0 0 16 25'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M7 23.2733C7 23.8256 7.44772 24.2733 8 24.2733C8.55228 24.2733 9 23.8256 9 23.2733H7ZM8.70711 1.12688C8.31658 0.736353 7.68342 0.736353 7.29289 1.12688L0.928932 7.49084C0.538408 7.88136 0.538408 8.51453 0.928932 8.90505C1.31946 9.29558 1.95262 9.29558 2.34315 8.90505L8 3.2482L13.6569 8.90505C14.0474 9.29558 14.6805 9.29558 15.0711 8.90505C15.4616 8.51453 15.4616 7.88136 15.0711 7.49084L8.70711 1.12688ZM9 23.2733V1.83398H7V23.2733H9Z'
							fill='#11DDA8'
						/>
					</svg>
					513 млн. руб/мес
				</span>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '100%',
						maxWidth: '500px',
						marginBottom: '25px',
						padding: '25px',
					}}
				>
					{data[isWinter ? 'winter' : 'summer'].map(item => (
						<p
							style={{
								display: 'flex',
								width: '100%',
								justifyContent: 'space-between',
								color: '#878787',
								borderBottom: '1px solid #CBCBCB',
								padding: '10px',
							}}
						>
							<span>{item.name}</span>
							<span>
								{Math.max(
									...data[isWinter ? 'winter' : 'summer'].map(
										item => item.value
									)
								) === item.value ? (
									<span style={{ color: '#11DDA8' }}>{item.value}</span>
								) : item.value === 0 ? (
									<span style={{ color: '#D68514' }}>{item.value}</span>
								) : (
									item.value
								)}
								&nbsp;млн. руб
							</span>
						</p>
					))}
				</div>
			</div>
		</>
	)
}

// Helper function to calculate route length in kilometers
function calculateRouteLength(points: [number, number][]): number {
	let totalDistance = 0

	for (let i = 0; i < points.length - 1; i++) {
		const p1 = L.latLng(points[i][0], points[i][1])
		const p2 = L.latLng(points[i + 1][0], points[i + 1][1])
		totalDistance += p1.distanceTo(p2)
	}

	// Convert from meters to kilometers
	return totalDistance / 1000
}

export default MapComponent
