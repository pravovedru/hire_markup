$(document).ready(function () {
    var $tooltip = $('#tooltip'),
        hideTooltipTimeoutId = 0;

    $(document).on('mouseenter', '.person-rating', function (e) {
        var $elt = $(e.currentTarget),
            $value = $elt.find('.person-rating__value');

        if ($value.length == 0) {
            return;
        }

        $tooltip.find('.tooltip__header-value span')
            .text($value.data('value'));

        $tooltip.find('.tooltip__header-place span')
            .text($value.data('place'));

        $tooltip.css({
            top: $value.offset().top + parseFloat($elt.height()) + 10,
            left: $value.offset().left  - 80
        });

        $tooltip.addClass('show')
            .addClass('prevent-hide');
    });

    $(document).on('mouseleave', '.person-rating', function (e) {
        $tooltip.removeClass('prevent-hide');
        hideTooltipTimeoutId = setTimeout(function () {
            if ($tooltip.hasClass('prevent-hide')) {
                return;
            }
            $tooltip.removeClass('show');
        }, 100);
    });

    $(document).on('mouseenter', '.tooltip', function (e) {
        $tooltip.addClass('prevent-hide');
    });

    $(document).on('mouseleave', '.tooltip', function (e) {
        $tooltip.removeClass('prevent-hide');
        hideTooltipTimeoutId = setTimeout(function () {
            if ($tooltip.hasClass('prevent-hide')) {
                return;
            }
            $tooltip.removeClass('show');
        }, 100);
    });

});
