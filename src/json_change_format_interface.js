<div class="container-fluid">
  <%= _.template($('#input_constructor').html())(
		{
			id: "Data",
			description: tr("JSON string or object to change"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help:
			{
				description: tr("JSON string or object to format changing. You can specify a valid JSON string here or an object whose type is not simple. Simple types include numbers, boolean values, null value.")
			}
    }) %>
	<%= _.template($('#input_constructor').html())(
    {
      id: "Type", 
      description: tr("New data format"), 
      default_selector: "string", 
      disable_int: true, 
      value_string: "String", 
      variants: ['String', 'JSON'], 
      help: 
      {
        description: tr("New data format for your variable. You can use only two options: String or JSON.")
      } 
    }) %>
  <%= _.template($('#variable_constructor').html())(
    {
      id: "Save", 
      description: tr("Variable to save"), 
      default_variable: "FORMATTED_JSON",
      help:
      {
        description: tr("Variable that stores the result of format changing (object or string).")
      }
    }) %>
</div>

<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Change the format of the selected JSON string or object and return the result to the variable.</div>
    <div class="tr tooltip-paragraph-fold">JSON is a text format for data exchange, serialization (storage) of objects, arrays, numbers, strings, logical values ​​and <span style="color:black">null</span> values. It is based on JavaScript syntax, but still different from it: not every JavaScript code is JSON, and not every JSON is JavaScript code.</div>
    <div class="tr tooltip-paragraph-fold">If you specify an object of the wrong type or an incorrect format, the result will be the same object.</div>
    <div class="tr tooltip-paragraph-fold">Use action <span style="color:black">Check if string matches JSON</span> to make sure that string conversion is possible or just use <span style="color:black">Ignore Errors</span> to handle possible errors.</div>
    <div class="tr tooltip-paragraph-fold">With this action, you can convert a JSON string to a JavaScript object and vice versa.</div>
    <div class="tr tooltip-paragraph-fold">For example, changing format of the string <span style="color:black">{"name":"John"}</span> will return object that contains one property - <span style="color:black">name</span> with value <span style="color:black">John</span></div>
    <div class="tr tooltip-paragraph-fold">In a similar way, we can do the inverse transformation, i.e. make a JSON format string from the object. For example, we have an object with two parameters. One of them is an array of three numbers, the other is a simple string. Let it be student performance data for the subject. After converting, we can get a JSON string of the form like <span style="color:black">{"name":"John","grades":[5,5,4]}</span>.</div>
    <div class="tr tooltip-paragraph-fold">Remember that this function is required for a simple conversion. You can use other actions with both the object and the string. It is recommended that you use the <span style="color:black">Get value</span> or <span style="color:black">Get all values</span> ​​actions if you want to get specific information about an object or JSON string.</div>
    <div class="tr tooltip-paragraph-last-fold">See full documentation and examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/BAS.Modules/jpath-documentation-en.html'); return false;"><span class="tr">here.</span></a></div>
</div>

<%= _.template($('#back').html())({ action: "executeandadd", visible: true }) %>