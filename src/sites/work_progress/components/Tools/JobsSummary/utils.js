import { config } from '../../../../../config';

export const handleGenerateRaport = async () => {
	try {
		const data = await fetch(`${config.bim_apps_api.url}/raports-generator`);
		console.log(data);
	} catch (error) {
		console.log(error);
	}
};
