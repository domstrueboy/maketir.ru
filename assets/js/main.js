(function(){

    var app = {

        init: function(){

            app.build();
            app.filterByCategory();
            app.vk();
            app.router();
            app.ontop();
            app.resizeHeader();

        },

        build: function(){

            app.ajax('products', 'blocks', 'product-area', 'Все');
            
            app.gallery('one', 'prints', 188);
            app.gallery('two', 'lityo', 114);
            app.gallery('three', 'lepnina', 10);

            app.ajax('materials', 'rows', 'material-area', 'all');

        },

        ajax: function(file, templateId, domId, filterName){
            $.ajax({
                url: file+'.json'
            }).done(function(data){

                //console.log(data);

                app.appendData(data, templateId, domId, filterName);            

            }).fail(function(){
                console.log('ajax fail!');
            });
        },

        // заполняем шаблон данными
        fillTemplate: function (sourceId, data, filterName){

            var source   = $(sourceId).html(),
                template = Handlebars.compile(source);

            data.blocks = _.filter(data.blocks, function(data){
                for(i in data.category){
                    if(data.category[i] === filterName){
                        var filterStatus = true;
                        break;
                    }
                    else var filterStatus = false;
                }
                return filterStatus;
            });

            return(template(data));

        },

        appendData: function(data, templateId, domId, filterName){
            
             var html = app.fillTemplate('#'+templateId, data, filterName); // заполняем шаблон данными
            $('#'+domId).empty();
            $('#'+domId).append(html); // вставляем данные в DOM
        },

        filterByCategory: function(){
            $(".all_filter").on('click', function(){
                app.ajax('products', 'blocks', 'product-area', 'Все');
            });

            $(".printers_filter").on('click', function(){
                app.ajax('products', 'blocks', 'product-area', 'Принтеры');
            });

            $(".scanners_filter").on('click', function(){
                app.ajax('products', 'blocks', 'product-area', 'Сканеры');
            });

            $(".others_filter").on('click', function(){
                app.ajax('products', 'blocks', 'product-area', 'Разное');
            });

            //Изменение вида кнопок фильтров
            $(".filters__item").on("click", function(){
                $(".filters__item").removeClass("active");
                $(this).addClass("active");
            })
        },

        tapTab: function(id){
            $(".tabs__item").hide(); // Прячем все блоки
            $(".nav__item").removeClass("active_tab");
            $("#"+id).show(); // Показываем нужный
            $(".nav__item_"+id).addClass("active_tab");
            $('body,html').animate({scrollTop: 0}, 0);
        },

        router: function(){
            var Controller = Backbone.Router.extend({
            routes: {
                ""              :   "tab1", // Пустой hash-тэг
                "3dprinters"    :   "tab1",
                "3dprinting"    :   "tab2",
                "lityo"         :   "tab3",
                "lepnina"       :   "tab4",
                "materials"     :   "tab5",
                "contacts"      :   "tab6"
            },

            tab1: function () {
                app.tapTab('tab1');
            },
            tab2: function () {
                app.tapTab('tab2');
            },
            tab3: function () {
                app.tapTab('tab3');
            },
            tab4: function () {
                app.tapTab('tab4');
            },
            tab5: function () {
                app.tapTab('tab5');
            },
            tab6: function () {
                app.tapTab('tab6');
            }

        });

        var controller = new Controller(); // Создаём контроллер

        Backbone.history.start();  // Запускаем HTML5 History push
        },

        ontop: function(){
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
                        if($window.scrollTop() <= top + 10) /* скрываем, если позиция блока #top и текущий вид окна совпадают.
                          +10 - для того чтобы показывать кнопку Наверх как минимум при прокрутке окна вниз на 10 пикселей*/
                        {
                            displayed = false;
                            $message.fadeOut(200);
                        }
                        else if(displayed == false) // показываем кнопку «Наверх»
                        {
                            displayed = true;
                            $message.stop(true, true).fadeTo(200, 0.85).on("click", function () { $message.fadeOut(200); });
                        }
                    }, 100);
                });
               
                // Функционал кнопки - промотка наверх по клику
               $('#ontop').on("click", function(e) {
                    e.preventDefault();
                   $('body,html').animate({scrollTop: 0}, 200);
                });

            });//documentready end
        },

        vk: function(){
            VK.Widgets.Group("vk_groups", {mode: 2, wide: 0, width: "auto" }, 39116674);
        },

        gallery: function(id, catalog, count){
            var list = "";
            for(var i=count; i>0; i--){
                list = list + "<a class='example-image-link' href='img/"+catalog+"/"+i+".jpg' data-lightbox='"+catalog+"'><img class='example-image col-xs-3 col-sm-2 col-md-1 col-lg-1' src='img/"+catalog+"/"+i+"-100x100.jpg'></a>";
            }
            $("#"+id).append(list);
        },

        resizeHeader: function(){
    
                    var a = $('<div class="modal-measure-scrollbar"/>').prependTo($("body")),
                        b = $('<div class="inner"/>').appendTo(a),
                            c = a.width() - b.width();
                        a.remove();
                    
                    $(document).on('hidden.bs.modal', '.modal', function ()
                    {
                        $("header").css('padding-right','');
                        //$(window).unbind("resize.modalAlign");  
                    }) 
                 
                    $(document).on('show.bs.modal', function (){
                        $("header").css('padding-right', c + 'px');
                    })
    
        }
    }

    app.init();

    /*$(document).on('show.bs.modal', function () {
                $("#modal-content").scrollTop(110);
    });*/

}());