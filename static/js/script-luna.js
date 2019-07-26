var scketch = function(p) {

    var color = p.color(255,0,0);
    var isTransfering = false;
    var modelReady = false;
    var pix2pix;

    var sW;

    p.setup = function() {
        p.createCanvas(256,256);
        p.background(0);

        pix2pix = ml5.pix2pix('/static/models/luna.pict', function(){
            console.log('modelo cargado');
            modelReady = true;
            p.transfer();
        });

        sW = 30;
    }

    p.draw = function() {
        p.stroke(color);
        p.noFill();
    }
        
    p.mouseReleased = function() {
        if(modelReady && !isTransfering) p.transfer();
    }

    p.mouseDragged = function() {
        p.strokeWeight(sW);
        p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
    }

    p.changeColor = function(color_temp){
        color = p.color(color_temp[0],color_temp[1],color_temp[2]);

        if(color_temp[0] == 0 && color_temp[1] == 0 && color_temp[2] == 0) sW = 30;
        else if(color_temp[0] == 255) sW = 30;
        else if(color_temp[1] == 255) sW = 4;
        else if(color_temp[2] == 255) sW = 12;
    }

    p.transfer = function() {
        isTransfering = true;

        const canvas = p.select('canvas').elt;

        pix2pix.transfer(canvas, function(err, result){
            if(err) console.log(err);

            isTransfering = false;
            $('#output').empty();
            p.createImg(result.src).class('resultado').parent('output');
        });
    }
}

var canvas_draw = new p5(scketch, 'canvas_container');

(function ($, root, undefined) {
	$(function () {
		$('.color').on('click', function(){
            $('.color.active').removeClass('active');
            $(this).addClass('active');

            var color = $(this).attr('data-color').split(',');
            canvas_draw.changeColor(color);
        });

        console.log('ml5 version:', ml5.version);
	});
	
})(jQuery, this);