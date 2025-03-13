import React, { useState, useEffect } from 'react'
import MapComponent from './components/MapComponent'
import { Switch } from './components/ui/switch'
import { Label } from './components/ui/label'
import summerRoutes from './data/summer-routes.json'
import winterRoutes from './data/winter-routes.json'
import './index.css'

function App() {
	const [isWinter, setIsWinter] = useState(false)
	const [routes, setRoutes] = useState(summerRoutes)

	useEffect(() => {
		// Update routes based on selected season
		setRoutes(isWinter ? winterRoutes : summerRoutes)
	}, [isWinter])

	return (
		<div className='min-h-screen p-4 flex flex-col'>
			<header className='mb-4'>
				<h1 className='text-2xl font-bold mb-4'>Интерактивная карта</h1>
				<div className='flex items-center space-x-2'>
					<Switch
						id='season-mode'
						checked={isWinter}
						onCheckedChange={setIsWinter}
					/>
					<Label htmlFor='season-mode'>
						{isWinter ? 'Зимний режим' : 'Летний режим'}
					</Label>
				</div>
			</header>
			<main className='flex-1 border rounded-lg overflow-hidden'>
				<MapComponent routes={routes} isWinter={isWinter} />
			</main>
			<footer className='mt-4 text-sm text-gray-500'>
				© {new Date().getFullYear()} Oilfans simulator
			</footer>
		</div>
	)
}

export default App
