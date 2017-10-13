jQuery(document).ready(function($){

	// hide messages 
	$("#error").hide();
	$("#sent-form-msg").hide();
	
	function isGibberish(s)
		{
		 var v=1, c=1, ratio, len, gibberish=false;
		  
		 if(typeof s != 'undefined' && s.length)
		 {
		  len=s.length;
		  
		  for(var i=0; i<len; i++) 
		   if(/[aeiou]/i.test(s.charAt(i)))
			v++;
		   else
			if(/[bcdfghjklmnpqrstvwxyz]/i.test(s.charAt(i)))
			 c++; 

		  ratio=v/(c+v);
		 
		  if(ratio < 0.2 || ratio >0.6)
		   gibberish=true;
		 }
		 //alert(ratio); alert (gibberish);
		 return gibberish;
		}
	
	
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
		
		// email
		var testEmail = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
		var email = $("input#email").val();
		if(!testEmail.test(email)){
			$("#error").fadeIn().text("Please input your email in this format: nana@example.com");
			$("input#email").focus();
			return false;
		}
		
		// web
		var web = $("input#web").val();
		
		// telephone
		var telephone = $("input#telephone").val();
		if(telephone == ""){
			$("#error").fadeIn().text("Telephone no. is required");
			$("input#telephone").focus();
			return false;
		}
		
		// comments
		var comments = $("#comments").val();
		
		if(isGibberish(comments) || comments==""){
			$("#error").fadeIn().text("Please enter some valid comments");
			$("#comments").focus();
			return false;
		}
		
		// send mail php
		var sendMailUrl = $("#sendMailUrl").val();
		
		//to, from & subject
		var to = $("#to").val();
		var from = $("#from").val();
		var subject = $("#subject").val();
		
		// data string
		var dataString = 'name='+ name
						+ '&email=' + email        
						+ '&web=' + web
						+ '&comments=' + comments
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

