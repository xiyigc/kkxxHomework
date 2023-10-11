'use strict';

const {
	appId,
	appSecret,
	getToken,
	verifyToken
} = require('wx_module');

const db = uniCloud.database();

exports.main = async (event, context) => {
	const {
		action
	} = event;
	let res_Data = {
		status: 200
	};
	if (action === "notoken") {
		//GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
		const res = await uniCloud.httpclient.request(
			"https://api.weixin.qq.com/sns/jscode2session?appid=" + appId + "&secret=" + appSecret +
			"&js_code=" + event.code + "&grant_type=authorization_code", {
				dataType: "json"
			}
		)

		const openid = res.data.openid;

		let dbRes = await db.collection("users").where({
			open_id: openid
		}).get();

		let token = getToken(openid);
		res_Data["token"] = token;

		if (dbRes.affectedDocs <= 0) {
			res_Data.userData = {
				nick_name: "微信用户_" + Math.random().toString(20).substring(4).toUpperCase(),
				avatar_url: `https://mp-3e82514e-b5f6-4c2f-8325-1d741d3c83ac.cdn.bspapp.com/avatar/${Math.floor(Math.random() * 10)}.png`,
				integral: 1000,
				gaming: false,
				updated: false,
			};

			const _id = await db.collection("users").add({
				open_id: openid,
				...res_Data.userData
			});
			res_Data.userData._id = _id;
		} else {
			res_Data.userData = dbRes.data[0];
		}
	} else if (action === "withtoken") {
		try {
			const {
				openid
			} = verifyToken(event.token);

			let dbRes = await db.collection("users").where({
				open_id: openid
			}).get();

			res_Data.userData = dbRes.data[0];

		} catch (e) {
			res_Data.status = 500;
		}
	} else if (action == 'verify') {
		try {
			verifyToken(event.token);
		} catch (e) {
			res_Data.status = 500;
		}
		return {
			code: res_Data.status
		}
	}
	try {
		delete res_Data.userData["open_id"];
	} catch (e) {
		res_Data.status = 500;
	}

	return res_Data;
}