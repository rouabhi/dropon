# dropon v1.1.0

**Dropon** is a Bootstrap v3 component.
**Dropon** is composed by an edit box and a addon. This addon is a dropdown that permit to select options, typically numerical values.
You can use up and down arrows keys to change units

# How to use it
First, you have to include the ```dropo,.js``` library along with, and right after, the *jQuery* and *Bootstrap* .js files.:
```html
    <script src="./path_to/jquery.min.js"></script>
    <script src="./path_to/bootstrap.min.js"></script>
    <script src="./path_to/dropon.js"></script>
```


Inside the body of the html file, you can add **dropon** elements by adding the code bellow. It is the standard code used in Bootstrap 4.

```html
<div class="input-group dropon">
  <input type="text" class="form-control" aria-label="...">
  <div class="input-group-btn">
    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="dropdown-value" data-value="">x</span>
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu dropdown-menu-right"  data-toggle='dropon'>
      <li><a href="#" data-value="1">meters</a></li>
      <li><a href="#" data-value="10000" data-selected>Kilometers</a></li>
      <li role="separator" class="divider"></li>
      <li><a href="#" data-value="1852">Nautical Miles</a></li>
      <li><a href="#" data-value="0.3048">Feet</a></li>
      <li><a href="#" data-value="0.0254">Inches</a></li>
    </ul>
  </div>
</div>
```

The ```data-selected``` attribute indicates the default value.

In the **Javascript** code, you should initialise *dropon* elements:
```javascript
$(document).ready( function(){
  $(".dropon").dropon().dropon('focus');
});
```

# Available functions

 * ```.dropon()``` : Initializes a **dropon** element.

 * ```.dropon('focus')``` : Give the edit box focus.

 * ```.dropon('select')``` : Selects the edit box content.

 * ```.dropon('open')```, ```.dropon('close')``` and ```.dropon('toggle')```
Opens, closes or toggles the dropdown menu.

 *  ```.dropon('text')``` : Returns the content of the editbox.

 *  ```.dropon('selected')``` : Returns the value of the selected option in the dropdown. 

 *  ```.dropon('selected',value)``` : change the selected item of the dropdown.

 * ```.dropon('val')``` : This function returns the products of two values (see below) : the float value intered in the edit box and the value selected in the drop box.

 *  ```.dropon('readonly', boolean )``` : make the component read only.

 *  ```.dropon('disabled', boolean )``` : disable/enable the component.

 *  ```.dropon('has', "error" )```
 *  ```.dropon('has', "warning" )```
 *  ```.dropon('has', "success" )``` : make the control red/orange/green.


# Component control
When entering a value with the ```dropon``` component, the user can change dropdown value using arrows keys and open/close dropdown with the ESC key. This could be convinient in keybord devices.

# Using dropon component as multi-unit edit box
The main reason I created this component is to allow entering a value with a a factor, like in different units.

Suppose you have to inter a distance. You want to allow the user to enter it in meters, in inches, in feet,... A simple way to do so is to use the dropbox to select the unit, and use dropbox values as conversion factors.

To control the edit box content, you should also add a ```data-type``` attribute as ```"float"```, ```"real"``` or ```"int"```. Other available attributes are ```data-min``` and ```data-max```. A function can also specify a Regexp : ```.dropon("regex", /...../)``` (see below).

```html
<div class="input-group dropon" id ="distance">
  <input type="text" class="form-control" data-type="float">
  <div class="input-group-btn">
    <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="dropdown-value" data-value="">x</span>
      <span class="caret"></span>
    </button>
    <ul class="dropdown-menu dropdown-menu-right"  data-toggle='dropon'>
      <li><a href="#" data-value="1">meters</a></li>
      <li><a href="#" data-value="10000" data-selected>Kilometers</a></li>
      <li><a href="#" data-value="1852">Nautical Miles</a></li>
      <li><a href="#" data-value="0.3048">Feet</a></li>
      <li><a href="#" data-value="0.0254">Inches</a></li>
    </ul>
  </div>
</div>
```

In this case, in the example below, the ```$("#distance").dropon("val")``` function return directly the entered value in meters.

# Using dropon component without dropdown
For consistancy reason, the dropon component can also be used when we have only an edit box and an add-on element. This permit a kind of consistensy by using the same function for handling both compnents:

**HTML:**

```html
<div class="input-group dropon" id="result">
  <input class="form-control" type="text" placeholder="distance" />
  <div class="input-group-addon">Meters</div>
</div>
```

**Javascript:**
```javascript
$(document).ready( function(){
  $(".dropon").dropon(); // initialization
  $("#distance").on("dropon:change", function(){...})
});


```

# entry validation
The value entred in the edit box is validated against many creterias:
 * **type** : ```data-type``` attribute can be specified as 'int', 'real' or 'float'
 * **min** and **max** : given in the attributes ```data-min``` and ```data-max```.
 * **regexp** : given by the method ```$("#element").dropon("regexp", /regular expression/);``` 

If the entered value is incorect, the component is given the Bootstrap class ```has-error``` and the event ```'dropon:error'``` is fired.

# Events
The following events can be added to the component defined above:
 
```
$("#distance").on("dropon:focus", eventHandler);
```
Fired when the edit box get focus.

```
$("#distance").on("dropon:blur", eventHandler);
```
Fired when the edit box lose focus.

```
$("#distance").on("dropon:change", eventHandler);
```
Fired when leaving the edit box and the content was changed.

```
$("#distance").on("dropon:error", eventHandler);
```
Fired when a validation error occured when leaving the edit box. The field is supposed not to be mandatory so if the edit box is empty, no event is fired.


```
$("#distance").on("dropon:submit", eventHandler);
```
Fired when Enter key pressed when entering value on the edit box.

```
$("#distance").on("dropdown:change", eventHandler);
```
Fired when the value from the dropbox is changed.
