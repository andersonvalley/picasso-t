import axios, { AxiosResponse } from 'axios'
import { useState } from 'react'
import { notify } from '../utils/notification'

export const useFetching = <T = [] | null,>() => {
  const [data, setData] = useState<T>()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetching = async (callback: () => Promise<AxiosResponse>, successMessage?: string) => {
    setIsLoading(true)
    try {
      const response = await callback()

      if (response.status !== 200) {
        throw new Error()
      }

      setData(response.data)

      if (successMessage) notify(successMessage)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.message)
        notify(error?.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { fetching, data, error, isLoading, setData }
}
