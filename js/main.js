(function() {
	var height;
	var heightPrize = document.getElementById('prizes').offsetHeight;
	var offsetPrizes = document.getElementById('event').offsetHeight 
							+ document.getElementById('photos').offsetHeight
							+ heightPrize;

	var map;
	var mapinit = function() {
		var mountbatten = new google.maps.LatLng(50.937281, -1.398491);
		var mapOptions = {
			zoom: 15,
			center: mountbatten,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
		};

		map = new google.maps.Map(document.getElementById('location_map'), mapOptions);

		new google.maps.Marker({
			position: mountbatten,
			map: map,
			title: "Mountbatten Building"
		});
	}

	var resizeDiv = function() {
		var nh = window.innerHeight;
		if (height === nh) return;
		height = nh;
		document.getElementById('hackasoton').style.height = height + 'px';
		document.body.style.paddingTop = height + 'px';
	}

	window.addEventListener("load", function() {
		resizeDiv();
		mapinit();

		var p = document.getElementById("photos");
		window.addEventListener("mousemove", function(e) {
			var max = p.scrollWidth - p.clientWidth;
			var mousemax = p.clientWidth;

			var q = max / mousemax;
			var scr = e.clientX * q;

			console.log("scrollto", scr);

			p.scrollLeft = max - scr;
		});
	});

	window.addEventListener("resize", function() {
		resizeDiv();
	});

	var parallax = function() {
		var scrolled = $(window).scrollTop();

		var paralaxHome = scrolled/4;
		$("#hackasoton-content").css("margin-top", -paralaxHome );

		var parallaxAndroid = height - scrolled;
		if(parallaxAndroid < 200 && parallaxAndroid > -100) {
			console.log(height, scrolled, parallaxAndroid);
			$('.android').addClass("android-active");
		} else {
			$('.android').removeClass("android-active");
		}

		// if(parallaxAndroid < 0) {
		// 	console.log(parallaxAndroid);
		// 	$('#photos-wrapper').css('margin-left', parallaxAndroid/4);
		// }

		var parallaxPrizes = (heightPrize - (60+height + offsetPrizes - scrolled))/12;
		if (parallaxPrizes > 0) {
			console.log("Prizes parallax: " + parallaxPrizes, heightPrize);
			$('#left-image').css('top', -parallaxPrizes+'px');
			$('#right-image').css('top', -parallaxPrizes+'px');
			return;
		}
	}

	$(window).scroll(parallax); 

})();


//Smooth scrolling
$(document).ready(function() {
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
 
  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });
 
  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }
 
});