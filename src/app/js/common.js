$(document).ready(function () {
    $('.wrap-rate').mouseenter(function () {
        $('.hint-rating').fadeIn(300);
    });

    $('.wrap-rate').mouseleave(function () {
        $('.hint-rating').fadeOut(300);
    });
});