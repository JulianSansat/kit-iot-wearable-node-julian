var Wearable = require('kit-iot-wearable'),
kit = new Wearable({
name: 'wV3_0E0039A1'
});

kit.findWearable();

//after connect the 'connected' event will be emitted 
kit.on('connected', function () {
	kit.luminosity();

	setInterval(function () {
		kit.luminosity();
	}, 1000);

});

kit.on("data:luminosity", function (data) {
	console.log(data);
	if(data > 50){
		kit.ledOFF();
	} else if( data < 50 && data > 15){
		kit.ledON('GREEN');
	} else if(data < 15) {
		kit.ledON('BLUE');
	}
});