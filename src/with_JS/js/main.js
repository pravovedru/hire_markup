$(document).ready(function () {
    
   
    var rating_popup = $('.rating-popup');
    
    $('.rating-block').hover(function () {
        $(this).append(rating_popup);
        rating_popup.fadeIn(300);
    },function () {
        if(!rating_popup.is(':hover')){
        rating_popup.delay(600).fadeOut(300, function(){
            $(this).remove();
        });
        }
        
    });

});
