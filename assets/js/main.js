var app = {
	init: function(){
		return 'init!';
	}
};

app.init();

var Controller = Backbone.Router.extend({
    routes: {
        "": "tab1", // Пустой hash-тэг
        "tab1": "tab1",
        "tab2": "tab2",
        "tab3": "tab3",
        "tab4": "tab4",
        "tab5": "tab5",
        "tab6": "tab6",
        "tab7": "tab7"
    },

    tab1: function () {
        $(".tab").hide(); // Прячем все блоки
        $("#tab1").show(); // Показываем нужный
        $(".nav__item-link").on('click', function(){
            $(this).addClass("active").siblings().removeClass("active");
        });
    },

    tab2: function () {
        $(".tab").hide(); // Прячем все блоки
        $("#tab2").show(); // Показываем нужный
        $(".nav__item-link").on('click', function(){
            $(this).addClass("active").siblings().removeClass("active");
        });
    },

    tab3: function () {
        $(".tab").hide(); // Прячем все блоки
        $("#tab3").show(); // Показываем нужный
        $(".nav__item-link").on('click', function(){
            $(this).addClass("active").siblings().removeClass("active");
        });
    },

    tab4: function () {
        $(".tab").hide(); // Прячем все блоки
        $("#tab4").show(); // Показываем нужный
        $(".nav__item-link").on('click', function(){
            $(this).addClass("active").siblings().removeClass("active");
        });
    },

    tab5: function () {
        $(".tab").hide(); // Прячем все блоки
        $("#tab5").show(); // Показываем нужный
        $(".nav__item-link").on('click', function(){
            $(this).addClass("active").siblings().removeClass("active");
        });
    },

    tab6: function () {
        $(".tab").hide(); // Прячем все блоки
        $("#tab6").show(); // Показываем нужный
        $(".nav__item-link").on('click', function(){
            $(this).addClass("active").siblings().removeClass("active");
        });
    },

    tab7: function () {

        $(".tab").hide(); // Прячем все блоки
        $("#tab7").show(); // Показываем нужный
        $(".nav__item-link").on('click', function(){
            $(this).addClass("active").siblings().removeClass("active");
        });
    }
    
});

var controller = new Controller(); // Создаём контроллер

Backbone.history.start();  // Запускаем HTML5 History push


$(document).ready(function(){

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