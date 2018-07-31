

/*regional newspaper carosel slider*/

var carousel = function carousel(options) {
  var _carousel = {
    paused: false,

    stopped: false,

    options: {
      speed: 3000,
      acceleration: 5,
      reverse: false,
      selector: ".c-carousel",
      slidesSelector: ".c-carousel__slides",
      leftArrowSelector: ".c-carousel__arrow--left",
      rightArrowSelector: ".c-carousel__arrow--right"
    },

    init: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      // Copy options to this.options
      for (var prop in options) {
        if (!options.hasOwnProperty(prop)) break;
        this.options[prop] = options[prop];
      }

      // Cache nodes
      var carousel = document.querySelector(options.selector || this.options.selector);
      var slides = this._slides = carousel.querySelector(this.options.slidesSelector);
      this._leftArrow = carousel.querySelector(this.options.leftArrowSelector);
      this._rightArrow = carousel.querySelector(this.options.rightArrowSelector);

      // Multiply speed value by the number of slides
      this.options.speed = this.options.speed * slides.children.length;

      // Set slides container width
      this.width = slides.offsetWidth;

      // Repeat elements
      slides.innerHTML = slides.innerHTML + slides.innerHTML + slides.innerHTML;

      this._registerEvents();
      this._animate();
    },
    _registerEvents: function _registerEvents() {
      var _this = this;

      var speed = this.options.speed;
      var reverse = this.options.reverse;

      this._rightArrow.addEventListener("mouseover", function () {
        _this.options.speed = speed / _this.options.acceleration;
        _this.options.reverse = false;
      });
      this._rightArrow.addEventListener("mouseleave", function () {
        _this.options.speed = speed;
        _this.options.reverse = reverse;
      });
      this._leftArrow.addEventListener("mouseover", function () {
        _this.options.speed = speed / _this.options.acceleration;
        _this.options.reverse = true;
      });
      this._leftArrow.addEventListener("mouseleave", function () {
        _this.options.speed = speed;
        _this.options.reverse = reverse;
      });

      // Pause when cursor is over carousel
      this._slides.addEventListener("mouseover", this.pause.bind(this));
      this._slides.addEventListener("mouseleave", this.start.bind(this));

      // Pause when cursor is over carousel
      window.addEventListener("resize", function () {
        _this.width = _this._slides.offsetWidth;
      });
    },
    pause: function pause() {
      this.paused = true;
    },
    start: function start() {
      this.paused = false;
    },
    stop: function stop() {
      this.stopped = true;
    },
    _animate: function _animate() {
      var _this2 = this;

      var slides = this._slides;
      var oneThird = slides.lastElementChild.getBoundingClientRect().right / 3;
      var framesCount = 0;
      var step = 0;
      var posX = 0;

      var animate = function animate() {
        if (!_this2.paused) {
          framesCount = _this2.options.speed * 60 / 1000;
          step = oneThird / framesCount;

          posX += _this2.options.reverse ? step : -step;

          slides.style.transform = "translateX(" + posX + "px)";

          if (_this2.options.reverse) {
            if (posX >= _this2.width - oneThird) {
              posX = _this2.width - oneThird * 2;
            }
          } else {
            if (Math.abs(posX) >= oneThird * 2) {
              posX = -oneThird;
            }
          }
        }
        !_this2.stopped && requestAnimationFrame(animate);
      };
      animate();
    }
  };

  _carousel.init(options);

  return _carousel;
};

window.onload = function () {
  return carousel({
    selector: ".c-carousel"
  });
};


/*magazines tabs*/
$(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});

/*magazines tabs ends here*/

//article js

jQuery(document).ready(function($) {

  //Count nr. of square classes
  var countSquare = $('.square').length;

  //For each Square found add BG image
  for (i = 0; i < countSquare; i++) {
    var firstImage = $('.square').eq([i]);
    var secondImage = $('.square2').eq([i]);

    var getImage = firstImage.attr('data-image');
    var getImage2 = secondImage.attr('data-image');

    firstImage.css('background-image', 'url(' + getImage + ')');
    secondImage.css('background-image', 'url(' + getImage2 + ')');
  }

});

//weather

var temp = 0;

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $.getJSON("https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=bf219d74ec28cbbcaaccca89b0498b6b", function(data) {
        $('#city-name').html(data.name);
        $('#weather-detail-main').html(data.weather[0].main);
        $('#weather-detail-small').html(data.weather[0].description.replace(/\w\S*/g, function(c) {
          return c.charAt(0).toUpperCase() + c.substr(1).toLowerCase();
        }));
        setIcon(data.weather[0].icon);
        $('#weather-icon').attr('src', "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        temp = data.main.temp;
        setTempAsC();
      });
    });
  }
});

function setTempAsC() {
  $('#temp').html('<a href="#" class="weather_link" onclick="setTempAsF();">' + (temp - 273.15).toFixed(1) + '°C</a>');
}

function setTempAsF() {
  $('#temp').html('<a href="#" class="weather_link" onclick="setTempAsC();">' + (temp * 1.8 - 459.67).toFixed(1) + '°F</a>');
}

function setIcon(iconURL) {  
  // Map between openweather icons and weather-icons.css
  icons = [];
  icons['01'] = 'sunny';
  icons['02'] = 'cloudy';
  icons['03'] = 'cloudy';
  icons['04'] = 'cloudy-gusts';
  icons['09'] = 'rain-mix';
  icons['10'] = 'rain';
  icons['11'] = 'thunderstorm';
  icons['13'] = 'snow';
  icons['50'] = 'fog';
  
  var iconClass = "";
  //If last letter is n, set to night mode, else day
  if (iconURL.substr(-1) == 'n') {
    $("body").toggleClass("night");
    iconClass = 'wi-night-';
  } else {
    $("body").toggleClass("day");
    iconClass = 'wi-day-';
  }
  
  iconClass = iconClass + icons[iconURL.substr(0,iconURL.length-1)];
  if (iconClass == 'wi-night-sunny') iconClass = 'wi-night-clear';
  $("#weather-icon").toggleClass(iconClass);


}


//


