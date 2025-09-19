import { User, usersSchema } from '@/types/user'

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

export default async function Home() {
  const users = await getUsers()

  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Pet Insurance Users</h1>

        <section className="w-full max-w-md mx-auto" aria-labelledby="users-heading">
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
      </main>
    </div>
  )
}