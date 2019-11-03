<div class="container-fluid">
  <%= _.template($('#input_constructor').html())(
    {
      id: "Data", 
      description: tr("JSON string to check"), 
      default_selector: "string", 
      disable_int: true, 
      value_string: "",
      help:
      {
        description: tr("")
      }
    }) %>
  <%= _.template($('#variable_constructor').html())(
    {
      id: "Save", 
      description: tr("Variable to save"), 
      default_variable: "PARSED_JSON_CHECK",
      help:
      {
        description: tr("Variable that stores the result of format checking (true or false).")
      }
    }) %>
</div>

<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Check that selected variable is valid JSON string and return the result to a variable.</div>
    <div class="tr tooltip-paragraph-fold">JSON is a text format for data exchange, serialization (storage) of objects, arrays, numbers, strings, logical values ​​and <span style="color:black">null</span> values. It is based on JavaScript syntax, but still different from it: not every JavaScript code is JSON, and not every JSON is JavaScript code.</div>
    <div class="tr tooltip-paragraph-fold">With this action, you can see if you can use the string to parse JSON and retrieve data to avoid possible errors.</div>
    <div class="tr tooltip-paragraph-fold">Please note that if you specify as a variable for checking not a string, but a variable of any other type - the result will always be <span style="color:black">false</span>. In this regard, this action is different from the JavaScript function <span style="color:black">JSON.parse()</span>, as there is an additional check for suitable types.</div>
    <div class="tr tooltip-paragraph-fold">For example, checking for the string <span style="color:black">{"name":"John"}</span> will return <span style="color:black">true</span>, because it has a valid JSON format. The string <span style="color:black">"name":"John"</span> will have an incorrect structure, it does not have curly braces, so the result will be <span style="color:black">false</span>.</div>
    <div class="tr tooltip-paragraph-last-fold">See full documentation and examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/BAS.Modules/jpath-documentation-en.html'); return false;"><span class="tr">here.</span></a></div>
</div>

<%= _.template($('#back').html())({ action : "executeandadd", visible : true }) %>