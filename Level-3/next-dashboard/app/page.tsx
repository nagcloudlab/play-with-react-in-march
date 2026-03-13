

// export default function HomePage() {
//   return (
//     <div className="container mt-5">
//       <h1>Developer Dashboard</h1>
//       <p>Welcome to the Next.js training dashboard.</p>
//     </div>
//   )
// }

import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/dashboard')
}
