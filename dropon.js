$.fn.dropon = function(action, value) {

  function setValue($dropon, $a){
      if ($a.length) {
        $dropon.find(".dropdown-value").text( $a.text() );
        $dropon.data("value", $a.data("value"));
      }
  }

  if (typeof action == "undefined") { // initialize
    $(this).each(function(index){
      var $dropon = $(this);
      var $input = $(this).find("input.form-control");
      var $button = $(this).find(".input-group-btn > button");
      var timer = null;

      if (!$input.length) return;
      $dropon.on("click","div ul li a",function(){
        clearTimeout(timer);
        setValue( $dropon, $(this) );
        $input.focus();
      });

      $button.click( function(){clearTimeout(timer);});

      $input.keyup( function(e){
              var value = $dropon.data("value");
              switch(e.keyCode){
                case 38 : // up
                  setValue($dropon, $dropon.find("ul.dropdown-menu li a[data-value=\""+value+"\"]")
                      .parent("li").prevAll().filter(":not(.divider):first").find("a"));
                  e.preventDefault();
                  break;
                case 40 : // down
                  setValue($dropon, $dropon.find("ul.dropdown-menu li a[data-value=\""+value+"\"]")
                      .parent("li").nextAll().filter(":not(.divider):first").find("a"));
                  e.preventDefault();
                  break;
              }
            })
        .focusin( function(){clearTimeout(timer); $dropon.dropon("open");} )
        .focusout( function(){timer = setTimeout( function(){$dropon.dropon("close");}, 5000);} );

      setValue($dropon, $dropon.find("ul.dropdown-menu li a[data-selected]"));
    });
  }
  else if (action === "open") {
    $(this).addClass("open");
  }
  else if (action === "close") {
    $(this).removeClass("open");
  }
  else if (action === "toggle") {
    $(this).toggleClass("open");
  }
  else if ((action === "VAL")) { // The values of the edit box x the factor from dropbox
    return ($(this).data("value") * parseFloat($(this).find("input").val())) || 0;
  }
  else if ((action === "selected")&&(typeof val==="undefined")) { // getValue
    return ($(this).data("value"));
  }
  else if ((action === "val")&&(typeof val==="undefined")) { // getValue
    return $(this).find("input").val();
  }
  else if (action == "val") {
    /* TODO : setValue*/
  }
  else if (action.match &&  action.match(/^(focus|select)$/g)) {
    $(this).find("input")[action]();
  }
  return this;
}