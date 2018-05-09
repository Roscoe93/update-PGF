const qs = require("querystring");

function decode(data) {
	let conf = decodeBase64(data).split("\n");
	conf.pop();
	conf.shift();
	return conf.map(ssrProtocol => {
		let str = decodeBase64(ssrProtocol.replace(/ssr:\/\//, ""));
		let [start, end] = str.split("/?");

		//处理前半段
		let [server, server_port, , method, obfs, base64Pass] = start.split(":");
		let password = decodeBase64(base64Pass);

		//处理后半段
		let { group, remarks } = qs.parse(end);
		remarks = decodeBase64(remarks);
		group = decodeBase64(group);

		return {
			server,
			server_port,
			method,
			obfs,
			password,
			group,
			remarks
		};
	});
}

function decodeBase64(base64Str) {
	return Buffer.from(base64Str, "base64").toString("utf8");
}

module.exports = decode;
