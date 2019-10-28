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
	<%= _.template($('#input_constructor').html())(
		{
			id:"Path", 
			description:tr("Path to parse"), 
			default_selector: "string", 
			disable_int:true, 
			value_string: "",
			help:
			{
				description:tr("JPath query. Can be empty.")
			}
		}) %>
	<%= _.template($('#variable_constructor').html())(
		{
			id:"Save", 
			description:tr("Variable To Save"), 
			default_variable: "PARSED_JSON",
			help:
			{
				description:tr("This variable will be set string or an array that matches JPath or simple JSON query and contain the value.")
			}
		}) %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Execute JPath query if needeed and get one value.</div>
    <div class="tr tooltip-paragraph-last-fold">See Full Documentation and Examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/BAS.Modules/jpath-documentation-en.html'); return false;"><span class="tr">Here</span></a></div>
</div>
<%= _.template($('#back').html())({ action:"executeandadd", visible:true }) %>
