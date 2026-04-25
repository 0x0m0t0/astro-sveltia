declare global {
	namespace App {
		interface Platform {
			env: {
				RESEND_API_KEY: string
				SENDER_EMAIL: string
				RECIPIENT_EMAIL: string
			}
			context: ExecutionContext
			caches: CacheStorage & { default: Cache }
		}
	}
}

export {}
