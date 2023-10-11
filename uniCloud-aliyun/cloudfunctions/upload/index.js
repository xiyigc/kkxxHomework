'use strict';

const {
	verifyToken
} = require('wx_module');

const db = uniCloud.database();

exports.main = async (event, context) => {
	const {
		action
	} = event;

	let status = 200;

	try {
		const open_id = verifyToken(event.token).openid;

		if (action == "verify_token") {

			let dbRes = await db.collection("users").where({
				open_id
			}).get();
			if (dbRes.affectedDocs <= 0) status = 404;

		} else if (action == "userinfo") {
			const transaction = await db.startTransaction(),
				updateData = {
					avatar_url: event.avatar_url,
					nick_name: event.nick_name,
					updated: true
				};
			if (!event.avatar_url) delete updateData['avatar_url']
			const {
				doc,
				updated
			} = await transaction.collection('users').where({
				open_id
			}).updateAndReturn(updateData);
			if (updated != 1) {
				await transaction.rollback(-100);
				throw new Error();
			}
			delete doc["open_id"];
			return {
				userData: doc,
				status
			}
		}
	} catch (e) {
		status = 500;
	}

	return {
		status
	}

};