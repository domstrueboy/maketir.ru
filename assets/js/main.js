/*var app = {

	init: function(){
		app.router();
        app.ontop();
        vkGroups();
        lookButton();
	},

    router: function(){
        
    };
};

app.init();*/
$(document).ready(function(){

var Controller = Backbone.Router.extend({
    routes: {
        "": "tab1", // Пустой hash-тэг
        "3dprinters"    :   "tab1",
        "3dprinting"    :   "tab2",
        "lityo"         :   "tab3",
        "lepnina"       :   "tab4",
        "materials"     :   "tab5",
        "contacts"      :   "tab6"
    },

    tab1: function () {
        $(".tabs__item").hide(); // Прячем все блоки
        $(".nav__item").removeClass("active");
        $("#tab1").show(); // Показываем нужный
        $(".nav__item_tab1").addClass("active");
        $('body,html').animate({scrollTop: 0}, 0);
    },

    tab2: function () {
        $(".tabs__item").hide(); // Прячем все блоки
        $(".nav__item").removeClass("active");
        $("#tab2").show(); // Показываем нужный
        $(".nav__item_tab2").addClass("active");
        $('body,html').animate({scrollTop: 0}, 0);
    },

    tab3: function () {
        $(".tabs__item").hide(); // Прячем все блоки
        $(".nav__item").removeClass("active");
        $("#tab3").show(); // Показываем нужный
        $(".nav__item_tab3").addClass("active");
        $('body,html').animate({scrollTop: 0}, 0);
    },

    tab4: function () {
        $(".tabs__item").hide(); // Прячем все блоки
        $(".nav__item").removeClass("active");
        $("#tab4").show(); // Показываем нужный
        $(".nav__item_tab4").addClass("active");
        $('body,html').animate({scrollTop: 0}, 0);
    },

    tab5: function () {
        $(".tabs__item").hide(); // Прячем все блоки
        $(".nav__item").removeClass("active");
        $("#tab5").show(); // Показываем нужный
        $(".nav__item_tab5").addClass("active");
        $('body,html').animate({scrollTop: 0}, 0);
    },

    tab6: function () {
        $(".tabs__item").hide(); // Прячем все блоки
        $(".nav__item").removeClass("active");
        $("#tab6").show(); // Показываем нужный
        $(".nav__item_tab6").addClass("active");
        $('body,html').animate({scrollTop: 0}, 0);
    }
});

var controller = new Controller(); // Создаём контроллер

Backbone.history.start();  // Запускаем HTML5 History push


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
                if($window.scrollTop() <= top) /* скрываем, если позиция блока #top и текущий вид окна совпадают.
                  +10 - для того чтобы показывать кнопку Наверх как минимум при прокрутке окна вниз на 10 пикселей*/
                {
                    displayed = false;
                    $message.fadeOut(100);
                }
                else if(displayed == false) // показываем кнопку «Наверх»
                {
                    displayed = true;
                    $message.stop(true, true).fadeTo(100,0.1).on("click", function () { $message.fadeOut(100); });
                }
            }, 100);
        });
       
        // Функционал кнопки - промотка наверх по клику
       $('#ontop').on("click", function(e) {
            e.preventDefault();
           $('body,html').animate({scrollTop: 0}, 0);
        });

///////////////////////////////////////////////////////////////////////////
VK.Widgets.Group("vk_groups", {mode: 2, wide: 0, width: "auto" }, 39116674);
///////////////////////////////////////////////////////////////////////////

    $("#lookButton").on("click", function(){
        $("#materialsView").load("./content/materialy_lityo.html");
    });

    $("#loadButton").on("click", function(){
        $("#materialsView").load("./content/materialy_lityo.xls");
    });


    //Starting the dotdotdot
    $(".products__item").dotdotdot({
        //  configuration goes here
        after: "a.readmore"
    });

});