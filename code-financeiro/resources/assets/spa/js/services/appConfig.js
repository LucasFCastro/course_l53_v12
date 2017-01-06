import config from '../config.js';

let localConfig = {
	teste: 'teste3'
};

const appConfig = Object.assign({}, config, localConfig);

export default appConfig;
