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
				description: tr("JSON string or object to parse. You can specify a valid JSON string here or an object whose type is not simple. Simple types include numbers, boolean values, null value.")
			}
		}) %>
	<%= _.template($('#input_constructor').html())(
		{
			id: "Path", 
			description: tr("JSONPath query to parse"), 
			default_selector: "string", 
			disable_int: true, 
			value_string: "",
			variants: [

				"dialogs[*].title<br/><span style='color:gray;font-size:small'>" + tr("The titles of all dialogs.") + "</span>",
				"user.age<br/><span style='color:gray;font-size:small'>" + tr("The age of user.") + "</span>",
				"..cart[2]<br/><span style='color:gray;font-size:small'>" + tr("The third item in cart.") + "</span>",
				"..cart[-2]<br/><span style='color:gray;font-size:small'>" + tr("The second to last item in cart.") + "</span>",
				"..*<br/><span style='color:gray;font-size:small'>" + tr("All possible elements.") + "</span>",
			],
			help:
			{
				description: tr("Any JSONPath request that you need."),
				examples: 
				[
					{
      					code: "$.dialogs[*].title",
      					description: tr("The titles of all dialogs.")
    				},
    				{
      					code: "dialogs[*].title",
      					description: tr("The titles of all dialogs.")
    				},
    				{
      					code: "$.user.age",
      					description: tr("The age of user.")
    				},
    				{
      					code: "user.age",
      					description: tr("The age of user.")
    				},
    				{
      					code: "$..cart[2]",
      					description: tr("The third item in cart.")
					},
					{
						code: "..cart[2]",
						description: tr("The third item in cart.")
					},
    				{
      					code: "$..cart[-2]",
      					description: tr("The second to last item in cart.")
					},
					{
						code: "..cart[-2]",
						description: tr("The second to last item in cart.")
				  	},
    				{
      					code: "$..*",
      					description: tr("All possible elements.")
					},
					{
						code: "..*",
						description: tr("All possible elements.")
				    },
				]
			}
		}) %>
	<%= _.template($('#variable_constructor').html())(
		{
			id: "Save", 
			description: tr("Variable to save"), 
			default_variable: "PARSED_JSON_VALUES",
			help:
			{
				description: tr("Variable that stores the result of parsing (All values ​​or an list of one value).")
			}
		}) %>
</div>

<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Execute JPath query and get all matching values.</div>
    <div class="tr tooltip-paragraph-fold">If the result of the action is a single value, a list containing this value will be returned.</div>
    <div class="tr tooltip-paragraph-fold">If an error occurs during parsing, an empty string will be returned.</div>
    <div class="tr tooltip-paragraph-fold">JSONPath query should not be empty. If you want to change the data format, use the <span style="color:black">Change format</span> action.</div>
    <div class="tr tooltip-paragraph-fold">JSON is a text format for data exchange, serialization (storage) of objects, arrays, numbers, strings, logical values ​​and <span style="color:black">null</span> values. It is based on JavaScript syntax, but still different from it: not every JavaScript code is JSON, and not every JSON is JavaScript code.</div>
    <div class="tr tooltip-paragraph-fold">JSONPath (JPath) is a powerful tool for working with the JSON data type. It is built on the basis of logic, which is very similar to XPath, but has some limitations, because the data type itself is much simpler than Xml.</div>
    <div class="tr tooltip-paragraph-fold">Using this technology, we can quickly get data from JavaScript objects or strings in JSON format. In addition, this greatly simplifies the work, as usually, parsing JSON requires writing code.</div>
    <div class="tr tooltip-paragraph-fold">Typical examples of using this function are working with the API of a website or, more often in the context of BAS, working with Cookies. In BAS, cookies are presented to the user in JSON format strings. This often causes difficulties. But with JSONPath, you can easily get the data you need.</div>
    <div class="tr tooltip-paragraph-fold">Consider an example. Suppose we got a line of the form <span style="color:black">{"age":100, "name":"John", "messages": ["m1", "m2", "m3"]}</span> from a particular site. In a normal situation, we will have to write code to get, for example, the first message - <span style="color:black">m1</span>. With JSONPath, we can simply specify the desired path - <span style="color:black">$.messages[0]</span> and get what we needed as a result. If we briefly describe what exactly such a request means, we get the following: we take the root element using the <span style="color:black">$</span> symbol, access the child element <span style="color:black">messages</span> through the dot symbol, and indicate the index of the element we need.</div>
    <div class="tr tooltip-paragraph-fold">Please note, if you use the path <span style="color:black">$.messages[*]</span> - the output will be a list of values, but the actions <span style="color:black">Get Value</span> or <span style="color:black">Get Key</span> will return only the first element from the list,i.e. <span style="color:black">m1</span>, not <span style="color:black">[m1, m2, m3]</span>. If you need a list, use the <span style="color:black">Get all values</span> or <span style="color:black">Get all keys</span> actions.</div>
    <div class="tr tooltip-paragraph-fold">You can use simple parameter names to get the value you need. For example, having the line from the previous example, you can specify a query of the form <span style="color:black">age</span> as a path and get the value of this property - <span style="color:black">100</span>.</div>
	<div class="tr tooltip-paragraph-fold">You can also use simplified syntax for queries. For example, the result of queries <span style="color:black">$.messages[*]</span> and <span style="color:black">messages[*]</span> will be the same. The module itself will add the necessary characters at the beginning of the query string. This also applies to the search for any elements (not only root), i.e. for queries of the form <span style="color:black">$..messages[*]</span> and <span style="color:black">..messages[*]</span> will be the same too.</div>
	<div class="tr tooltip-paragraph-last-fold">See full documentation and examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/BAS.Modules/jpath-documentation-en.html'); return false;"><span class="tr">here.</span></a></div>
</div>

<%= _.template($('#back').html())({ action : "executeandadd", visible : true }) %>