
var pages;

$(document).ready(function() {
  pages = $("#slide-wrapper div[id]")          // find spans with ID attribute
  .map(function() { return this.id; })  // convert to set of IDs
  .get();                               // convert to instance of Array (optional)


  init_check_hash();
  init_text_wait();
  init_active_nav();
  init_back_to_top();
  init_plugins();
  init_btn_open_content();
  init_nav_event();
  init_btn_love();
  init_modal_optional();
  init_btn_portfolio_article();
});

function init_modal_optional() {
  if ($('.ajax_link').length > 0) {
    $('.ajax_link').click(function(e) {
      var html = $(this).attr("href");
      $('#modal').html("").load(html);
      $('#modal').modal('show');
      return false;
    });
  }
}

function init_btn_love() {
  $('.love-post-btn a').click(function() {
    var current_like = parseInt($(this).text());
    $(this).html('<span><i class="fa fa-heart"></i> ' + (current_like + 1) + '</span>');
    return false;
  });
}

function init_plugins() {
  $('[data-toggle=tooltip]').tooltip();
  $('#portfolio-grid').mixitup();
  $("#navigation").autofix_anything({
    onlyInContainer: true
  });
  $('.image-popup').magnificPopup({type: 'image', preloader: true});
  $('.popup-iframe').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });
}

function init_back_to_top() {
  $('#backtotop').click(function() {
    $("html,body").animate({
      scrollTop: $('#wrapper').offset().top
    }, 600, function() {
    });
    return false;
  });
}

function init_btn_open_content() {
  $('#open-content').click(function() {
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      /* $('.img-arrow, #main-content').fadeIn(); */
      $('#main-content').fadeIn();
      $('#main-content').addClass('active');
      $('.navigation-list a[href="#portfolio"]').tab('show')
      
      /*$("html,body").animate({
        scrollTop: $('#main-content').offset().top
      }, 200, function() {
      });
  */
    } else {
      
      /*
      $("html,body").animate({
        scrollTop: $('#wrapper').offset().top
      }, 200, function() {
        $('#main-content').fadeOut();
        $('#main-content').removeClass('active');
        $('#open-content').text('See My Projects');
      });
  */
    }
  });
}

function init_btn_portfolio_article() {
  $('.popup-portfolio').click(function() {
    $('#portfolio-article').toggleClass('active');
    $('#main-content').toggleClass('active');
  });

  $("#btn1").click(function(){
    $("#slide-wrapper").animate({height:"300px"});
  });
}

function init_nav_event() {
  $('.navigation-list a').click(function(e) {
    $(this).tab('show');
    $('#open-content').text($(this).text());
    
    /* $("html,body").animate({
      scrollTop: $('#main-content').offset().top
    }, 200, function() {
    }); */

    if ($(this).data('menu') == "contact") {
      init_gmap();
    }
    location.hash = $(this).attr('href');
    return false;
  });
}

function init_active_nav() {
  $('.navigation-list li').click(function() {
    $('.navigation-list li').removeClass('active');
    $(this).addClass('active');
  });
}

function init_text_wait() {
  $('#wait-page').fadeOut("slow", function() {
    $('#wrapper').fadeIn("slow");
  });
}

function init_check_hash() {
  if (window.location.hash) {
    var pages = ["#portfolio", "#resume", "#blog", "#contact"]
    /*int index = $.inArray(window.location.hash, pages);*/
    if ($.inArray(window.location.hash, pages) > -1) {

/*
      &(pages[index]).removeClass('hidden');
      for (int i = 0; i < pages.length; i++) { 
        if(i != index)
        {
          $(pages[i]).addClass('hidden');
        }
      }
*/
      /*$('.navigation-list a[href="' + window.location.hash + '"]').tab('show');*/
      /*$('#open-content').text($('.navigation-list a[href="' + window.location.hash + '"]').text()).addClass('active');*/
      /*$('.img-arrow, #main-content').fadeIn(function() {
        $("html,body").animate({
          scrollTop: $('#main-content').offset().top
        }, 600, function() {
        });
      });
*/
      if (window.location.hash == "#contact") {
        init_gmap();
      }
    }
  }
}

  

function init_gmap() {
  $('.map-area #map').remove();
  $('.map-area').append('<div id="map"></div>');
  setTimeout(function() {
    $('#map').gmap3({
      action: 'init',
      marker: {
        address: "Haltern am See, Weseler Str. 151",
        options: {
          icon: new google.maps.MarkerImage("./assets/images/marker.png")
        }
      },
      map: {
        options: {
          zoom: 14
        }
      }
    });
  }, 2000);
}

function resizeIframe() {
  var obj = document.getElementById("portfolio-iframe");
  var doc = obj.contentWindow.document;
      
  obj.style.height = Math.max(
  Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
  Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
  Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)) + 'px';
  console.log(doc.body.scrollHeight + 'px');
}

$(window).load(function() {
  $('.imgWrapper img').animate({opacity: '1.0'}, 1000, function() {
    $(this).css('filter', 'none');
  });
  resizeIframe();
});


$(function () {

    var resizeTimer = null;
    $(window).resize(function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            resizeIframe();
        }, 75);
    }).trigger("click");
});


