# dropon v0.2.1

**Dropon** is a Bootstrap component.
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
``````javascript
$(document).ready( function(){
  $(".dropon").dropon().dropon('focus');
});
``````

# Available functions
 - ```.dropon()```
Initializes a **dropon** element.

 - ```.dropon('focus')``` and ```.dropon('select')```
Give the element focus and selects the current text.

 - ```.dropon('open')```, ```.dropon('close')``` and ```.dropon('toggle')```
Opens, closes or toggles the dropdown menu.

 -  ```.dropon('val')```
Returns the content of the editbox.

 -  ```.dropon('selected')```
Returns the value of the selected option in the dropdown. 

## ```.dropon('VAL')```
This function returns the products of these two values (see below).

# Component control
When entering a value with the ```dropon``` component, the user can change dropdown value using arrows keys. This could be convinient in keybord devices.

# Using dropon component as multi-unit edit box
The main reason I created this component is to allow entering a value with a a factor, like in different units.

Suppose you have to inter a distance. You want to allow the user to enter it in meters, in inches, in feet,... A simple way to do so is to use the dropbox to select the unit, and use dropbox values as conversion factors.

To controle the edit box content, you should also add a ```data-type``` attribute as ```"float"``` or ```"int"```.

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

In this case, in the example below, the ```$("#distance").dropon("VAL")``` function return directly the entered value in meters.