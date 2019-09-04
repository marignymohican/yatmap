$(document).ready(function(){
	
	$('#input_4').attr('placeholder','Street Address');
	$('#input_6').attr('placeholder','City or Town');

	$('#yfSubmit').on('click',function(){
		//submitAddress();
		alert('Oh baby! This map is no longer taking new submissions');
	});
	
	function submitAddress(){
		if ( !$('#input_3').val() ){ // what neighborhood
			alert('Please enter a neighborhood name');
		}
		if ( !$('#input_4').val() ){ // what street
			alert('Please enter a street address');
		}
		if ( !$('#input_6').val() ){ // what city
			alert('Please enter a city or town name');
		}

		if ( $('#input_3').val() && $('#input_4').val() && $('#input_6').val() ){
			var geocoder;
				geocoder = new google.maps.Geocoder();
			var address = $('#input_4').val() + ', ' + $('#input_6').val() + ', LA';

			geocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if ( results.length > 1 ){
						chooseanaddress(results);
					} else {
						addresults(results[0]);
					}
				} else {
					alert("I'm sorry, the request has failed: " + status);
					return;
				}
			});
		}
	}

	$('#chooseresults').on('click',function(){
		$('#chooseresults').fadeOut(500).empty();
	});
	$('#chooseresults').on('click','.georesults',function(){
		addresults( $(this).data('geo') );
		$('#chooseresults').fadeOut(500).empty();
	});

	// tooltip
	$('.helper').on('mouseenter', function(e){
		var mousex,mousey;		
        $('<div class="tooltip"></div').html( $('#tthelperaddress').html() ).appendTo('body');
		mousex = e.pageX + 10; //Get X coordinates
		mousey = e.pageY - 155; //Get Y coordinates
        $('.tooltip').css({ top: mousey, left: mousex }).fadeIn('slow');
	}).on('mouseleave', function(e) {
		$('.tooltip').remove();
	});

	function pushthebutton(){
		setTimeout( $('#input_2').trigger('click'),5000 )
	}

	function addresults(r){
		var inputval = false;
		for ( var ri = 0; ri < r.address_components.length; ri++ ){
			if ( r.address_components[ri].types.indexOf('administrative_area_level_1') >= 0 && r.address_components[ri].long_name == 'Louisiana' ){
				inputval = r.geometry.location.lat() + ',' + r.geometry.location.lng();
				$('#input_5').val(inputval);
				pushthebutton();
			}
		}
		if ( inputval !== false ){
			$('#input_5').val(inputval);
			pushthebutton();
		} else {
			alert('I\m sorry, we\'re only looking for addresses within Louisiana');
		}
	}
	function chooseanaddress(r){
		$('#chooseresults').append(
			'<div id="georesults">' +
				'I\'ve found more than one result for that address. Please choose one from the list below:' +
				'<ul></ul>' +
			'</div>');
		resultdisplay(r);
		$('#chooseresults').fadeIn(500);
		
		function resultdisplay(r){
			var gr;
			for ( var i=0; i < r.length; i++ ){
				gr = $('<li class="georesults" />');
				$(gr).append('<img src="/maps/icons/smallmap.png" />' + '<span>' + r[i].formatted_address + '</span>');
				$(gr).data('geo',r[i]);
				$(gr).appendTo('#georesults ul');
			}
		}
	}
});

