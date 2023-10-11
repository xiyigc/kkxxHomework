'use strict';

const {
	verifyToken
} = require('wx_module');

const db = uniCloud.database();

exports.main = async (event, context) => {

	const {
		action
	} = event;

	if (action == 'delete_pic') {
		try {
			const open_id = verifyToken(event.token).openid;

			let dbRes = await db.collection("users").where({
				open_id
			}).get();
			if (dbRes.affectedDocs <= 0) throw Error

			let result = await uniCloud.deleteFile({
				fileList: event.fileID
			});

		} catch (e) {}

	}
}