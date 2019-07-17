var scketch = function(p) {
    var color = p.color(239,223,193);
    var loaded = false;

    p.setup = function() {
        p.createCanvas(500,500);
        p.background(142,181,219);
    }

    p.draw = function() {
        p.stroke(color);
        p.noFill();
    }
        
    p.mouseReleased = function() {
        if(!loaded){
            var canvas = document.getElementById('defaultCanvas0');
            var imgURL = canvas.toDataURL();
            loaded = true;

            $.ajax({
                type: "POST",
                url: "/take_canvas",
                data: {img: imgURL},
                success: function(data) {
                    // console.log(data);
                    loaded = false;
                },
                error: function(data) {
                }
            }).done(function() {
                // console.log("enviado");
            });
        }
        
    }

    p.mouseDragged = function() {
        // p.ellipse(p.mouseX, p.mouseY, 20, 20);
        p.strokeWeight(20);
        p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
    }

    p.changeColor = function(color_temp){
        color = p.color(color_temp[0],color_temp[1],color_temp[2]);
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
	});
	
})(jQuery, this);