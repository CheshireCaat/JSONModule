<div class="container-fluid">
	<%= _.template($('#input_constructor').html())(
		{
			id:"String", 
			description:tr("String to parse"), 
			default_selector: "string", 
			disable_int:true, 
			value_string: "",
			help: 
			{
				description:tr("Text, target of JPath or simple JSON query. You can put string in JSON format here.")
			}
		}) %>
	<%= _.template($('#variable_constructor').html())(
		{
			id:"Save", 
			description:tr("Variable To Save"), 
			default_variable: "PARSED_JSON_CHECK",
			help:
			{
				description:tr("This variable will be true or false depending on whether the string is a valid JSON string.")
			}
		}) %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Check that selected variable is valid JSON string.</div>
    <div class="tr tooltip-paragraph-last-fold">See Full Documentation and Examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/BAS.Modules/jpath-documentation-en.html'); return false;"><span class="tr">Here</span></a></div>
</div>
<%= _.template($('#back').html())({ action:"executeandadd", visible:true }) %>