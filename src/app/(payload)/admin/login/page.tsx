'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter()
  useEffect(() => {
    router.push('/auth/login')
  })
  return null
}

export default LoginPage
