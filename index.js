const { subUrl, confJson } = require("yargs").argv;
const axios = require("axios");
const decode = require("./decode");
const override = require("./override");

if (!subUrl || !confJson) {
	console.log(`missing subUrl|configPath`);
	process.exit(-1);
}

(async () => {
	console.log(`fetching...`);
	let { data } = await axios.default.get(subUrl, {
		timeout: 10000
	});
	console.log(`writing to ${confJson}`);
	override(confJson, decode(data));
	console.log(`finished!`);
})();
