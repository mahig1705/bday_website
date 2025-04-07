'use client'

import dynamic from 'next/dynamic'

// Dynamically import the JourneyPage with SSR disabled
const JourneyPage = dynamic(() => import('@/components/JourneyPage'), {
  ssr: false,
})

// This is the only export required
export default function Page() {
  return <JourneyPage />
}
