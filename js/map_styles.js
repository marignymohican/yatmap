var mapstyles = [
	//0 blue wash - no labels
	[ { "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "stylers": [ { "hue": "#0000ff" } ] } ],
	//1 swensonian - no labels
	[{"elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "water","stylers": [{"color": "#B3BACD"}]},{"featureType": "landscape","stylers": [{"color": "#EDE3E1"}]},{"featureType": "poi.park","stylers": [{"color": "#CAD6D2"}]},{"featureType": "road.local","elementType": "geometry.fill","stylers": [{"color": "#D8D4D5"}]},{"featureType": "road.arterial","elementType": "geometry.fill","stylers": [{"color": "#d1cecf"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#fafcf9"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#b0b3b1"}]}],
	//2 swensonian - no labels except arteries and local roads
	[{elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"road.local",elementType:"labels",stylers:[{visibility:"on"}]},{featureType:"water",stylers:[{color:"#B3BACD"}]},{featureType:"landscape",stylers:[{color:"#EDE3E1"}]},{featureType:"poi.park",stylers:[{color:"#CAD6D2"}]},{featureType:"road.local",elementType:"geometry.fill",stylers:[{color:"#D8D4D5"}]},{featureType:"road.arterial",elementType:"geometry.fill",stylers:[{color:"#d1cecf"}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#fafcf9"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#b0b3b1"}]}],
	//3 swensonian - no labels, no highways
	[{"featureType": "water","stylers": [{"color": "#B3BACD"}]},{"elementType": "labels","stylers": [{"visibility": "off"}]},{"featureType": "landscape","stylers": [{"color": "#EDE3E1"}]},{"featureType": "poi.park","stylers": [{"color": "#CAD6D2"}]},{"featureType": "road.local","elementType": "geometry.fill","stylers": [{"color": "#D8D4D5"}]},{"featureType": "road.arterial","elementType": "geometry.fill","stylers": [{"color": "#d1cecf"}]},{"featureType": "road.highway","elementType": "geometry","stylers": [{"visibility": "off"}]}],
	//4 swensonian - city labels only
	[{"elementType": "labels","stylers": [{"visibility": "off"}]},{ "featureType": "administrative.locality", "stylers": [ { "visibility": "on" } ] },{"featureType": "water","stylers": [{"color": "#B3BACD"}]},{"featureType": "landscape","stylers": [{"color": "#EDE3E1"}]},{"featureType": "poi.park","stylers": [{"color": "#CAD6D2"}]},{"featureType": "road.local","elementType": "geometry.fill","stylers": [{"color": "#D8D4D5"}]},{"featureType": "road.arterial","elementType": "geometry.fill","stylers": [{"color": "#d1cecf"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#fafcf9"}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#b0b3b1"}]}],
	//5 whitewash - all roads - highway labels only
	[ { "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "on" } ] },{ "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] },{ "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#4f80e9" } ] },{ "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#F28280" } ] },{ "featureType": "road.arterial", "stylers": [ { "color": "#F28280" } ] },{ "featureType": "road.local", "elementType": "geometry", "stylers": [ { "color": "#bcbcbc" } ] } ],
	//6 all off
	[ { "stylers": [ { "visibility": "off" } ] } ],
	//7 whitewasch - highway/local roads only
	[ { "elementType": "geometry.fill", "stylers": [ { "color": "#ffffff" } ] },{ "featureType": "water", "stylers": [ { "color": "#d8d8d8" } ] },{ "featureType": "road", "stylers": [ { "visibility": "off" } ] },{ "featureType": "poi", "elementType": "labels", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [ { "visibility": "on" } ] },{ "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" } ] },{ "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "visibility": "on" } ] } ],
    //8 2017 crime map
    [{"stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#6c6c6c"},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"weight":5}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#6c6c6c"},{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"road.local","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#36c0c5"},{"lightness":55},{"visibility":"on"}]}]
];