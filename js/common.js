$(document).ready(function () {
    const $pcGnb = $('#pcGnb > ul');
    $pcGnb.find('> li > ul').hide();
    $pcGnb.find('> li > a').on('mouseenter focus', function () {
        $pcGnb.find('> li.on').removeClass('on').children('ul').stop().slideUp();
        $(this).next().stop().slideDown().parent().addClass('on');
    });
    $pcGnb.on('mouseleave', function () {
        $pcGnb.find('> li.on').removeClass('on').children('ul').stop().slideUp();
    });
    $pcGnb.find('a:first').on('keydown', function (e) {
        console.log(e.keyCode);
        if (e.shiftKey && e.keyCode === 9) {
            $pcGnb.trigger('mouseleave');
        }
    });
    $pcGnb.find('a:last').on('keydown', function (e) {
        console.log(e.keyCode);
        if (!e.shiftKey && e.keyCode === 9) {
            $pcGnb.trigger('mouseleave');
        }
    });
    //3) 검색창 열기
    $('.header .search .search_open_btn').on('click', function () {
        const $header = $(this).closest('.header');
        //닫겨진 경우 => 열기
        if (!$(this).hasClass('on')) {
            //pc - window의 가로크기가 1080픽셀 보다 크다면
            if ($(window).width() > 1080) {
                $(this).addClass('on').next().stop().slideDown('fast', function () {
                    //검색창 닫기 텍스트 교체
                    //   $(this).prev().children().text('검색창 닫기');
                });
                //본문1에서 검색창 열기를 한 경우 .header.on 추가하기
                if (!$header.hasClass('active')) $header.addClass('on');
            } else { //모바일 - 열기만 가능함
                // 열려질 높이를 계산하자??
                const searchWrapHei = $('#mHeader .search_wrap').outerHeight();
                console.log(searchWrapHei);
                $(this).next().css('visibility', 'visible').stop().animate({
                    maxHeight: searchWrapHei
                }, 'fast');
            }
        }
        //열려진 경우 => 닫기 : pc에서만 가능
        else {
            if ($(window).width() > 1080) {
                $(this).removeClass('on').next().stop().slideUp('fast', function () {
                    //   $(this).prev().children().text('검색창 열기');
                });
            }
        }
    });
    //3-1) ★ 열기버튼에서 shift+tab을 눌러 이전으로 갈 경우 닫아주기
    $('.header .search .search_open_btn').on('keydown', function (e) {
        if ((e.shiftKey && e.keyCode === 9) && $(this).hasClass('on')) $(this).removeClass('on').next().stop().slideUp('fast');
    });

    //3-2) .search_wrap 닫기버튼 (.btn_close) 클릭 이벤트
    $('.header .search_wrap .search_close_btn').on('click', function () {
        const $header = $(this).closest('.header');
        //pc
        if ($(window).width() > 1080) {
            $(this).parent().stop().slideUp('fast', function () {
                //열기 버튼에.on 제거 후 포커스 강제 이동
                $(this).prev().removeClass('on').focus();

                //본문 1에 위치한 경우만 .header의 클래스명 .on을 제거
                if (!$header.hasClass('active')) $header.removeClass('on');
            });
        }
        //모바일, 태블릿
        else {
            $(this).parent().stop().animate({
                maxHeight: 0
            }, 'fast', function () {
                $(this).css('visibility', 'hidden').prev().focus();
            });
        }
    });

      //태블릿, 모바일
  $(window).on('scroll', function () {
    const scrollY = $(this).scrollTop();
    //console.log(scrollY);
    if (scrollY > 0) $('#mHeader').addClass('on');
    else $('#mHeader').removeClass('on');
  });

  //모바일 전체 메뉴 열기
  const $mgnbWrap = $('#mHeader .mGnb_wrap');
  $('#mHeader .gnb_open_btn').on('click', function () {
    const $first =  $mgnbWrap.find('.first');
    const $last =  $mgnbWrap.find('.last');
    const $openBtn = $(this); //닫기 버튼을 누른 경우 포커스 강제 이동

    $mgnbWrap.css('visibility', 'visible').stop().animate({left: 0}, 300, function () {
      $first.focus();  //포커스 아웃라인 안보인다
      $('html').css({overflowY: 'hidden', height: '100%'});
    });

    //키보드 제어 접근성 - keydown
    //$first에서 shift+tab 눌러 이전으로 나가는 경우 마지막으로 포커스 이동
    $first.on('keydown', function (e) {
      //console.log(e.keyCode);  //tab => 9
      if ( e.shiftKey && e.keyCode === 9 ) {
        e.preventDefault();
        $last.focus();
      }
    })

    //$last에서 (shift는 누르면 안됨)tab만 눌러 다음으로 나가는 경우 처음으로 포커스 이동
    $last.on('keydown', function (e) {
      if (!e.shiftKey && e.keyCode === 9) {
        e.preventDefault();
        $first.focus();
      }
    });

    //닫기 버튼 클릭으로 닫아주기 : animate() -> 완료함수 none, 열기버튼으로 포커스 강제 이동
    $mgnbWrap.find('.gnb_close_btn').on('click', function () {
      $('html').removeAttr('style');
      $('#mgnbDim').stop().fadeOut('fast', function () {
        $(this).remove();
      });

      $mgnbWrap.stop().animate({left: '-100%'}, 300, function () {
        $(this).css('visibility', 'hidden');
        $openBtn.focus();
        //열려진 #mGnb는 닫아준다 - 추가 - 연결해서 하자!
        $('#mGnb ul li.on').removeClass('on').children('ul').css({visibility: 'hidden', maxHeight: 0});
      });
    });
  });

  //#mGnb
  const $mGnb = $('#mGnb > ul');
  // $mGnb.find('.dep2, .dep3').hide(); //depth1 <a>를 클릭했을 경우 depth3는 숨겨진 채로 열리기위해 => css에서 제어함

  //모바일 네비게이션 클릭 이벤트 : 뎁스1과 뎁스2(.go를 가지지 않은) a
  $mGnb.find('a').on('click', function () {
    if ($(this).next().size() === 0) {	//하위에 뎁스 ul이 없는 경우
      return true;
    }else {								//하위에 뎁스 ul이 있는 경우
      //초기화 : 뎁스2, 뎁스3 동시에 addBack()로 제어 중..
      $(this).parent().siblings().find('> ul > li').addBack().removeClass('on').find('ul').stop().animate({maxHeight: 0}, function () {
        $(this).css('visibility', 'hidden');
      });

      
      //현재설정
      if ($(this).parent().hasClass('on')) { // 현재 열려진 상태인 경우
        $(this).parent().find('> ul > li').addBack().removeClass('on').find('ul').stop().animate({maxHeight: 0}, 800, function () {
          $(this).css('visibility', 'hidden');
        });
      } else { // 현재 닫겨진 상태인 경우
        $(this).next().css('visibility', 'visible').stop().animate({maxHeight: 500}, 800).parent().toggleClass('on');
      }
    }

    return false;
  });
});