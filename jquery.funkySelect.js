/*
 * jQuery funkySelect
*/

// $('select').funkySelect();

(function($) {

    $.fn.funkySelect = function() {
        
        var $s, $fs, header, sOptions, selected;
        var funkySelect = [
            '<div class="jquery-funkyselect">',
                '<div class="jquery-funkyselect-header jquery-funkyselect-corners">',
                    '<span class="jquery-funkyselect-selected"></span>',
                    '<span class="jquery-funkyselect-arrow jquery-funkyselect-corners"><span></span></span>',
                '</div>',
                '<div class="jquery-funkyselect-options jquery-funkyselect-corners">',
                    '<ul></ul>',
                '</div>',
            '</div>'
        ];
        
        
        bindEvents();
        
        function bindEvents() {
            var parentClass = 'jquery-funkyselect-container';
            var headerClass = 'jquery-funkyselect-header';
            var optionClass = 'jquery-funkyselect-option';
            var openClass = 'jquery-funkyselect-open';
            
            $('html').bind('click', function(e) {
               var target = $(e.target);
               
               // on click outside of funkySelect boxes
               if (target.parents('.' + parentClass).length === 0) {
                   $('.' + parentClass).removeClass(openClass);
               }
               
               // on funkySelect header click
               if (target.hasClass(headerClass) || target.parents('.' + headerClass).length) {
                   $cont = target.parents('.' + parentClass);

                   if($cont.hasClass(openClass)) {
                       $cont.removeClass(openClass);
                   } else {
                       $('.' + parentClass).removeClass(openClass);
                       $cont.addClass(openClass);
                   }                   
               }
               
               // on funkySelect option click
               if (target.hasClass(optionClass) || target.parents('.' + optionClass).length) {
                   $this = target.hasClass(optionClass) ? target : target.parents('.' + optionClass);
                   $cont = target.parents('.' + parentClass);

                   $cont.find('.jquery-funkyselect-selected').text(target.text());
                   $cont.find('.' + headerClass).trigger('click');

                   $cont.find('option').removeAttr('selected');
                   $cont.find('.' + $this.attr('rel')).attr('selected', 'selected');
               }
               
            });

        }


        function prepareMe() {
			
            // prepend select options to funkySelect
            var html = [];
			
            $s.children().each(function(i, val) {    
                $this = $(this);
                      
                var addOption = function(el, i) {
                    el.addClass('opt' + i);

                    html.push('<li class="jquery-funkyselect-option jquery-funkyselect-corners" rel="opt' + i + '">');
                    html.push(el.text());
                    html.push('</li>');
                }
                
                if(this.tagName.toLowerCase() === 'optgroup') {
                    html.push('<li class="jquery-funkyselect-optiongroup jquery-funkyselect-corners">');
                    html.push($this.attr('label'));
                    html.push('<ul>');
                    
                    $this.children().each(function(i, val) {
                        addOption($(this), i);
                    });
                    
                    html.push('</ul></li>');
                } else {
                    addOption($this, i);
                }
            });

            sOptions.children().append(html.join(''));
            selected.text($s.find('option').eq(0).text());
			
            // fix floating
            $fs.css('float', $s.css('float'));
			
            adjustDimensions();
            
        }
		
		
        function adjustDimensions() {
			
            // adjust height
            selected.css('line-height', header.height() + 'px');
			
            // adjust width
            var optsWidth = sOptions.outerWidth();
            var arrowWidth = header.find('.jquery-funkyselect-arrow').eq(0).outerWidth(true);
            var width = optsWidth + arrowWidth;
            
            sOptions.css('width', width + 'px');
			
            if(parseInt($s.css('width'), 10) > 0) {
                width = parseInt($s.css('width'), 10);
            }

            $fs.css('width', width + 'px');
						
        }
        		

        return this.each(function() {
	
            $s = $(this);
            $s.wrap('<div class="jquery-funkyselect-container"></div>');
            
            $fs = $s.parent();
            $fs.prepend(funkySelect.join(''));

            sOptions = $fs.find('.jquery-funkyselect-options').eq(0);
            header = $fs.find('.jquery-funkyselect-header').eq(0);
            selected = $fs.find('.jquery-funkyselect-selected').eq(0);

            prepareMe();

        });
    };

})(jQuery);