import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

export const useFetching = <T = [],>(callback: () => Promise<AxiosResponse<T[]>>) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetching = async () => {
    setIsLoading(true)
    try {
      const response = await callback()

      if (response.status !== 200) {
        throw new Error()
      }

      setData(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error?.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { fetching, data, error, isLoading, setData }
}
