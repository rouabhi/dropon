# dropon v0.1.0
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

In the **Javascript** code, you should initialise *dropon* elements:
``````javascript
$(document).ready( function(){
  $(".dropon").dropon().dropon('focus');
});
``````

# Available functions
## ```.dropon()```
Initializes a **dropon** element.

## ```.dropon('focus')``` and ```.dropon('select')```
Give the element focus and selects the current text.

## ```.dropon('open')```, ```.dropon('close')``` and ```.dropon('toggle')```
Opens, closes or toggles the dropdown menu.

## ```.dropon('val')```
Returns the content of the editbox.

## ```.dropon('val')```
Returns the selected value of the dropdown. 

## ```.dropon('VAL')```
Used when the values of the drop box and the edit box are supposed to be *floats*.

This function returns the products of these two values.