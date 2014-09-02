var app = {
	init: function(){
		return 'init!';
	}
};

app.init();

$(document).ready(function(){

//Дальше - объединение пунктов верхнего меню и картинок на первой вкладке
    $("[class^=menu]").hover(
        function(){
            $("#menu"+this.id[4]).css("border","1px solid white");
            $("#menu"+this.id[4]+"box").css("background","white");
        },
        function(){
            $("#menu"+this.id[4]).css("border","1px solid #4d4d4d");
            $("#menu"+this.id[4]+"box").css("background","#4d4d4d");
    });

//Дальше - переходы по вкладкам меню

    $("[class^=menu]").click(function(){
        $(".currentMenu").removeClass("currentMenu");
        $("#menu"+this.id[4]).addClass("currentMenu");
        $(".currentTab").fadeOut(300);
        $(".currentTab").removeClass("currentTab");
        $("#tab"+this.id[4]).addClass("currentTab");
        $(".currentTab").fadeTo(300, 1);
    });

//Здесь начинается код кнопки "наверх"
        var scroll_timer;
        var displayed = false;
        var $message = $('#ontop');
        var $window = $(window);
        // узнаём позицию блока #top
        var top = $(document.body).children(0).position().top;
     
        // функция при прокрутке
        $window.scroll(function(){
            window.clearTimeout(scroll_timer);
            scroll_timer = window.setTimeout(function() { // используем таймер
                if($window.scrollTop() <= top+10) /* скрываем, если позиция блока #top и текущий вид окна совпадают.
                  +10 - для того чтобы показывать кнопку Наверх как минимум при прокрутке окна вниз на 10 пикселей*/
                {
                    displayed = false;
                    $message.fadeOut(300);
                }
                else if(displayed == false) // показываем кнопку «Наверх»
                {
                    displayed = true;
                    $message.stop(true, true).fadeTo(300,0.5).click(function () { $message.fadeOut(300); });
                }
            }, 100);
        });
       
        // Клик по кнопке наверх
       $('#ontop').click(function(e) {
            e.preventDefault();
           $('body,html').animate({scrollTop: 0}, 300);
           });

///////////////////////////////////////////////////////////////////////////
VK.Widgets.Group("vk_groups", {mode: 2, wide: 0, width: "auto" }, 39116674);
///////////////////////////////////////////////////////////////////////////

    $("#lookButton").click(function(){
        $("#materialsView").load("./content/materialy_lityo.html");
        });

});