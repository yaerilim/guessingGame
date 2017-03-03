$(document).ready(function(){
    $('#myModal').modal('toggle');
});

var current_temp;
var tries = 0;
function weather(){
    $(".zipcode").slideToggle("slow");
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?zip=" + $('.input').val() + ",us&units=imperial&APPID=066f7153dc76d5e7f50e852a176b2abf",
        type: "GET",
        dataType: "json",
        success: function(data){
            console.log(data);
            $('.location').text(data.name);
            current_temp = Math.round(Number(data.main.temp));
            $('.temperature').text(current_temp);
        }
    });
}

function my_guess(){
    if(current_temp > $('.guess').val()){
        $('.direction').text('Too Low');
        tries++;
        fa();
    }
    else if(current_temp < $('.guess').val()){
        $('.direction').text('Too high');
        tries++;
        fa();
    }else if(current_temp == $('.guess').val()){
        $('.direction').text('');
        $('.answer').text('Correct!');
        $(".question_mark").slideToggle("slow");
        $('.submit').prop("disabled",true);
        $('.submit').css({"background-color": "gray", "border": "1vh solid gray"});
    }
}

function fa(){
    if(tries===2){
        $('i').addClass('fa-thermometer-three-quarters');
    }
    else if(tries===3){
        $('i').addClass('fa-thermometer-half');
    }
    else if(tries===4){
        $('i').addClass('fa-thermometer-quarter');
    }
    else if(tries===5 && current_temp != $('.guess').val()){
        $('i').addClass('fa-thermometer-empty');
        $('.submit').prop("disabled",true);
        $('.submit').css({"background-color": "gray", "border": "1vh solid gray"});
        $('.answer').text('Incorrect!');
        $(".question_mark").slideToggle("slow");
    }
}

function reset(){
    tries = 0;
    $(".zipcode").slideToggle("slow");
    $(".question_mark").slideToggle("slow");
    current_temp = null;
    $('.guess').val('');
    $('.input').val('');
    $('.location').text('');
}
