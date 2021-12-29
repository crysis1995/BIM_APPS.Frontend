export type ILoggerService = {
	log: (message: any) => void;
	error: (message: any) => void;
};

class LoggerService implements ILoggerService {
	log(message: any) {
		if (Array.isArray(message)) {
			console.log(message.join('\n'));
		} else {
			console.log(message);
		}
	}

	error(message: any) {
		if (Array.isArray(message)) {
			console.error(message.join('\n'));
		} else {
			console.error(message);
		}
	}
}

export default new LoggerService();
