/**
 * jQuery.simpleScrollableTab - Very simple jQuery extension for multiple tabs scrolling
 * Inspired on jQuery.ScrollableTab by Astun Technology Ltd - http://www.astuntechnology.com
 * Dual licensed under MIT and GPL.
 * Date: 09/09/2011
 * @author Irving A. Bermúdez S. - bigchirv(at)gmail(dot)com
 * @version 0.2
 */
 
(function($){
    $.fn.nextTab = function() {
        var $tabsNav = $(this).find('.ui-tabs-nav');
        var current = $tabsNav.find('li.ui-tabs-selected');
        do {
            current = (current.is(':last-child')) ? $tabsNav.find('li:first-child') : current.next();
            if (!current.hasClass('ui-state-disabled')) return current;
        } while (true);
    }

    $.fn.prevTab = function() {
        var $tabsNav = $(this).find('.ui-tabs-nav');
        var current = $tabsNav.find('li.ui-tabs-selected');
        do {
            current = (current.is(':first-child')) ? $tabsNav.find('li:last-child') : current.prev();
            if (!current.hasClass('ui-state-disabled')) return current;
        } while (true);
    }

	$.fn.simpleScrollableTab = function() {
		return this.each(function(){
            var $tabs = $(this);
			var $tabsNav = $tabs.find('.ui-tabs-nav');
            var scrollSettings = { axis:'x', offset: { left: -350 } }

			$tabs.css({'padding':2, 'position':'relative'})
                .prepend('<div class="sst-tabs-arrows-protector"><span class="ui-icon ui-icon-arrow-left sst-arrow" data-direction="left"></span><span class="ui-icon ui-icon-arrow-right sst-arrow" data-direction="right"></span></div>')
                .disableSelection();
            var $arrows = $('.sst-tabs-arrows-protector');
            $arrows.css({width: '32px', height: '28px', margin: '0 16px', float: 'left'});
			$tabsNav.wrap('<div id="sst-nav" class="sst-nav" style="position:relative;overflow:hidden;"/>');
            $tabsNav.css({'width':'9999px','margin-left': 0});

            var $nav = $('div#sst-nav.sst-nav');
            $nav.width($tabs.width(true) - $arrows.outerWidth());

            var isScrollable = function() {
                var outer = 0;
                $tabsNav.children('li').map(function() { outer += $(this).outerWidth()});
                if (outer >= $nav.width()) return true;
                return false

            }

            $('.sst-arrow').click(function() {
                var selected = ($(this).data('direction') == 'left') ? $tabs.prevTab() : $tabs.nextTab();
                $tabs.tabs('select', selected.index());
            });

            $tabs.bind('tabsselect',function(event, ui) {
                setTimeout(function() {
                    var tab = $tabsNav.find('li.ui-tabs-selected');
                    if (isScrollable()) {
                        $nav.scrollTo(tab, 100, scrollSettings);
                    } else {
                        $nav.scrollTo(0, 100, scrollSettings);
                    }

                }, 50);
            });
            $tabs.bind('tabsadd', function(event, ui) {
                $('div' + $(ui.tab).attr('href')).appendTo($tabs);
                ui.panel = $('div' + $(ui.tab).attr('href'))[0];
            });
            $tabs.bind('tabsremove', function(event, ui) {
                if (!isScrollable()) $nav.scrollTo(0, 100, scrollSettings);
            });
		});
	}
})(jQuery);
