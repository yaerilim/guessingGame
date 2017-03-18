//---------------------------------- WHEN GAME STARTS ----------------------------------
$(document).ready(function(){
    $('#myModal').modal('toggle');
    $(".guess").keyup(function(event) {
        if (event.keyCode == 13) {             //clicking by pushing enter key
            $(".submit").click();
        }
    });
    $(".input").keyup(function(event) {
        if (event.keyCode == 13) {
            $(".button").click();
        }
    });
});
//---------------------------------- GETTING CURRENT TEMPERATURE VIA ZIP CODE USING 'OPEN WEATHER MAP' API ----------------------------------
var current_temp;
var tries = 0;
function weather(){
    $(".zipcode").slideToggle("slow");
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?zip=" + $('.input').val() + ",us&units=imperial&APPID=066f7153dc76d5e7f50e852a176b2abf",
        //input.val is the zip code that user input
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
//---------------------------------- USER GUESSING ----------------------------------
function my_guess(){
    if(current_temp > $('.guess').val()){
        $('.direction').text('Too Low');
        tries++;
        thermometer_icon();
    }
    else if(current_temp < $('.guess').val()){
        $('.direction').text('Too high');
        tries++;
        thermometer_icon();
    }else if(current_temp == $('.guess').val()){
        $('.direction').text('');
        $('.answer').text('Correct!');
        $(".question_mark").slideToggle("slow");
        $('.submit').prop("disabled",true);
        $('.submit').css({"background-color": "gray", "border": "1vh solid gray"});
    }
}
//---------------------------------- CHANGE THERMOMETER ICON AS NUMBER OF GUESSES INCREASE ----------------------------------
function thermometer_icon(){
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
//---------------------------------- WHEN PLAY AGAIN WAS CLICKED ----------------------------------
function reset(){
    tries = 0;
    $('.submit').prop("disabled",true);
    $(".zipcode").slideToggle("slow");
    $(".question_mark").slideToggle("slow");
    current_temp = null;
    $('.guess').val('');
    $('.input').val('');
    $('.location').text('');
    $('.direction').text('');
    $('i').removeClass('fa-thermometer-quarter').removeClass('fa-thermometer-half').removeClass('fa-thermometer-empty').removeClass('fa-thermometer-three-quarters');
    $('.submit').css({"background-color": "#779ECB", "border": "1vh solid #779ECB"});
}
