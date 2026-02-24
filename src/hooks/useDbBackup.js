import { useCallback, useState } from 'react'
import axiosInstance from '@/utils/AxiosInterceptor'

const useDbBackup = () => {
    const [isLoading, setIsLoading] = useState(false)

    /** Backup the database on the server and manage loading state */
    const saveDb = useCallback(() => {
        setIsLoading(true)
        axiosInstance
            .get("/backup-db")
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    // @todo: to be created in backend
    const restoreDb = useCallback(() => {
        setIsLoading(true)
        axiosInstance
            .get('/restore-db')
            .catch(() => { })
            .finally(() => setIsLoading(false))
    }, [])

    return {
        isLoading,
        setIsLoading,
        saveDb
    }
}

export default useDbBackup
