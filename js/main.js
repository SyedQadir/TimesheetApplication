
jQuery(document).ready(function(){

	// $('#myForm').submit(function(e) {
	// 	e.preventDefault(); 
	// 	$(this).ajaxSubmit({
 //            error: function(xhr) {
 //        		status('Error: ' + xhr.status);
 //            },

 //            success: function(response) {
 //        		$("#status").empty().text(response);
 //                console.log(response);
 //            }
 //    	});
	// });

	var detailsPresent=jQuery('.projectDetails').data('project');
	var userid = 1;
	// TODO: change the way we check below. Request should't go for all the pages except home. 
	// as below code checks for the active projects of the user. 
	if(!detailsPresent){
		
		$.ajax({
	      url: '/users/:1',//+userid,
	      type: 'GET',
	      data: {'id': userid},
	      success: function(data){
	          // console.log('upload successful!\n' + data);
	      }
	    }).then(function(result){
	    	jQuery('.projectContainer').html(result);
	    });
	}

	

	jQuery(document).on('click', '.submit', function(e){
		e.preventDefault();
		var data = new FormData();
		var files = jQuery('#file').get(0).files;
		if (files.length > 0){
			var formData = new FormData();
			for (var i = 0; i < files.length; i++) {
		      var file = files[i];

		      // add the files to formData object for the data payload
		      formData.append('uploads[]', file, file.name);
		    }
		}
		// jQuery.each(jQuery('#file')[0].files, function(i, file) {
		//     data.append('uploads[]', file, file.name);
		// });
		var form = jQuery("#myForm");


	 	$.ajax({
	      url: '/syed',
	      type: 'POST',
	      data: formData,
	      processData: false,
	      contentType: false,
	      success: function(data){
	          console.log('upload successful!\n' + data);
	      },
	      xhr: function() {
	        // create an XMLHttpRequest
	        var xhr = new XMLHttpRequest();

	        // listen to the 'progress' event
	        xhr.upload.addEventListener('progress', function(evt) {

	          if (evt.lengthComputable) {
	            // calculate the percentage of upload completed
	            var percentComplete = evt.loaded / evt.total;
	            percentComplete = parseInt(percentComplete * 100);
	            console.log(percentComplete); 
	            // update the Bootstrap progress bar with the new percentage
	            // $('.progress-bar').text(percentComplete + '%');
	            // $('.progress-bar').width(percentComplete + '%');

	            // once the upload reaches 100%, set the progress bar text to done
	            if (percentComplete === 100) {
	              // $('.progress-bar').html('Done');
	            }

	          }

	        }, false);

	        return xhr;
	      }
	    });




		// $.ajax({
		//   	url: "/syed",
		//   	method: 'POST',
 	// 		type: 'POST',
 	// 		processData: false,
  //     		contentType: false,
		//   	data: formData
		// }).done(function(data) {
		//  	alert('Request sent and data is ');
		//  	console.log(data); 
		// });
	});

	jQuery('.list-group a').on('click', function(e){
		e.preventDefault();
		var targetElement = $(e.currentTarget).attr('href');
		console.log(targetElement);
		jQuery.ajax({
			url: targetElement,
			method: "GET",
		}).done(function(data){
			jQuery('.postDetails').html(data);
		});
	});
	
});