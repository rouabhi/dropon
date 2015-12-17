$.fn.dropon = function(action, value) {
  var $this = $(this);
  var $input = $this.find("input.form-control");

  var types = {
    "int":/^[0-9]{2,}$/g ,
    "real":/^[0-9]+(\.[0-9]*)?$/g,
    "float":/^\s*[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?\s*$/g
  };

    function setValue($dropon, $a){
      if ($a.length) {
        $dropon.find(".dropdown-value").text( $a.text() );
        $dropon.data("value", $a.data("value"));
        $dropon.trigger( "dropdown:change" );
      }
    }

    function validate( $dropon ){
      var $input = $dropon.find("input");

      if ($dropon.data("type") && !types[ $dropon.data("type") ]) return null; // bad type
      if ($dropon.data("type") && !$input.val().match(types[ $dropon.data("type") ])) return false;

      var value = parseFloat($input.val());
      var factor = parseFloat($dropon.data("value")) || 1;
      if ((typeof $dropon.data("min") !== "undefined") && (value < parseFloat($dropon.data("min")) )) return false;
      if ((typeof $dropon.data("max") !== "undefined") && (value > parseFloat($dropon.data("max")) )) return false;
      if ((typeof $dropon.data("minVal") !== "undefined") && ((value*factor) < parseFloat($dropon.data("minVal")) )) return false;
      if ((typeof $dropon.data("maxVal") !== "undefined") && ((value*factor) > parseFloat($dropon.data("maxVal")) )) return false;
      if ($dropon.data("regexp") && !$input.val().match($dropon.data("regexp"))) return false;

      return true;
    }

  if (typeof action === "undefined") { // initialize
    $this.each(function(index){
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

      $input.keydown( function(e){
              var value = $dropon.data("value");

              $dropon.removeClass("has-success has-warning has-error");
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
                case 13 : // createRange()
                  $dropon.trigger("dropon:submit");
                  break;
                case 27 : // ESC
                  $dropon.dropon("toggle");
                  break;
              }
            })
          .change( function(){
            if ($input.val().length && !validate($dropon)) {
              $dropon.addClass("has-error").trigger("dropon:error");
            }
            $dropon.trigger("dropon:change");
          } )
          .focusin( function(){clearTimeout(timer); $dropon.trigger("dropon:focus");} )
          .focusout( function(){
            timer = setTimeout( function(){$dropon.dropon("close");}, 2000);
            if ($input.val().length && !validate($dropon)) {
              $dropon.addClass("has-error").trigger("dropon:error");
            }
            $dropon.trigger("dropon:blur");
          } );
      setValue($dropon, $dropon.find("ul.dropdown-menu li a[data-selected]"));
    });
  }
  else if (action === "open") {
    $this.find(".input-group-btn").addClass("open");
  }
  else if (action === "close") {
    $this.find(".input-group-btn").removeClass("open");
  }
  else if (action === "toggle") {
    $this.find(".input-group-btn").toggleClass("open");
  }
  else if ((action === "val")) { // The values of the edit box x the factor from dropbox
    if (!validate($this)) return null;
    return ( parseFloat($this.data("value") || 1) * parseFloat($this.find("input").val())) || 0;
  }
  else if ((action === "selected")&&(typeof value === "undefined")) { // getValue
    return ($this.data("value"));
  }
  else if (action === "selected") { // setValue
    $this.find(".input-group-btn .dropdown-menu li a[data-value]").each(
        function(){
          var $a=$(this);
          if ( value == $a.data("value") ) {
            setValue($this, $a);
            return false;
          }            
        });
  }
  else if ((action === "text")&&(typeof value === "undefined")) { // getValue
    return $this.find("input").val();
  }
  else if (action == "text") { // setValue
    $this.find("input").val( value );
  }
  else if (action == "regexp") {
    value ? $this.data("regexp", value ) : $this.removeData("regexp" );
  }
  else if (action.match &&  action.match(/^(focus|select)$/g)) {
    $this.find("input")[action]();
  }
  else if (action == "validate") {
    return validate( $this );
  }
  else if (action == "readonly") {
    $this.find("input,button").attr( "readonly", !!value );
  }
  else if (action == "disabled") {
    $this.find("input,button").attr( "disabled", !!value );
  }
  else if (action === "has") {
    $this.removeClass("has-success has-warning has-error");
    if (value) $this.addClass("has-"+value);
  }
  return this;
}