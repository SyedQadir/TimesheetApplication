class recordModel {

	constructor(record) {
	    this.record = record;
	}

	get(key){
		return this.record[key];
	}

	getAll(){
		return this.record;
	}

}
exports.recordModel = recordModel;
