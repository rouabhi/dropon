$.fn.dropon = function(action, value) {

  function setValue($dropon, $a){
      if ($a.length) {
        $dropon.find(".dropdown-value").text( $a.text() );
        $dropon.data("value", $a.data("value"));
        $dropon.trigger( "dropdown:change" );
      }
  }

  if (typeof action === "undefined") { // initialize
    $(this).each(function(index){
      var $dropon = $(this);
      var $input = $dropon.find("input.form-control");
      var timer = null;

      if (!$input.length) return;
      $dropon.on("click","div ul li a",function(){
        clearTimeout(timer);
        setValue( $dropon, $(this) );
        $input.focus();
      });

      $dropon.find(".input-group-btn > button").click( function(){clearTimeout(timer);} );

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
                case 13 : // cr
                  $dropon.trigger("dropon:submit");
                  break;
                case 27 : // ESC
                  $dropon.dropon("toggle");
                  break;
              }
            })
        .change( function(){$dropon.trigger("dropon:change");} )
        .focusin( function(){clearTimeout(timer); $dropon.trigger("dropon:focus");} )
        .focusout( function(){timer = setTimeout( function(){$dropon.dropon("close");}, 2000); $dropon.trigger("dropon:blur");} );
      setValue($dropon, $dropon.find("ul.dropdown-menu li a[data-selected]"));
    });
  }
  else if (action === "open") {
    $(this).find(".input-group-btn").addClass("open");
  }
  else if (action === "close") {
    $(this).find(".input-group-btn").removeClass("open");
  }
  else if (action === "toggle") {
    $(this).find(".input-group-btn").toggleClass("open");
  }
  else if ((action === "val")) { // The values of the edit box x the factor from dropbox
    return ( parseFloat($(this).data("value") || 1) * parseFloat($(this).find("input").val())) || 0;
  }
  else if ((action === "selected")&&(typeof value === "undefined")) { // getValue
    return ($(this).data("value"));
  }
  else if (action === "selected") { // setValue
    var $dropon = this;
    $dropon.find(".input-group-btn .dropdown-menu li a[data-value]").each(
        function(){
          var $a=$(this);
          if ( value == $a.data("value") ) {
            setValue($dropon, $a);
            return false;
          }
        });
  }
  else if ((action === "text")&&(typeof value === "undefined")) { // getValue
    return $(this).find("input").val();
  }
  else if (action == "text") { // setValue
    $(this).find("input").val( value );
  }
  else if (action.match &&  action.match(/^(focus|select)$/g)) {
    $(this).find("input")[action]();
  }
  return this;
}