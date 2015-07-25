var farol = 'apagado';
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
	}, 500);

});

kit.on("data:luminosity", function (data) {
	console.log(data);
	if(data > 50 && farol != 'apagado'){
		kit.ledOFF();
		farol = 'apagado';
		console.log("farol apagado");
	} else if( data < 50 && data > 15 && farol != 'baixo'){
		kit.ledON('GREEN');
		farol = 'baixo';
		console.log("farol baixo");
	} else if(data < 15 && farol != 'alto') {
		kit.ledON('BLUE');
		farol = 'alto';
		console.log("farol alto");
	}
});