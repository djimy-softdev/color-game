
var squares = document.querySelectorAll(".square");
var color_display = document.getElementById("color_display");
var banner = document.getElementById("banner");
var reset = document.getElementById("reset");
var message = document.getElementById("message");
var easy_btn = document.getElementById("easy_btn");
var hard_btn = document.getElementById("hard_btn");

var total_colors = 6;
var colors;
var picked_color;

set_event_listeners_for_squares();
reset_game(total_colors);


easy_btn.addEventListener('click', function(){
    hard_btn.classList.remove("selected");
    easy_btn.classList.add("selected");

    total_colors = 3;
    for(var i=3; i < 6; i++){
        squares[i].style.display = "none";
    }
    reset_game(total_colors);
});

hard_btn.addEventListener('click', function(){
    easy_btn.classList.remove("selected");
    hard_btn.classList.add("selected");

    total_colors = 6;
    for(var i=3; i < 6; i++){
        squares[i].style.display = "block";
    }
    reset_game(total_colors);
});

reset.addEventListener('click', function(){
    reset_game(total_colors);
});

function reset_game(number_of_colors){
    total_colors = number_of_colors;
    colors = randomize_colors(total_colors);
    picked_color = pick_random_color(colors);

    set_random_colors();
    color_display.textContent = picked_color;
    banner.style.backgroundColor = "steelblue";
    reset.textContent = "New Colors";
    message.textContent = "";
}

function change_colors(squares, color) {
    for(var i=0; i<total_colors; i++){
        squares[i].style.backgroundColor = color;
    }
}

function randomize_colors(number_of_colors) {
    var colors = []
    var temp_color = "";
    var red, green, blue;

    for(var i=0; i<number_of_colors; i++){
        // generate a color
        red = Math.floor(Math.random() * 256);    
        green = Math.floor(Math.random() * 256);    
        blue = Math.floor(Math.random() * 256);    
        temp_color = "rgb(" + red.toString() + ", " + green.toString() + ", " + blue.toString() + ")"; 
        
        //check if it's in the array
        //if yes add it otherwise regenerate the color
        if(colors.indexOf(temp_color) <= -1){
            colors.push(temp_color);
        }
        else{
            i--;
        }
    }

    return colors;
}

function set_random_colors(){
    for(var i=0; i<total_colors; i++){
        squares[i].style.backgroundColor = colors[i];
    } 
}

function set_event_listeners_for_squares(){
    for(var i=0; i < squares.length; i++){
        squares[i].addEventListener('click', function(){
            var clicked_color = this.style.backgroundColor;
    
            if(clicked_color === picked_color){
                change_colors(squares, picked_color);
                reset.textContent = "Play Again?";
                message.textContent = "Correct";
                banner.style.backgroundColor = picked_color;
            } 
            else{
                this.style.backgroundColor = "#232323";
                message.textContent = "Try again!";
            }
        });
    } 
}

function pick_random_color(colors){
    var index = Math.floor(Math.random() * colors.length);
    var picked_color = colors[index];

    return picked_color;
}



