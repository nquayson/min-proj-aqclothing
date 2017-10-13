jQuery(document).ready(function($){

	// hide messages 
	$("#error").hide();
	$("#sent-form-msg").hide();
	
	// on submit...
	$("#contactForm #submit").click(function() {
		$("#error").hide();
		
		//required:
		
		//name
		var name = $("input#name").val();
		if(name == ""){
			$("#error").fadeIn().text("Name required.");
			$("input#name").focus();
			return false;
		}
		
		//quantity
		var quantity = $("input#quantity").val();
		var isANumber = /^\d+$/.test(quantity);
		
		if(!isANumber){
			$("#error").fadeIn().text("The quantity of shirts is required.");
			$("input#quantity").focus();
			return false;
		}
		
		// telephone
		var telephone = $("input#telephone").val();
		if(telephone == ""){
			$("#error").fadeIn().text("Telephone no. is required");
			$("input#telephone").focus();
			return false;
		}
		
		// email
		var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
		var email = $("input#email").val();
		if(!testEmail.test(email)){
			$("#error").fadeIn().text("Please input your email in this format: nana@example.com");
			$("input#email").focus();
			return false;
		}
		
		//additional
		var additional = $("input#additional").val();
		
	
		
		// send mail php
		var sendMailUrl = $("#sendMailUrl").val();
		
		//to, from & subject
		var to = $("#to").val();
		var from = $("#from").val();
		var subject = $("#subject").val();
		
		// data string
		var dataString = 'name='+ name
						+ '&email=' + email        
						+ '&telephone=' + telephone
						+ '&quantity=' + quantity
						+ '&additional=' + additional
						+ '&to=' + to
						+ '&from=' + from
						+ '&subject=' + subject;						         
		// ajax
		$.ajax({
			type:"POST",
			url: sendMailUrl,
			data: dataString,
			success: success()
		});
	});  
		
		
	// on success...
	 function success(){
	 	$("#sent-form-msg").fadeIn();
	 	$("#contactForm").fadeOut();
	 }
	
    return false;
});

