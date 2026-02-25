import { useCallback, useState } from 'react'
import axiosInstance from '@/utils/AxiosInterceptor'
import { useToast } from './useToast'
import { useTranslation } from './useTranslation'
import { useParams } from 'next/navigation'
import { getFileName } from '@/utils/helpers'

const useDbBackup = () => {
	const [isLoading, setIsLoading] = useState(false)
	const { toastInfo } = useToast()
	const params = useParams()
	const { t } = useTranslation(params?.lng ?? 'en', 'common')

	/** Backup the database on the server and manage loading state */
	const saveDb = useCallback(() => {
		setIsLoading(true)
		axiosInstance
			.get('/functions/backup-db', {
				responseType: 'blob'
			})
			.then(response => {
				const data = response.data
				const contentType = response.headers.getContentType()
				if (contentType.includes('application/json')) {
					if (data && data.code && data.file && data.size)
						toastInfo(`${t(data.code)} (${data.file} ${data.size})`)
				} else {
					try {
						const blob = new Blob([data], { type: contentType })
						const url = window.URL.createObjectURL(blob)
						const link = document.createElement('a')
						link.href = url
						link.download = getFileName()
						document.body.appendChild(link)
						link.click()
						link.remove()
					} catch (e) {
						console.log(e.message())
					}
				}
			})
			.catch(() => {})
			.finally(() => setIsLoading(false))
	}, [t, toastInfo])

	// @todo: to be created in backend
	const restoreDb = useCallback(() => {
		setIsLoading(true)
		axiosInstance
			.get('/functions/restore-db')
			.catch(() => {})
			.finally(() => setIsLoading(false))
	}, [])

	return {
		isLoading,
		setIsLoading,
		saveDb
	}
}

export default useDbBackup
