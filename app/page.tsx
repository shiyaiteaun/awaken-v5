import { redirect } from 'next/navigation'

export default function Home() {
  redirect('/en') // Change "en" to your default locale
}
