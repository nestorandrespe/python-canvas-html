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
                    console.log(data);
                    loaded = true;
                    // const spawn = require("child_process").spawn;
                },
                error: function(data) {
                alert('There was an error uploading your file!');
                }
            }).done(function() {
                console.log("Sent");
            });
        }
        
    }

    p.mouseDragged = function() {
        // p.ellipse(p.mouseX, p.mouseY, 20, 20);
        p.strokeWeight(20);
        p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
    }
}

var canvas_draw = new p5(scketch, 'canvas_container');

$('.color').on('click', function(){
    $('.color.active').removeClass('active');
    $(this).addClass('active');
});