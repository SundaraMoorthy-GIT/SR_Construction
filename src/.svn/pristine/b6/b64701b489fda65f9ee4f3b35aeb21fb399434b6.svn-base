(function($){
	"use strict";
        // Header Sticky
        //$('.top-navbar').addClass("is-sticky");
		$(window).on('scroll',function() {
            if ($(this).scrollTop() > 30){  
              //  $('.top-navbar').addClass("is-sticky");
            }
            else{
//$('.top-navbar').removeClass("is-sticky");
            }
        });

        $('#pay_box').on('shown.bs.modal', function () {
           
            $('.txt_cash1').focus();
            $('.txt_cash1').select();
        });


        $(document).on('click', '.dropdown .dropdown-menu .area', function (e) {
            

            e.stopPropagation();
          });


      /*  var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {

            if( screen.width <=500)
            {
        var currentScrollPos = window.pageYOffset;
          if (prevScrollpos > currentScrollPos) {
            document.getElementById("navbar").style.top = "0";
          } else {
            document.getElementById("navbar").style.top = "-50px";
          }
          prevScrollpos = currentScrollPos;
        }
    }*/

    

    $(".serch_icon").click(function(){
        
        $(".show_bar").removeClass("disp_none");
        $(".show_bar").removeClass("mhide");
        $(".show_bar").addClass("disp");
        $(".mobile_hide").addClass("mar_45");

    });

    
    $(".Entry").hide();
  
    

    $(".burger-menu").click(function(){

        if($(".burger-menu").hasClass("active"))
        {
        $(".w_79").addClass("hide_w_79");
        }
        else
        {$(".w_79").removeClass("hide_w_79");

        }
       

    });

    $(".search_back").click(function(){

        $(".show_bar").addClass("mhide");
        $(".show_bar").addClass("disp_none");
        $(".mobile_hide").removeClass("mar_45");

    });

        $(".search_btn").click(function(){
        
         
            $("#Customer_Search_bar").focus();
        });

        $(".isearch_btn").click(function(){
        
         
            $("#item_Search_bar").focus();
        });

       $(".sbtn").click(function(){
       
            $(".afocus").focus();
        });

        
  
        

         $('.in').keydown(function (e) {
            if (e.which === 13) {
                var index = $('.in').index(this) + 1;
                $('.in').eq(index).focus();
            }
        });


        $('body').on('keydown', 'input,a, select', function (e) {

           
            if (e.keyCode == 13) {
               
                var self = $(this), form = self.parents('form:eq(0)'), focusable, next;

                focusable = form.find('input,a,select,button').filter(':visible');
                   next = focusable.eq(focusable.index(this) + 1);
                if (next.length) {
                    next.focus();
                } else {
                    //   form.submit();
                    
                }
                return false;
            }
        });

		// Tooltip JS
		$(function () {
            $('[data-toggle="tooltip"]').tooltip();
            
            $('[data-toggle="tooltip"]').tooltip({
                trigger: 'hover'
              });
              $('[data-toggle="tooltip"]').on('mouseleave', function () {
                $(this).tooltip('dispose');
              });
              $('[data-toggle="tooltip"]').on('click', function () {
                $(this).tooltip('dispose');
              });
		});

		// Popovers JS
		$(function () {
			$('[data-toggle="popover"]').popover()
        });
        
        

		// Metis Menu JS
		$(function () {
			$('#sidemenu-nav').metisMenu();
		});
		
		// Summernote JS
		$('.summernote').summernote({
			height: 230,                 // Set editor height
			minHeight: null,             // Set minimum height of editor
			maxHeight: null,             // Set maximum height of editor
			focus: false                 // Set focus to editable area after initializing summernote
		});

		// Progress Bar
		if($('.progress-line').length){
			$('.progress-line').appear(function(){
				var el = $(this);
				var percent = el.data('width');
				$(el).css('width',percent+'%');
			},{accY: 0});
		}
		if($('.count-box').length){
			$('.count-box').appear(function(){
				var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);

				if (!$t.hasClass("counted")) {
					$t.addClass("counted");
					$({
						countNum: $t.find(".count-text").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function() {
							$t.find(".count-text").text(Math.floor(this.countNum));
						},
						complete: function() {
							$t.find(".count-text").text(this.countNum);
						}
					});
				}
				
			},{accY: 0});
		}

		// FAQ Accordion
        $(function() {
            $('.accordion').find('.accordion-title').on('click', function(){
                // Adds Active Class
                $(this).toggleClass('active');
                // Expand or Collapse This Panel
                $(this).next().slideToggle('fast');
                // Hide The Other Panels
                $('.accordion-content').not($(this).next()).slideUp('fast');
                // Removes Active Class From Other Titles
                $('.accordion-title').not($(this)).removeClass('active');		
            });
		});

		// initialize clipboard plugin
		if ($('.btn-clipboard').length) {
			var clipboard = new ClipboardJS('.btn-clipboard');

		
	
		}

		// Gallery Viewer JS
        var console = window.console || { log: function () {} };
        var $images = $('.gallery-area');
        var $toggles = $('.gallery-toggles');
        var $buttons = $('.gallery-buttons');
        var options = {
            // inline: true,
            url: 'data-original',
            ready: function (e) {
                console.log(e.type);
            },
            show: function (e) {
                console.log(e.type);
            },
            shown: function (e) {
                console.log(e.type);
            },
            hide: function (e) {
                console.log(e.type);
            },
            hidden: function (e) {
                console.log(e.type);
            },
            view: function (e) {
                console.log(e.type);
            },
            viewed: function (e) {
                console.log(e.type);
            }
        };
        function toggleButtons(mode) {
            if (/modal|inline|none/.test(mode)) {
            $buttons
                .find('button[data-enable]')
                .prop('disabled', true)
                .filter('[data-enable*="' + mode + '"]')
                .prop('disabled', false);
            }
        }
        $images.on({
            ready:  function (e) {
                console.log(e.type);
            },
            show:  function (e) {
                console.log(e.type);
            },
            shown:  function (e) {
                console.log(e.type);
            },
            hide:  function (e) {
                console.log(e.type);
            },
            hidden: function (e) {
                console.log(e.type);
            },
            view:  function (e) {
                console.log(e.type);
            },
            viewed: function (e) {
                console.log(e.type);
            }
        }).viewer(options);
        toggleButtons(options.inline ? 'inline' : 'modal');
        $toggles.on('change', 'input', function () {
            var $input = $(this);
            var name = $input.attr('name');
            options[name] = name === 'inline' ? $input.data('value') : $input.prop('checked');
            $images.viewer('destroy').viewer(options);
            toggleButtons(options.inline ? 'inline' : 'modal');
        });
        $buttons.on('click', 'button', function () {
            var data = $(this).data();
            var args = data.arguments || [];
            if (data.method) {
                if (data.target) {
                    $images.viewer(data.method, $(data.target).val());
                } else {
                    $images.viewer(data.method, args[0], args[1]);
                }
                switch (data.method) {
                    case 'scaleX':
                    case 'scaleY':
                    args[0] = -args[0];
                    break;
                    case 'destroy':
                    toggleButtons('none');
                    break;
                }
            }
		});

		// Feather Icon Js
		feather.replace();
		
		// Tabs
        (function ($) {
            $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');
            $('.tab ul.tabs li a').on('click', function (g) {
                var tab = $(this).closest('.tab'), 
                index = $(this).closest('li').index();
                tab.find('ul.tabs > li').removeClass('current');
                $(this).closest('li').addClass('current');
                tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
                tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();
                g.preventDefault();
            });
        })(jQuery);

		// App Email All JS
		$('.email-list-actions .favorite').on('click', function() {
            $(this).toggleClass('active');
		});
		$('.email-list-header .checkbox .cbx').on('click', function() {
			$('.email-list-actions .checkbox .cbx').toggleClass('active');
		});

		// App Todo All JS
		$('.todo-list-header .checkbox .cbx').on('click', function() {
			$('.todo-list-item .checkbox .cbx').toggleClass('active');
		});

		// App Read Email All JS
		$('.email-read-list-detail .email-information .favorite').on('click', function() {
            $(this).toggleClass('active');
		});

		// App Chat All JS
		$('.chat-list-header .header-right .favorite').on('click', function() {
            $(this).toggleClass('active');
        });
        
      
        
}(jQuery));