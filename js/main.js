$(document).ready(function () {
  const swiper = new Swiper('#mainVisual .swiper-container', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    autoplay: {
      delay: 1000,
    },
    a11y: {
      firstSlideMessage: '첫번째 슬라이드',
      lastSlideMessage: '마지막 슬라이드',
    },
    navigation:false
  });
    $('#mainVisual .controller .swiper-auto-wrap button').on('click',function(){
      const btnNum = $(this).index();
      console.log(btnNum);
      if (btnNum === 0) swiper.autoplay.start();
      else swiper.autoplay.stop();
      $(this).addClass('hidden').siblings().removeClass('hidden');
    })
});