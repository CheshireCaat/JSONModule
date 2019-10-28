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
			id:"Paths", 
			description:tr("Paths to parse"), 
			default_selector: "string", 
			disable_int:true, 
			value_string: "",
			use_textarea:true, 
			size: 8, 
			disable_type_chooser:true,
			textarea_height:80,
			help:
			{
				description:tr("List of JPath queries. Each with a new line.")
			}
		}) %>
	<%= _.template($('#variable_constructor').html())(
		{
			id:"Save", 
			description:tr("Variables to save"), 
			default_variable: "PARSED_JSON1,PARSED_JSON2",
			append_mode:true,
			help:
			{
				description:tr("List of variable names separated by comma. Each variable will be set string or an array that matches JPath or simple JSON query and contain the value.")
			}
		}) %>
</div>
<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Execute JPath query if needeed and get values list.</div>
    <div class="tr tooltip-paragraph-last-fold">See Full Documentation and Examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/BAS.Modules/jpath-documentation-en.html'); return false;"><span class="tr">Here</span></a></div>
</div>
<%= _.template($('#back').html())({ action:"executeandadd", visible:true }) %>