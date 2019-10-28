<div class="container-fluid">
  	<%= _.template($('#input_constructor').html())(
		{
			id: "Data",
			description: tr("JSON string or object"),
			default_selector: "string",
			disable_int: true,
			value_string: "",
			help:
			{
				description: tr("")
			}
    }) %>
	  <%= _.template($('#input_constructor').html())(
    {
      id: "Type", 
      description: tr("Format"), 
      default_selector: "string", 
      disable_int: true, 
      value_string: "String", 
      variants: ['String', 'JSON'], 
      help: 
      {
        description: tr("")
      } 
    }) %>
    <%= _.template($('#variable_constructor').html())(
    {
      id: "Save", 
      description: tr("Variable to save"), 
      default_variable: "PARSED_JSON_FORMATTED",
      help:
      {
        description: tr("")
      }
    }) %>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Check that selected variable is valid JSON string.</div>
	<div class="tr tooltip-paragraph-last-fold">See Full Documentation and Examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/BAS.Modules/jpath-documentation-en.html'); return false;"><span class="tr">Here</span></a></div>
</div>
<%= _.template($('#back').html())({ action: "executeandadd", visible: true }) %>