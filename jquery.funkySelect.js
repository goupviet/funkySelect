/*
 * jQuery funkySelect Plugin
 * Example at: http://www.jjenzz.com/funkySelect/demo.html
 * Copyright (c) 2010 J. Smith (@jjenzz)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * $('select').funkySelect();
 */

(function($) {

    $.fn.funkySelect = function( options ) {
        
        var $s, $fs, header, sOptions, selected, funkySelect, o, cl;
        
        // Merge default options with the `options` parameter
        o = $.extend({}, $.fn.funkySelect.defaults, options ); // Allow defaults to be overwritten
        
        // Define classes
        cl = {
            parent:      [o.classPrefix, 'container'   ].join('-'),
            header:      [o.classPrefix, 'header'      ].join('-'),
            open:        [o.classPrefix, 'open'        ].join('-'),
            corners:     [o.classPrefix, 'corners'     ].join('-'),
            selected:    [o.classPrefix, 'selected'    ].join('-'),
            arrow:       [o.classPrefix, 'arrow'       ].join('-'),
            options:     [o.classPrefix, 'options'     ].join('-'),
            option:      [o.classPrefix, 'option'      ].join('-'),
            optiongroup: [o.classPrefix, 'optiongroup' ].join('-')
        };
        
        funkySelect = [
            '<div class="', o.classPrefix ,'">',
                '<div class="', cl.header, ' ', cl.corners, '">',
                    '<span class="', cl.selected, '"></span>',
                    '<span class="', cl.arrow, ' ', cl.corners, '"><span></span></span>',
                '</div>',
                '<div class="', cl.options , ' ', cl.corners, '">',
                    '<ul></ul>',
                '</div>',
            '</div>'
        ];
        
        
        function bindEvents() {
            
            $('html').bind('click', function(e) {
                var $this, $cont, target = $(e.target);
               
               // on click outside of funkySelect boxes
               if (target.parents('.' + cl.parent).length === 0) {
                   $('.' + cl.parent).removeClass(cl.open);
               }
               
               // on funkySelect header click
               if (target.hasClass(cl.header) || target.parents('.' + cl.header).length) {
                   $cont = target.parents('.' + cl.parent);

                   if($cont.hasClass(cl.open)) {
                       $cont.removeClass(cl.open);
                   } else {
                       $('.' + cl.parent).removeClass(cl.open);
                       $cont.addClass(cl.open);
                   }                   
               }
               
               // on funkySelect option click
               if (target.hasClass(cl.option) || target.parents('.' + cl.option).length) {
                   $this = target.hasClass(cl.option) ? target : target.parents('.' + cl.option);
                   $cont = target.parents('.' + cl.parent);

                   $cont.find('.' + cl.selected).text(target.text());
                   $cont.find('.' + cl.header).trigger('click');

                   $cont.find('option').removeAttr('selected');
                   $cont.find('.' + $this.attr('rel')).attr('selected', 'selected');
               }
               
            });

        }

        function adjustDimensions() {
            
            // adjust width
            var optsWidth  = sOptions.outerWidth(),
                arrowWidth = header.find('.' + cl.arrow ).eq(0).outerWidth(true),
                width      = optsWidth + arrowWidth;
            
            sOptions.css('width', width);
			
            if(parseInt($s.css('width'), 10) > 0) {
                width = parseInt($s.css('width'), 10);
            }

            $fs.css('width', width);
						
        }
        
        function prepareMe() {
			
            // prepend select options to funkySelect
            var html = [], count = 0;
			
            $s.children().each(function() {    
                var addOption, $this = $(this); 
                
                addOption = function(el, i) {
                    el.addClass('opt' + i);

                    html.push('<li class="' + cl.option + ' ' + cl.corners + '" rel="opt' + i + '">');
                    html.push(el.text());
                    html.push('</li>');
                    
                    count = count + 1;
                };
                
                if(this.tagName.toLowerCase() === 'optgroup') {
                    html.push('<li class="' + cl.optiongroup + ' ' + cl.corners + '">');
                    html.push($this.attr('label'));
                    html.push('<ul>');
                    
                    $this.children().each(function() {
                        addOption($(this), count);
                    });
                    
                    html.push('</ul></li>');
                } else {
                    addOption($this, count);
                }

            });

            sOptions.children().append(html.join(''));
            selected.text($s.find('option').eq(0).text());
			
            // fix floating
            $fs.css('float', $s.css('float'));
			
            adjustDimensions();
            
        }
        
        
        bindEvents();		

        return this.each(function() {
	
            $s = $(this);
            $s.wrap('<div class="' + cl.parent + '"></div>');
            
            $fs = $s.parent();
            $fs.prepend(funkySelect.join(''));

            sOptions = $fs.find('.' + cl.options ).eq(0);
            header   = $fs.find('.' + cl.header  ).eq(0);
            selected = $fs.find('.' + cl.selected).eq(0);

            prepareMe();

        });
    };
    
    $.fn.funkySelect.defaults = {
        classPrefix: 'jquery-funkyselect'
    };

})(jQuery);