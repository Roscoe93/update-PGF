const fs = require("fs");
module.exports = (file, serverList) => {
	let conf = JSON.parse(fs.readFileSync(file).toString());
	conf.configs = serverList;
	fs.writeFileSync(file, JSON.stringify(conf));
};
