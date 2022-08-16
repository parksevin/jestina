(($)=>{



   class Jestina {
    init(){
        this.header();
        this.section1();
        this.section2();
        this.section3();
        this.section4();
        this.section5();
        this.section6();
        this.footer();
        this.gotop();
    }

    header(){


        $(window).resize(function(){
            resizeNav();
        });

        function resizeNav(){
            if($(window).width()<=940){
                $('.mobile-btn').removeClass('on');
                $('#nav').stop().hide();              
            }
            else {
                $('.mobile-btn').removeClass('on');
                $('#nav').stop().show();
            }
        }


        //모바일-햄버거메뉴

        $('.mobile-btn').on({
            click: function(){
                $(this).toggleClass('on');
                $('#nav').stop().slideToggle(300);
                $('.nav-bg').toggleClass('on');
            },
            focusin: function(){
                $(this).toggleClass('on');
                $('#nav').stop().slideToggle(300);
                $('.nav-bg').toggleClass('on');
            }
        });




        $('.main-btn').on({
            click: function(){
                $(this).toggleClass('on');
                $(this).toggleClass('m-on');
                $(this).next().toggleClass('m-on');
            },
            focusin: function(){
                $(this).toggleClass('on');
                $(this).toggleClass('m-on');
                $(this).next().toggleClass('m-on');
            }
        });

        $('.sub-menu-btn').on({
            click: function(){
                $(this).next().toggleClass('on');
            },
            focusin: function(){
                $(this).next().toggleClass('on');
            }
        })




        //모바일-검색창
        $('.m-serch-btn').on({
            click: function(){
                $('.m-serch-bar').toggleClass('on');
            },
            focusin: function(){
                $('.m-serch-bar').toggleClass('on');
            }
        });


        //메인메뉴
        $('.main-btn').on({
            mouseenter: function(){

                $('.sub').removeClass('on');

                $('.nav-bg').addClass('on');
                $(this).next().addClass('on');
            },
            focusin: function(){

                $('.sub').removeClass('on');

                $('.nav-bg').addClass('on');
                $(this).next().addClass('on');
            }
        });

        $('#header').on({  
            mouseleave: function(){
                $('.sub').removeClass('on');
                $('.nav-bg').removeClass('on');
                $('.main-btn').removeClass('on');
            },
            focusout: function(){
                $('.sub').removeClass('on');
                $('.nav-bg').removeClass('on');
                $('.main-btn').removeClass('on');
            }
        });

        //스크롤

        let result = '';
        let newTop = $(window).scrollTop();
        let oldTop = newTop;  

        $(window).scroll(()=>{
            
            newTop = $(window).scrollTop();
            result = oldTop - newTop > 0 ? 'UP':'DOWN';
            oldTop = newTop;
            
            if(result==='UP'){
                $('#header').removeClass('hide');
                $('#header').addClass('show');
            }

            if(result==='DOWN'){
                $('#header').removeClass('show');
                $('#header').addClass('hide');
                $('#nav').addClass('on');
            }
            if($(window).scrollTop()===0) {
                $('#header').removeClass('show');
            }


        });

    }
    section1(){



        //메인슬라이드

        let cnt = 0;
        let setId = 0;
        let setId2 = 0;

        //1. 메인
        function mainSlide(){
            $('.slide-wrap').stop().animate({left: `${-100*cnt}%`}, 500, function(){
                cnt>2 ? cnt=0:cnt;
                cnt<0 ? cnt=2:cnt;
                $('.slide-wrap').stop().animate({left: `${-100*cnt}%`}, 0);
            });
            pageBtn();
        }

        //2. 다음/이전
        function nextCount(){
            cnt++;
            mainSlide();
        }
        function prevCount(){
            cnt--;
            mainSlide();
        }

        //3-1. 타이머
        function autoTimer(){
            setId = setInterval(nextCount,3000);
        }
        autoTimer();

        //3-2. 정지
        function pause(){
            let tcnt=0;
            clearInterval(setId);
            clearInterval(setId2);
            setId2 = setInterval(function(){
                tcnt++;
                if(tcnt>=5){
                    clearInterval(setId);
                    clearInterval(setId2);
                    autoTimer();
                }
            });
        }


        //화살표 클릭
        $('.next-btn').click(function(){
            if($('.slide-wrap').is(':animated')){
                return;
            }
            pause();
            nextCount();
        });
        $('.prev-btn').click(function(){
            if($('.slide-wrap').is(':animated')){
                return;
            }
            pause();
            prevCount();
        });


        //하단 페이지 버튼
        function pageBtn (){
            $('.page-btn').removeClass('on');
            $('.page-btn').eq(cnt>2?0:cnt).addClass('on');
        }

        $('.page-btn').each(function(idx){
            $(this).click(function(){
                cnt=idx;
                pause();
                mainSlide();
            });
        });

        
        //반응형
        $(window).resize(function(){  
            winW = $(window).width();
            return winW;                   
        });


        //터치슬라이드
        let touchStart = null;
        let touchEnd = null;
        let result = '';
        let dragStart = null;
        let dragEnd = null;
        let mouseDown = false;
        let winW = $(window).width(); 

        $('.slide-view').on({
            mousedown: function(e){ 
            
              pause();
              touchStart = e.clientX;
              dragStart = e.clientX-$('.slide-wrap').offset().left-winW;  
              mouseDown = true;

            },
            mouseup: function(e){ 

              touchEnd = e.clientX;
              result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';

              if( Math.abs(touchStart-touchEnd) > 0){
                 if(result==='PREV'){
                     if(!$('.slide-wrap').is(':animated')){
                        prevCount();
                        pause();
                     }            
                   }
                 if(result==='NEXT'){
                     if(!$('.slide-wrap').is(':animated')){
                        nextCount();
                        pause();         
                     }
                   }
              }

              mouseDown = false;

            },
            mouseleave: function(e){ 
              if(!mouseDown) {return;}

                touchEnd = e.clientX;
                result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';

                if(Math.abs(touchStart-touchEnd) > 0){
                    if(result==='PREV'){
                        if(!$('.slide-wrap').is(':animated')){
                            prevCount(); 
                            pause(); 
                        }                
                      }
                    if(result==='NEXT'){
                        if(!$('.slide-wrap').is(':animated')){  
                            nextCount();  
                            pause();         
                        }
                      }
                 }

                 mouseDown = false;

            },
            mousemove: function(e){
              if(!mouseDown) return; 
              dragEnd = e.clientX;
              $('.slide-wrap').css({left: dragEnd-dragStart }); 
            }
        });

        //모바일터치
        $('.slide-view').on({
            touchstart: function(e){ 
            
              pause();
              touchStart = e.originalEvent.changedTouches[0].clientX;
              dragStart = e.originalEvent.changedTouches[0].left-winW;  
              mouseDown = true;

            },
            touchend: function(e){ 

              touchEnd = e.originalEvent.changedTouches[0].clientX;
              result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';

              if( Math.abs(touchStart-touchEnd) > 0){
                 if(result==='PREV'){
                     if(!$('.slide-wrap').is(':animated')){
                        prevCount();
                        pause();
                     }            
                   }
                 if(result==='NEXT'){
                     if(!$('.slide-wrap').is(':animated')){
                        nextCount();
                        pause();         
                     }
                   }
              }

              mouseDown = false;

            },
        
            touchmove: function(e){
              if(!mouseDown) return; 
              dragEnd = e.originalEvent.changedTouches[0].clientX;
              $('.slide-wrap').css({left: dragEnd-dragStart }); 
            }
        });



        
    }
    section2(){}
    
    section3(){

        //sec3 슬라이드

        //1.슬라이드

        let sec3cnt = 0;
        let msec3cnt = 0;
        let setId = 0;
        let setId2 = 0;


        function sec3Slide(){
            if($(window).width()<=400){
                $('.m-sec3-hover-menu').hide();
                $('.m-sec3-hover-menu').eq(msec3cnt).css({zIndex:11}).hide();
                $('.m-sec3-hover-menu').eq(msec3cnt).css({zIndex:11}).show();
                $('.m-sec3-hover-menu').eq(msec3cnt==0?11:msec3cnt-1).css({zIndex:12}).hide();
            }
            else {
                $('.sec3-slide').hide();
                $('.sec3-slide').eq(sec3cnt).css({zIndex:2}).hide();
                $('.sec3-slide').eq(sec3cnt).css({zIndex:2}).show();
                $('.sec3-slide').eq(sec3cnt==0?2:sec3cnt-1).css({zIndex:3}).hide();
            }
        pageBtn();
        mpageBtn()   
        }
        
        //2.다음/이전

        function nextCount(){
            sec3cnt++;
            msec3cnt++;
            sec3cnt>2?sec3cnt=0:sec3cnt;
            msec3cnt>11?msec3cnt=0:msec3cnt;
            sec3Slide();
        }
        function prevCount(){
            sec3cnt--;
            msec3cnt--;
            sec3cnt<0?sec3cnt=2:sec3cnt;
            msec3cnt>11?msec3cnt=0:msec3cnt;
            sec3Slide();
        }

        //3.타이머

        function autoTimer(){
            setId = setInterval(nextCount,4000);
        }
        autoTimer();

        //4.정지

        function pause(){
            let tcnt=0;
            clearInterval(setId);
            clearInterval(setId2);
            setId2 = setInterval(function(){
                tcnt++;
                if(tcnt>=5){
                    clearInterval(setId);
                    clearInterval(setId2);
                    autoTimer();
                }
            });
        }

        //5.화살표버튼

        $('.sec3-prve-btn').click(function(){
            if($('.sec3-menu-wrap').is('.animated')){
                return;
            }
            if($('.m-sec3-menu').is('.animated')){
                return;
            }
            pause();
            prevCount();
        });

        $('.sec3-next-btn').click(function(){
            if($('.sec3-menu-wrap').is('.animated')){
                return;
            }
            if($('.m-sec3-menu').is('.animated')){
                return;
            }
            pause();
            nextCount();
        });

        //6. 페이지버튼

        function pageBtn(){
            $('.sec3-page-btn').removeClass('on');
            $('.sec3-page-btn').eq(sec3cnt>2?0:sec3cnt).addClass('on');
         }
            $('.sec3-page-btn').each(function(idx){
                $(this).click(function(){
                    sec3cnt=idx;
                    pause();
                    sec3Slide();
                });
            });

            function mpageBtn(){
                $('.m-sec3-page-btn').removeClass('on');
                $('.m-sec3-page-btn').eq(msec3cnt>11?0:msec3cnt).addClass('on');
             }
                $('.m-sec3-page-btn').each(function(idx){
                    $(this).click(function(){
                        msec3cnt=idx;
                        pause();
                        sec3Slide();
                    });
                });



            //sec3메뉴 호버

            $('.sec3-hover-menu').on({
                mouseenter: function(){
                    $('.sec3-hover-menu').removeClass('on');
                    $(this).addClass('on');
                }
            });

            $('.sec3-hover-menu').on({
                mouseleave: function(){
                    $('.sec3-hover-menu').removeClass('on');
                }
            });

            //sec3 모바일 메뉴호버
            $('.m-sec3-hover-menu').on({
                mouseenter: function(){
                    $('.m-sec3-hover-menu').removeClass('on');
                    $(this).addClass('on');
                }
            });

            $('.m-sec3-hover-menu').on({
                mouseleave: function(){
                    $('.m-sec3-hover-menu').removeClass('on');
                }
            });


        //탑값
        //스크롤 이벤트

        let winH = $(window).height();


        let sec3Top1 = $('.sec3-title').offset().top-winH;
        $(window).scroll(function(){
            if( $(window).scrollTop() > sec3Top1 ){
                $('.sec3-title').addClass('scrollSec3Ani');
                return;
            }
            if( $(window).scrollTop()===0){
                $('.sec3-title').removeClass('scrollSec3Ani')
                return;
            }
        });

        let sec3Top2 = $('.sec3top').offset().top-winH;

            $(window).scroll(function(){
                if( $(window).scrollTop() > sec3Top2 ){
                    $('.sec3top').addClass('scrollSec3Ani');
                    return;
                }
                if( $(window).scrollTop()===0){
                    $('.sec3top').removeClass('scrollSec3Ani')
                    return;
                }
            });
        
        let sec3Top3 = $('.sec3bottom').offset().top-winH;
        $(window).scroll(function(){
            if( $(window).scrollTop() > sec3Top3 ){
                $('.sec3bottom').addClass('scrollSec3Ani');
                return;
            }
            if( $(window).scrollTop()===0){
                $('.sec3bottom').removeClass('scrollSec3Ani')
                return;
            }
        });


        //반응형 터치슬라이드

        let touchStart = null;
        let touchEnd = null;
        let result = '';
        let dragStart = null;
        let dragEnd = null;
        let mouseDown = false;

        $('.sec3-menu-view').on({
            mousedown: function(e){ 
            
              pause();
              touchStart = e.clientX;
              dragStart = e.clientX-$('.sec3-menu-wrap').offset()
              mouseDown = true;

            },
            mouseup: function(e){ 

              touchEnd = e.clientX;
              result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';

              if( Math.abs(touchStart-touchEnd) > 0){
                 if(result==='PREV'){
                     if(!$('.sec3-menu-wrap').is(':animated')){
                        prevCount();
                        pause();
                     }            
                   }
                 if(result==='NEXT'){
                     if(!$('.sec3-menu-wrap').is(':animated')){
                        nextCount();
                        pause();         
                     }
                   }
              }

              mouseDown = false;

            },
            mouseleave: function(e){ 
              if(!mouseDown) {return;}

                touchEnd = e.clientX;
                result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';

                if(Math.abs(touchStart-touchEnd) > 0){
                    if(result==='PREV'){
                        if(!$('.sec3-menu-wrap').is(':animated')){
                            prevCount(); 
                            pause(); 
                        }                
                      }
                    if(result==='NEXT'){
                        if(!$('.sec3-menu-wrap').is(':animated')){  
                            nextCount();  
                            pause();         
                        }
                      }
                 }

                 mouseDown = false;

            },
            mousemove: function(e){
              if(!mouseDown) return; 
              dragEnd = e.clientX;
              $('.sec3-menu-wrap').css({left: dragEnd-dragStart }); 
            }
        });

        //모바일 터치

        $('.sec3-menu-view').on({
            touchstart: function(e){ 
            
              pause();
              touchStart = e.originalEvent.changedTouches[0].clientX;
              dragStart = e.originalEvent.changedTouches[0].clientX-$('.sec3-menu-wrap').offset()
              mouseDown = true;

            },
            touchend: function(e){ 

              touchEnd = e.originalEvent.changedTouches[0].clientX;
              result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';

              if( Math.abs(touchStart-touchEnd) > 0){
                 if(result==='PREV'){
                     if(!$('.sec3-menu-wrap').is(':animated')){
                        prevCount();
                        pause();
                     }            
                   }
                 if(result==='NEXT'){
                     if(!$('.sec3-menu-wrap').is(':animated')){
                        nextCount();
                        pause();         
                     }
                   }
              }

              mouseDown = false;

            },
    
            touchmove: function(e){
              if(!mouseDown) return; 
              dragEnd = e.originalEvent.changedTouches[0].clientX;
              $('.sec3-menu-wrap').css({left: dragEnd-dragStart }); 
            }
        });

        //모바일 터치슬라이드

        $('.m-sec3-menu-box').on({
            touchstart: function(e){ 
            
              pause();
              touchStart = e.originalEvent.changedTouches[0].clientX;
              dragStart = e.originalEvent.changedTouches[0].clientX-$('.m-sec3-menu').offset();
              mouseDown = true;

            },
            touchend: function(e){ 

              touchEnd = e.originalEvent.changedTouches[0].clientX;
              result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';

              if( Math.abs(touchStart-touchEnd) > 0){
                 if(result==='PREV'){
                     if(!$('.m-sec3-menu').is(':animated')){
                        prevCount();
                        pause();
                     }            
                   }
                 if(result==='NEXT'){
                     if(!$('.m-sec3-menu').is(':animated')){
                        nextCount();
                        pause();         
                     }
                   }
              }

              mouseDown = false;

            },
            touchmove: function(e){
              if(!mouseDown) return; 
              dragEnd = e.originalEvent.changedTouches[0].clientX;
              $('.m-sec3-menu').css({left: dragEnd-dragStart }); 
            }
        });


        }

    section4(){

                //터치슬라이드
                let touchStart = null;
                let touchEnd = null;
                let result = '';
                let dragStart = null;
                let dragEnd = null;
                let mouseDown = false;
                let winW = $('.sec4-menu-wrap li').width(); 

                $('.sec4menu-view').on({
                    mousedown: function(e){ 
                    
                      pause();
                      touchStart = e.clientX;
                      dragStart = e.clientX-$('.sec4-menu-wrap').offset().left-(`${-75*cnt}%`);  
                      mouseDown = true;
        
                    },
                    mouseup: function(e){ 
        
                      touchEnd = e.clientX;
                      result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
        
                      if( Math.abs(touchStart-touchEnd) > 0){
                         if(result==='PREV'){
                             if(!$('.sec4-menu-wrap').is(':animated')){
                                prevCount();
                                pause();
                             }            
                           }
                         if(result==='NEXT'){
                             if(!$('.sec4-menu-wrap').is(':animated')){
                                nextCount();
                                pause();         
                             }
                           }
                      }
        
                      mouseDown = false;
        
                    },
                    mouseleave: function(e){ 
                      if(!mouseDown) {return;}
        
                        touchEnd = e.clientX;
                        result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
        
                        if(Math.abs(touchStart-touchEnd) > 0){
                            if(result==='PREV'){
                                if(!$('.sec4-menu-wrap').is(':animated')){
                                    prevCount(); 
                                    pause(); 
                                }                
                              }
                            if(result==='NEXT'){
                                if(!$('.sec4-menu-wrap').is(':animated')){  
                                    nextCount();  
                                    pause();         
                                }
                              }
                         }
        
                         mouseDown = false;
        
                    },
                    mousemove: function(e){
                      if(!mouseDown) return; 
                      dragEnd = e.clientX;
                      $('.sec4-menu-wrap').css({left: dragEnd-dragStart }); 
                    }
                });

                //모바일 터치

                $('.sec4menu-view').on({
                    touchstart: function(e){ 
                    
                      pause();
                      touchStart = e.originalEvent.changedTouches[0].clientX;
                      dragStart = e.originalEvent.changedTouches[0].clientX-$('.sec4-menu-wrap').offset().left-(`${-75*cnt}%`);  
                      mouseDown = true;
        
                    },
                    touchend: function(e){ 
        
                      touchEnd = e.originalEvent.changedTouches[0].clientX;
                      result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
        
                      if( Math.abs(touchStart-touchEnd) > 0){
                         if(result==='PREV'){
                             if(!$('.sec4-menu-wrap').is(':animated')){
                                prevCount();
                                pause();
                             }            
                           }
                         if(result==='NEXT'){
                             if(!$('.sec4-menu-wrap').is(':animated')){
                                nextCount();
                                pause();         
                             }
                           }
                      }
        
                      mouseDown = false;
        
                    },
                   
                    touchmove: function(e){
                      if(!mouseDown) return; 
                      dragEnd = e.originalEvent.changedTouches[0].clientX;
                      $('.sec4-menu-wrap').css({left: dragEnd-dragStart }); 
                    }
                });
        

        //모바일 셀렉트박스

        $('#sec4-m-nav').change(function(){
            var check = $('#sec4-m-nav option:selected').val();
            console.log(check);

            if( check === 'option0') {
                $('.sec4menu-view').removeClass('on');
                $('.sec4option0').addClass('on');
            }

            if( check === 'option1') {
                $('.sec4menu-view').removeClass('on');
                $('.sec4option1').addClass('on');
            }

            if( check === 'option2') {
                $('.sec4menu-view').removeClass('on');
                $('.sec4option2').addClass('on');
            }
            
            if( check === 'option3') {
                $('.sec4menu-view').removeClass('on');
                $('.sec4option3').addClass('on');
            }
            
            if( check === 'option4') {
                $('.sec4menu-view').removeClass('on');
                $('.sec4option4').addClass('on');
            }
            
            if( check === 'option5') {
                $('.sec4menu-view').removeClass('on');
                $('.sec4option5').addClass('on');
            }
            
            if( check === 'option6') {
                $('.sec4menu-view').removeClass('on');
                $('.sec4option6').addClass('on');
            }
            
        });
        
         

         //탑값
        //스크롤 이벤트

        let winH = $(window).height();

        let sec4Top = $('#section4').offset().top-winH;

        $(window).scroll(function(){
            if( $(window).scrollTop() > sec4Top ){
                $('#section4').addClass('scrollSec4Ani');
                return;
            }
            if ( $(window).scrollTop() === 0){
                $('#section4').removeClass('scrollSec4Ani');
                return;
            }
        });



        //sec4메뉴 호버박스(장바구니,위시)

        $('.sec4-hover-menu').on({
            mouseenter: function(){
                $('.sec4-hover-menu').removeClass('on');
                $(this).addClass('on');
            }
        });

        $('.sec4-hover-menu').on({
            mouseleave: function(){
                $('.sec4-hover-menu').removeClass('on');
            }
        });

        //sec4 대메뉴 클릭
        $('.sec4menu-btn').on({
            click: function(e){
                e.preventDefault();
                $('.sec4menu-btn').removeClass('on');
                $('.sec4menu-view').removeClass('on');
                $(this).next().addClass('on');
                $(this).addClass('on');
                
            }
        });


        //모바일 슬라이드

        //슬라이드

        let cnt = 0;
        let setId = 0;
        let setId2 = 0;

        //1. 메인
        function sec4Slide(){
            if($(window).width()<=750){
                $('.sec4-menu-wrap').stop().animate({left: `${-50*cnt}%`},500, function(){
                    cnt>11 ? cnt=0:cnt;
                    cnt<0 ? cnt=11:cnt;
                    $('.sec4-menu-wrap').stop().animate({left: `${-50*cnt}%`}, 0);
                });
            }      
            else {
                $('.sec4-menu-wrap').stop().animate({left: `${-25*cnt}%`},500, function(){
                    cnt>11 ? cnt=0:cnt;
                    cnt<0 ? cnt=11:cnt;
                    $('.sec4-menu-wrap').stop().animate({left: `${-25*cnt}%`}, 0);
                });
            }    
            pageBtn();
        }

        //2. 다음/이전
        function nextCount(){
            cnt++;
            sec4Slide();
        }
        function prevCount(){
            cnt--;
            sec4Slide();
        }

        //3-1. 타이머
        function autoTimer(){
            setId = setInterval(nextCount,4000);
        }
        autoTimer();

        //3-2. 정지
        function pause(){
            let tcnt=0;
            clearInterval(setId);
            clearInterval(setId2);
            setId2 = setInterval(function(){
                tcnt++;
                if(tcnt>=5){
                    clearInterval(setId);
                    clearInterval(setId2);
                    autoTimer();
                }
            });
        }


        //화살표 클릭
        $('.sec4-next-btn').click(function(){
            if($('.sec4-menu-wrap').is(':animated')){
                return;
            }
            pause();
            nextCount();
        });
        $('.sec4-prev-btn').click(function(){
            if($('.sec4-menu-wrap').is(':animated')){
                return;
            }
            pause();
            prevCount();
        });

        //하단 페이지 버튼
        function pageBtn (){
                if(cnt>11){
                    $('.sec4-page-btn').removeClass('on');
                    $('.sec4-page-btn').eq( cnt>11 ? 0 : cnt).addClass('on');
                }
                else if (cnt<0){
                    $('.sec4-page-btn').addClass('on');
                }
                else {
                    $('.sec4-page-btn').removeClass('on');
                    $('.sec4-page-btn').eq(cnt>11 ? 0 : cnt).addClass('on');
                    $('.sec4-page-btn').eq(cnt<0 ? 11 : cnt).addClass('on');
                    $('.sec4-page-btn').eq(cnt+1).removeClass('on');
                }

              
        }

        $('.sec4-page-btn').each(function(idx){
            $(this).click(function(){
                cnt=idx;
                pause();
                sec4Slide();
            });
        });





    }
    section5(){

        //터치슬라이드
        let touchStart = null;
        let touchEnd = null;
        let result = '';
        let dragStart = null;
        let dragEnd = null;
        let mouseDown = false;
        let winW = $('.sec5-menu-wrap li').width(); 

        $('.sec5menu-view').on({
            mousedown: function(e){ 
            
              pause();
              touchStart = e.clientX;
              dragStart = e.clientX-$('.sec5-menu-wrap').offset().left-(`${-75*cnt}%`);  
              mouseDown = true;

            },
            mouseup: function(e){ 

              touchEnd = e.clientX;
              result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';

              if( Math.abs(touchStart-touchEnd) > 0){
                 if(result==='PREV'){
                     if(!$('.sec5-menu-wrap').is(':animated')){
                        prevCount();
                        pause();
                     }            
                   }
                 if(result==='NEXT'){
                     if(!$('.sec5-menu-wrap').is(':animated')){
                        nextCount();
                        pause();         
                     }
                   }
              }

              mouseDown = false;

            },
            mouseleave: function(e){ 
              if(!mouseDown) {return;}

                touchEnd = e.clientX;
                result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';

                if(Math.abs(touchStart-touchEnd) > 0){
                    if(result==='PREV'){
                        if(!$('.sec5-menu-wrap').is(':animated')){
                            prevCount(); 
                            pause(); 
                        }                
                      }
                    if(result==='NEXT'){
                        if(!$('.sec5-menu-wrap').is(':animated')){  
                            nextCount();  
                            pause();         
                        }
                      }
                 }

                 mouseDown = false;

            },
            mousemove: function(e){
              if(!mouseDown) return; 
              dragEnd = e.clientX;
              $('.sec5-menu-wrap').css({left: dragEnd-dragStart }); 
            }
        });

        //모바일 터치

        $('.sec5menu-view').on({
            touchstart: function(e){ 
            
              pause();
              touchStart = e.originalEvent.changedTouches[0].clientX;
              dragStart = e.originalEvent.changedTouches[0].clientX-$('.sec5-menu-wrap').offset().left-(`${-75*cnt}%`);  
              mouseDown = true;

            },
            touchend: function(e){ 

              touchEnd = e.originalEvent.changedTouches[0].clientX;
              result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';

              if( Math.abs(touchStart-touchEnd) > 0){
                 if(result==='PREV'){
                     if(!$('.sec5-menu-wrap').is(':animated')){
                        prevCount();
                        pause();
                     }            
                   }
                 if(result==='NEXT'){
                     if(!$('.sec5-menu-wrap').is(':animated')){
                        nextCount();
                        pause();         
                     }
                   }
              }

              mouseDown = false;

            },
            
            touchmove: function(e){
              if(!mouseDown) return; 
              dragEnd = e.originalEvent.changedTouches[0].clientX;
              $('.sec5-menu-wrap').css({left: dragEnd-dragStart }); 
            }
        });


        //모바일 셀렉트박스

        $('#sec5-m-nav').change(function(){
            var check = $('#sec5-m-nav option:selected').val();
            console.log(check);

            if( check === 'option0') {
                $('.sec5menu-view').removeClass('on');
                $('.sec5option0').addClass('on');
            }

            if( check === 'option1') {
                $('.sec5menu-view').removeClass('on');
                $('.sec5option1').addClass('on');
            }

            if( check === 'option2') {
                $('.sec5menu-view').removeClass('on');
                $('.sec5option2').addClass('on');
            }
            
            if( check === 'option3') {
                $('.sec5menu-view').removeClass('on');
                $('.sec5option3').addClass('on');
            }
            
            if( check === 'option4') {
                $('.sec5menu-view').removeClass('on');
                $('.sec5option4').addClass('on');
            }
            
            if( check === 'option5') {
                $('.sec5menu-view').removeClass('on');
                $('.sec5option5').addClass('on');
            }
            
            if( check === 'option6') {
                $('.sec5menu-view').removeClass('on');
                $('.sec5option6').addClass('on');
            }
            
        });


        //스크롤

        let winH = $(window).height();

        let sec4Top = $('#section5').offset().top-winH;

        $(window).scroll(function(){
            if( $(window).scrollTop() > sec4Top ){
                $('#section5').addClass('scrollSec5Ani');
                return;
            }
            if ( $(window).scrollTop() === 0){
                $('#section5').removeClass('scrollSec5Ani');
                return;
            }
        });

        //호버


        $('.sec5-hover-menu').on({
            mouseenter: function(){
                $('.sec5-hover-menu').removeClass('on');
                $(this).addClass('on');
            }
        });

        $('.sec5-hover-menu').on({
            mouseleave: function(){
                $('.sec5-hover-menu').removeClass('on');
            }
        });

        //sec5 대메뉴 클릭
        $('.sec5menu-btn').on({
            click: function(e){
                e.preventDefault();
                $('.sec5menu-btn').removeClass('on');
                $('.sec5menu-view').removeClass('on');
                $(this).next().addClass('on');
                $(this).addClass('on');
                
            }
        });


        //슬라이드

        //슬라이드

        let cnt = 0;
        let setId = 0;
        let setId2 = 0;

        //모바일슬라이드 +
          //1. 메인

        function sec5Slide(){
            if($(window).width()<=750){
                $('.sec5-menu-wrap').stop().animate({left: `${-50*cnt}%`},500, function(){
                    cnt>11 ? cnt=0:cnt;
                    cnt<0 ? cnt=11:cnt;
                    $('.sec5-menu-wrap').stop().animate({left: `${-50*cnt}%`}, 0);
                });
            }      
            else {
                $('.sec5-menu-wrap').stop().animate({left: `${-25*cnt}%`},500, function(){
                    cnt>11 ? cnt=0:cnt;
                    cnt<0 ? cnt=11:cnt;
                    $('.sec5-menu-wrap').stop().animate({left: `${-25*cnt}%`}, 0);
                });
            }    
            pageBtn();
        }


        //2. 다음/이전
        function nextCount(){
            cnt++;
            sec5Slide();
        }
        function prevCount(){
            cnt--;
            sec5Slide();
        }

        //3-1. 타이머
        function autoTimer(){
            setId = setInterval(nextCount,4000);
        }
        autoTimer();

        //3-2. 정지
        function pause(){
            let tcnt=0;
            clearInterval(setId);
            clearInterval(setId2);
            setId2 = setInterval(function(){
                tcnt++;
                if(tcnt>=5){
                    clearInterval(setId);
                    clearInterval(setId2);
                    autoTimer();
                }
            });
        }


        //화살표 클릭
        $('.sec5-next-btn').click(function(){
            if($('.sec5-menu-wrap').is(':animated')){
                return;
            }
            pause();
            nextCount();
        });
        $('.sec5-prev-btn').click(function(){
            if($('.sec5-menu-wrap').is(':animated')){
                return;
            }
            pause();
            prevCount();
        });



        //페이지버튼

        function pageBtn(){
            if(cnt>11){
                $('.sec5-page-btn').removeClass('on');
                $('.sec5-page-btn').eq( cnt>11 ? 0 : cnt).addClass('on');
            }
            else if (cnt<0){
                $('.sec5-page-btn').addClass('on');
            }
            else {
                $('.sec5-page-btn').removeClass('on');
                $('.sec5-page-btn').eq(cnt>11 ? 0 : cnt).addClass('on');
                $('.sec5-page-btn').eq(cnt<0 ? 11 : cnt).addClass('on');
                $('.sec5-page-btn').eq(cnt+1).removeClass('on');
            }

          
    }

    $('.sec5-page-btn').each(function(idx){
        $(this).click(function(){
            cnt=idx;
            pause();
            sec5Slide();
        });
    });


    }

    section6(){

        //회전

        $('.rotate-btn').on({
            mouseenter: function(){
                $(this).addClass('on');
            },
            mouseleave: function(){
                $(this).removeClass('on');
            },
            focusin: function(){
                $(this).addClass('on');
            },
            focusout: function(){
                $(this).removeClass('on');
            },
        });

        //스크롤

        let winH = $(window).height();

        let sec4Top = $('#section6').offset().top-winH;

        $(window).scroll(function(){
            if( $(window).scrollTop() > sec4Top ){
                $('#section6').addClass('scrollSec6Ani');
                return;
            }
            if ( $(window).scrollTop() === 0){
                $('#section6').removeClass('scrollSec6Ani');
                return;
            }
        });


    }
    footer(){}
    gotop(){
        

        //퀵박스

        let quickTop = ($(window).height()-$('#quickbox').height())/2-100;

        $(window).scroll(function(){
          $('#quickbox').stop().animate({top: quickTop+$(window).scrollTop() }, 300, 'easeOutExpo');
      });


      //탑박스


      $(window).scroll(function(){
        if($(window).scrollTop()>630){
           $('#quickbox').addClass('on');
        }
        else{
          $('#quickbox').removeClass('on');
        }
    });

    $('.gotop-btn').on({
      click: function(){
          $('html, body').stop().animate({scrollTop: 0 }, 600);
      }
    });


    }




   }

   const newJestina = new Jestina();
   newJestina.init();










})(jQuery);