class recordModel {

	constructor(record) {
	    this.record = record;
	}

	get(key){
		return this.record[key];
	}

}
exports.recordModel = recordModel;
