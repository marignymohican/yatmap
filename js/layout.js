$(document).ready(function() {
//function buildyatmap(){
// display setup
	sizeme();
	$(window).resize(function(){
		sizeme();
	});

	if ( document.cookie.indexOf('nola_yatmap') < 0 ){
		var starttext = 'take me to the map!';
		if ( $(window).width() < 600 ){ starttext = 'get started!'; }
		//alert('no cookie!');
		$('#ymfaq').append(
			'<div>' +
				'<h3><img style="width: 50%;" alt="Welcome to the Yat Map!" src="../img/Yat-Map-cobrand.png" /></h3>' + 
				'<div>' +
					'<p>Tell us &quot;Where y\'at&quot; and &quot;Whatcha\' call your neighborhood!&quot;</p>' +
					'<p>Type in your street address and what you call your neighborhood. Your response will appear on the map as a colored dot, right next to the responses of your neighbors. Do you agree on your neighborhood\'s identity?</p>' +
					'<p>Thanks for adding your input to the database! Check back to see how your neighborhood\'s identity shapes up over time.</p>' +
					'<div class="yfSubmitButton">' + starttext + '</div>' +
				'</div>' +
			'</div>'
		);

		$('#ymfaq').on('click','.yfSubmitButton',function(e){
			// set the cookie
			var cdate = new Date();
			cdate.setTime(cdate.getTime() + 3.15569e10); // 300000 five minutes, 3.15569e10 one year
			document.cookie = 'nola_yatmap=true;expires=' + cdate.toUTCString();
			if ( $(window).width() < 600 ){ showform(e); }
			//$('#yfSubmitButton').text('get started!');
			$('#ymfaq').remove();
		});
	} else {
		$('#ymfaq').remove();
	}
// display setup
// small windows
	$('#socialshare #ssComments').click(function(event){
		var wh = window.innerHeight * 0.75;
		if (wh < 300 ) { wh = window.innerHeight; }
		event.preventDefault();
		$('#ssPanelContent')
			.height( wh )
			.css('margin-top', (wh*-0.5))
			.append('<div id="commentFrame" style="width:100%; height:' + (wh-25) + 'px"><iframe seamless style="border:0; width:100%; height:75%;" src="' + $(this).attr('href') + '"></iframe></div>');
		$('#ssPanel').fadeIn(200);
	});
	$('#yfSubmitNav').click(function(e){
		showform(e);
	});
	function showform(e){
		var wh = window.innerHeight * 0.75;
		if ( wh < 300 ) { wh = window.innerHeight; }
		e.preventDefault();
		$('#ssPanelContent')
			.css({ 'margin-top': (wh*-0.5), 'padding-bottom': '10px' })
			.append( $('#yatform form') );
		$('#ssPanel').fadeIn(200);
	}
	$('#ssPanel #ssPanelClose').click(function(){
		$('#ssPanel').fadeOut(200);
		$('#ssPanelContent form').appendTo('#yatform');
		$('#ssPanelContent #commentFrame').remove();
	});
// small windows

	var map;
	var yapCenter = new google.maps.LatLng(29.97457,-90.10068);
	var yapZoom = ( window.outerWidth < 600 ) ? 11 : 12;
	var mapOptions = {
  			center: yapCenter,
			zoom: yapZoom,
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.DEFAULT,
				position: google.maps.ControlPosition.TOP_RIGHT
			},
			mapTypeControl: false,
			panControl: false,
			streetViewControl: false,
			styles: mapstyles[2]
		};
	var infowindow = new google.maps.InfoWindow();
	var mapjson = './js/responses.json';
	var nonNOhoods = [];

	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	console.log('building the yatmap');
	$.getJSON(mapjson,function(json){
		console.log(json);
		var whereyat = json.feed;			

		for ( var i = 0; i < whereyat.length; i++ ){
			var latlng = whereyat[i][2];
			var hoodname = neighborhood(whereyat[i][1]);
			var thiscolor = 'dot-white'; // the default "not found" color
	
			// +++++ COLOR CONTROL 
			if ( whereyat[i][0].toLowerCase().indexOf('new orleans') >= 0 ){
			// city is/includes New Orleans				
				for ( var j = 0; j < nhoodscolors.length; j++ ){
					if ( hoodname == genericizor(nhoodscolors[j].NEIGHBORHOOD) ){
						thiscolor = nhoodscolors[j].COLOR;
						break;
					}
				}
			} else {
			// city is elsewhere
				for ( var nnc = 0; nnc < nonNOcolors.length; nnc++ ){
					if ( hoodname == genericizor(nonNOcolors[nnc].NEIGHBORHOOD) ){
						thiscolor = nonNOcolors[nnc].COLOR;
						break;
					}
				}
				if ( thiscolor == 'dot-white' ){
					for ( var nnh = 0; nnh < nonNOhoods.length; nnh++ ){
						if ( hoodname == genericizor(nonNOhoods[nnh].NEIGHBORHOOD) ){
							thiscolor = nonNOhoods[nnh].COLOR;
							break;
						}
					}
					if ( thiscolor == 'dot-white' ){
						thiscolor = dotlist[assigncolors(nonNOhoods)];
						nonNOhoods.push(
							{
								"NEIGHBORHOOD": hoodname,
								"COLOR": thiscolor
							}
						);
					}
				}
			}
			// +++++ COLOR CONTROL			

			var marker = new google.maps.Marker({
					map: map,
					position: {lat: Number(latlng.split(',')[0]), lng: Number(latlng.split(',')[1])},
					icon: {
						url: './img/dots/' + thiscolor + '.png',
						size: new google.maps.Size(20,20),
						scaledSize: new google.maps.Size(20,20),
						origin: new google.maps.Point(0,0),
						anchor: new google.maps.Point(10,10),
						}
				});
			$(marker).data('yminfo',whereyat[i]);
			
			google.maps.event.addListener(marker, 'click', showinfowindow(map,marker));
		}
		
		// pan to dot when LatLon in URL
		if ( window.location.search.indexOf('latlon') >= 0 ){
			var pan = window.location.search.split('latlon=')[1];
			pan = new google.maps.LatLng(pan.split(',')[0],pan.split(',')[1]);
			map.panTo(pan);
			map.setZoom(18);
		}

	});

// helper functions below
	function showinfowindow(mp, mkr) {
		return function() {
			var ymi = $(mkr).data('yminfo');
			infowindow.setContent(
				'<div id="yatwindow">' + 
					'<h3>' + ymi[1] + '</h3>' +
					//ymi.gsx$whatisyouraddress.$t +
				'</div>');
			infowindow.open(mp,mkr);
		};
	}

	function assigncolors(hoodsarray){
		return hoodsarray.length - (dotlist.length * Math.floor(hoodsarray.length / dotlist.length));
	}
	function genericizor(n){
		n = n.toLowerCase();
		var g = [ // attempt to group like names and correct regular minor misspelling
			{ a: /\s+$/, b: ''  }, // remove any trailing spaces
			{ a: /\s+/g, b: '-' }, // collapse multispaces to single hyphens
			{ a: /\-+/g, b: '-' }, // multi hypens to single
			{ a: /[\.,\/#!$%\^&\*;:{}=_'"~()]/g, b: '' }, // deal with all the punctuation?
			{ a: /^the-/, b: '' } // preceding the's
			];
		for ( var i = 0; i < g.length; i++ ){
			n = n.replace(g[i].a,g[i].b);
		}
		return n;
	}

	function neighborhood(h){
		h = h.toLowerCase();
		var genericize = [ // attempt to group like names and correct regular minor misspelling
	//		{ a: /marginy/, b: 'marigny' },
			{ a: /faubourg\s/, b: '' },
			{ a: /^bayou\s/, b: '' }
	//		{ a: /car+ol+ton/, b: 'carrollton' }
			];
		for ( var i in genericize ){
			h = h.replace(genericize[i].a,genericize[i].b);
		}
	
		var htmlize = [
			{ a: /\s+$/, b: '' }, // remove any trailing spaces
			{ a: /\s+/g, b: '-'}, // collapse multispaces to single hyphens
			{ a: /the-/, b: '' },
			{ a: /\./g, b: '' }, // deal with all the saints
			];
		for ( var j in htmlize ){
			h = h.replace(htmlize[j].a,htmlize[j].b);
		}
		
		return h;
	}

	function sizeme(){
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		
		if ( windowWidth < 600 ){
			$('#map').width('100%').height( windowHeight - 30 );
		} else {
			$('#yatform').width(250).height( windowHeight - 30 );
			$('#map').width( windowWidth - 250 ).height( windowHeight - 30 );
		}

		if ( $('#yatform form').height() > $('#yatform').innerHeight() ){
			$('#yatform').css('overflow-y','scroll');
		} else {
			$('#yatform').css('overflow-y','hidden');
		}
	}
});
