var timesheet = {

	registerEvents: function(){
		var self = this;
		self.renderCalendar();
		self.initializeDate();
		self.LogHours();
		self.changeSelectedDate();
		self.getTodaysHours();
	},

	getTodaysHours: function(){
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var date = new Date();

		var currentDate = (date.getDate() + ", "+ monthNames[date.getMonth()] +" "+ date.getFullYear());
		this.loadAddedHours(currentDate);
	},

	changeSelectedDate: function(){
		var self = this;
		jQuery(document).on('click', '.a-date', function(e){
			var target = e.currentTarget;
			var day = jQuery(target).find('span').html();
			var yearMonth = jQuery('#monthYear').html();
			var date = day+', '+ yearMonth;
			jQuery('.dateSelected').html(date);
			self.loadAddedHours(null);
		});
	},

	initializeDate: function(){
		var self = this;
		var day = jQuery('#calTbody .current span').html()
		var yearMonth = jQuery('#monthYear').html();
		var date = day+', '+ yearMonth
		jQuery('.dateSelected').html(date);
	},

	LogHours: function(){
		var self = this;
		jQuery(document).on('click', '.addHours', function(e){
			e.preventDefault();
			var data = {
				'project_id': jQuery('#projectName option:selected').val(),
				'task_id': jQuery('#task option:selected').val(),
				'hours': jQuery('#hours').val(),
				'logging_date': jQuery('.dateSelected').html(),
				'task_description': jQuery('#task_description').val(),
				'userid': 1
			}

			$.ajax({
				type: 'POST',
				data: JSON.stringify(data),
		        contentType: 'application/json',
		        url: '/hours',
		        success: function(data) {
		            self.loadAddedHours(null);
		        }
		    });
		});
	},

	loadAddedHours: function(fordate){
		if(!fordate)
			var fordate = jQuery('.dateSelected').html();

		$.ajax({
			type: 'GET',
			data: {
				'date': fordate
			},
	        contentType: 'application/json',
	        url: '/hours',						
	        success: function(data) {
	            jQuery('.loggedhoursContainer').html(data);
	        }
	    });
	},
	renderCalendar: function(){
		jQuery("#calendar").MEC({});
	}

}


jQuery(document).ready(function(){
	timesheet.registerEvents();
});