$(function () {


function loadSlickAssets(callback) {
  // すでに読み込み済みならスキップ
  if (window.slickLoaded) {
    callback();
    return;
  }
  window.slickLoaded = true;

  // CSSを動的に読み込む
  const css1 = document.createElement('link');
  css1.rel = 'stylesheet';
  css1.href = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css';
  document.head.appendChild(css1);

  const css2 = document.createElement('link');
  css2.rel = 'stylesheet';
  css2.href = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css';
  document.head.appendChild(css2);

  // JS読み込み
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js';
  script.onload = () => {
    callback(); 
  };
  document.body.appendChild(script);
}

function initSlickSliders() {
  const $box1 = $('.popular_smartphone_top3 .slick-box');
  if ($box1.length && !$box1.hasClass('slick-initialized')) {
    $box1.slick({
      autoplay: true,
      autoplaySpeed: 3000,
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '10%'
    });
  }

  $('.popular_model .slick-box2').each(function () {
    const $el = $(this);
    if (!$el.hasClass('slick-initialized')) {
      $el.slick({
        infinite: false,
        autoplay: false,
        arrows: true,
        prevArrow: '<img src="img/prev-arrow.png" class="slick-prev" alt="前へ">',
        nextArrow: '<img src="img/next-arrow.png" class="slick-next" alt="次へ">',
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1
      });
    }
  });
}

// 例えばスクロールしたタイミングで呼ぶ
let slickTriggered = false;
window.addEventListener('scroll', () => {
  const section = document.querySelector('.popular_smartphone_top3');
  if (!section || slickTriggered) return;

  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    slickTriggered = true;
    loadSlickAssets(initSlickSliders); // 遅延読み込みして初期化
  }
});

function initSlickSliders() {
  // popular_smartphone_top3 初期化
  const $box1 = $('.popular_smartphone_top3 .slick-box');
  if ($box1.length && !$box1.hasClass('slick-initialized')) {
    $box1.slick({
      autoplay: true,
      autoplaySpeed: 3000,
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '10%'
    });

    // モーダル処理をここで再登録
    const imageMap = {
      'img/top3-1.webp': 'img/IPhone16_128GB.webp',
      'img/top3-2.webp': 'img/AQUOSwish4_rev01.webp',
      'img/top3-3.webp': 'img/iPhoneSE_rev13.webp'
    };

    const link = "https://houjinsp-online.com/contact.php";

    $('.slick__item a').on('click', function (event) {
      event.preventDefault();
      let clickedImgSrc = $(this).find('img').attr('src');
      let modalImgSrc = imageMap[clickedImgSrc];

      if (modalImgSrc) {
        $('#modal-image').attr('src', modalImgSrc);
        $('#modal-image').data('link', link);
        $('.modal').addClass('show');
      }
    });

    $('.modal').on('click', function () {
      $('.modal').removeClass('show');
    });

    $('#modal-image').on('click', function (event) {
      event.stopPropagation();
      let link = $(this).data('link');
      if (link) {
        window.location.href = link;
      }
    });
  }

  // popular_model 初期化
  $('.popular_model .slick-box2').each(function () {
    const $slider = $(this);

    if (!$slider.hasClass('slick-initialized')) {
      $slider.slick({
        infinite: false,
        autoplay: false,
        arrows: true,
        prevArrow: '<img src="img/prev-arrow.png" class="slick-prev" alt="前へ">',
        nextArrow: '<img src="img/next-arrow.png" class="slick-next" alt="次へ">',
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1
      });

      // スライドの最初/最後にループ処理を追加
      $slider.on("afterChange", function (event, slick, currentSlide) {
        const $prev = $(this).closest('.popular_model_item').find('.slick-prev');
        const $next = $(this).closest('.popular_model_item').find('.slick-next');

        // 一旦前のイベント削除（重複防止）
        $prev.off('click.loop');
        $next.off('click.loop');

        if (currentSlide === 0) {
          $prev.on("click.loop", function () {
            $slider.slick("slickGoTo", slick.slideCount - 1);
          });
        } else if (currentSlide === slick.slideCount - 1) {
          $next.on("click.loop", function () {
            $slider.slick("slickGoTo", 0);
          });
        }
      });
    }
  });
}

  

  // price_simulationのボタンを押したらスムーススクロール
 $('a[href^="#"]').click(function () {
  let href = $(this).attr("href");
  
  let target = $(href == "#" || href == "" ? "html" : href);
 
  let position = target.offset().top;
  
  $("html, body").animate({ scrollTop: position }, 600, "swing");
  
  return false; 
});



// よくあるご質問
$('.qa-title').on('click', function() {
  var findElm = $(this).next(".qa-box");
  $(findElm).slideToggle();
    
  if($(this).hasClass('close')){
    $(this).removeClass('close');
  }else{
    $(this).addClass('close');
  }
});



// 下の固定メニューをスクロールしたら表示
$(window).on('scroll', function() {
  if ($(window).scrollTop() > $(window).height()) { 
      $('.fixed_menu').addClass('show'); 
  } else {
      $('.fixed_menu').removeClass('show'); 
  }
});





  // スクロール時のイベント
  $(window).scroll(function () {


    $(".fadein").each(function () {

      let scroll = $(window).scrollTop();

      let target = $(this).offset().top;

      let windowHeight = $(window).height();

      if (scroll > target - windowHeight + 200) {

        
        $(this).css("opacity", "1");
        $(this).css("transform", "translateY(0)");
      }
    });

  });


});