var gulp = require('gulp'), //Собственно Gulp JS
    minifyHTML = require('gulp-minify-html'), //Минификация html
    less = require('gulp-less'), //Препроцессор LESS
    path = require('path'),
	myth = require('gulp-myth'), // Myth - http://www.myth.io/ - добавляем с его помощью префиксы
    csso = require('gulp-csso'), // Минификация CSS
    imagemin = require('gulp-imagemin'), // Минификация изображений
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'); // Склейка файлов
    

// Собираем HTML
gulp.task('html',function(){
	gulp.src('./assets/**/*.html')
	   .pipe(minifyHTML())
	   .pipe(gulp.dest('./watch'));
});

// Собираем LESS
gulp.task('less', function() {
    gulp.src('./assets/less/**/*.less')
        .pipe(less()) //сборка less
        .pipe(myth()) // добавляем префиксы http://www.myth.io/
        .pipe(concat('main.css')) // собираем все css
        .pipe(csso()) // минимизируем css
        .pipe(gulp.dest('./watch/css')); // записываем css
});

// Собираем JS
gulp.task('js', function() {
    gulp.src('./assets/js/**/*.js')
        .pipe(concat('main.js')) // Собираем все JS
        .pipe(uglify())
        .pipe(gulp.dest('./watch/js'));
});

// Запуск сервера разработки gulp watch
gulp.task('watch', function() {
    // Предварительная сборка проекта
    gulp.run('html','less','js');

        gulp.watch('assets/*', function() {
            gulp.run('html');
        });
        gulp.watch('assets/less/**/*', function() {
            gulp.run('less');
        });
        gulp.watch('assets/js/**/*', function() {
            gulp.run('js');
        });
});


//Сборка проекта
gulp.task('build', function() {

	// html
	gulp.src('./watch/**/*.html')
        .pipe(gulp.dest('./build'));

    // css
    gulp.src('./watch/css/**/*.css')
        .pipe(gulp.dest('./build/css/')); // записываем css

    // js
    gulp.src('./watch/js/**/*.js')
        .pipe(gulp.dest('./build/js'));

    // image
    gulp.src('./watch/img/**/*')
        .pipe(imagemin()) //Сжатие изображений
        .pipe(gulp.dest('./build/img'));
        
});