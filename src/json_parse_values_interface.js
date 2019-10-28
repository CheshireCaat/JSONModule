<div class="container-fluid">
	<%= _.template($('#input_constructor').html())(
		{
			id: "Data", 
			description: tr("JSON string or object to parse"), 
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
			id: "Path", 
			description: tr("JPath query to parse"), 
			default_selector: "string", 
			disable_int: true, 
			value_string: "",
			help:
			{
				description:tr("JSONPath query. Can be empty.")
			}
		}) %>
	<%= _.template($('#variable_constructor').html())(
		{
			id: "Save", 
			description: tr("Variable to save"), 
			default_variable: "PARSED_JSON",
			help:
			{
				description: tr("")
			}
		}) %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Execute JPath query if needeed and get all values.</div>
    <div class="tr tooltip-paragraph-last-fold">See Full Documentation and Examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/BAS.Modules/jpath-documentation-en.html'); return false;"><span class="tr">Here</span></a></div>
</div>
<%= _.template($('#back').html())({ action:"executeandadd", visible:true }) %>