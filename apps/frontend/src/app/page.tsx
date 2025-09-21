import { User, usersSchema } from '@/types/user'
import { WeatherForecast, weatherResponseSchema } from '@/types/weather'

async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch('http://localhost:3001/users', {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return usersSchema.parse(data)
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return []
  }
}

async function getWeather(): Promise<WeatherForecast[]> {
  try {
    const response = await fetch('http://localhost:3000/api/weather', {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return weatherResponseSchema.parse(data)
  } catch (error) {
    console.error('Failed to fetch weather:', error)
    return []
  }
}

export default async function Home() {
  const users = await getUsers()
  const weather = await getWeather()

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Pet Insurance Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="w-full" aria-labelledby="users-heading">
            <h2 id="users-heading" className="text-2xl font-bold mb-6 text-center">Users</h2>
            {users.length > 0 ? (
              <ul className="space-y-3" role="list" aria-label="List of users">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    role="listitem"
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {user.username}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 mt-8" role="status" aria-live="polite">
                No users found
              </div>
            )}
          </section>

          <section className="w-full" aria-labelledby="weather-heading">
            <h2 id="weather-heading" className="text-2xl font-bold mb-6 text-center">Weather Forecast</h2>
            {weather.length > 0 ? (
              <ul className="space-y-3" role="list" aria-label="Weather forecast">
                {weather.map((forecast, index) => (
                  <li
                    key={index}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                    role="listitem"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {new Date(forecast.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {forecast.summary}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          {forecast.temperatureC}°C
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {forecast.temperatureF}°F
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 mt-8" role="status" aria-live="polite">
                No weather data available
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}