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
			help:
			{
				description: tr("JSONPath query."),
				examples: 
				[
					{
      					code: "$.store.book[*].author",
      					description: tr("The authors of all books.")
    				},
    				{
      					code: "$..author",
      					description: tr("All authors.")
    				},
    				{
      					code: "$.store.*",
      					description: tr("All things, both books and bicycles.")
    				},
    				{
      					code: "$.store..price",
      					description: tr("The price of everything.")
    				},
    				{
      					code: "$..book[2]",
      					description: tr("The third book.")
    				},
    				{
      					code: "$..book[-2]",
      					description: tr("The second to last book.")
    				},
    				{
      					code: "$..book[0,1]",
      					description: tr("The first two books.")
    				},
    				{
      					code: "$..book[:2]",
      					description: tr("All books from index 0 (inclusive) until index 2 (exclusive).")
    				},
    				{
      					code: "$..book[1:2]",
      					description: tr("All books from index 1 (inclusive) until index 2 (exclusive).")
    				},
    				{
      					code: "$..book[-2:]",
      					description: tr("Last two books.")
    				},
    				{
      					code: "$..book[2:]",
      					description: tr("Book number two from tail.")
    				},
    				{
      					code: "$..book[?(@.isbn)]",
      					description: tr("All books with an ISBN number.")
    				},
    				{
      					code: "$.store.book[?(@.price < 10)]",
      					description: tr("All books in store cheaper than 10.")
    				},
    				{
      					code: "$..book[?(@.price <= $[‘expensive’])]",
      					description: tr("All books in store that are not 'expensive'.")
    				},
    				{
      					code: "$..*",
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
    <div class="tr tooltip-paragraph-fold">JSONPath query should not be empty. If you want to change the data format, use the 'Change format' action.</div>
    <div class="tr tooltip-paragraph-fold">JSON is a text format for data exchange, serialization (storage) of objects, arrays, numbers, strings, logical values ​​and <span style="color:black">null</span> values. It is based on JavaScript syntax, but still different from it: not every JavaScript code is JSON, and not every JSON is JavaScript code.</div>
    <div class="tr tooltip-paragraph-fold">JSONPath (JPath) is a powerful tool for working with the JSON data type. It is built on the basis of logic, which is very similar to XPath, but has some limitations, because the data type itself is much simpler than Xml.</div>
    <div class="tr tooltip-paragraph-fold">Using this technology, we can quickly get data from JavaScript objects or strings in JSON format. In addition, this greatly simplifies the work, as usually, parsing JSON requires writing code.</div>
    <div class="tr tooltip-paragraph-fold">Typical examples of using this function are working with the API of a website or, more often in the context of BAS, working with Cookies. In BAS, cookies are presented to the user in JSON format strings. This often causes difficulties. But with JSONPath, you can easily get the data you need.</div>
    <div class="tr tooltip-paragraph-fold">Consider an example. Suppose we got a line of the form <span style="color:black">{"age":100, "name":"John", "messages": ["m1", "m2", "m3"]}</span> from a particular site. In a normal situation, we will have to write code to get, for example, the first message - <span style="color:black">m1</span>. With JSONPath, we can simply specify the desired path - <span style="color:black">$.messages[0]</span> and get what we needed as a result. If we briefly describe what exactly such a request means, we get the following: we take the root element using the <span style="color:black">$</span> symbol, access the child element <span style="color:black">messages</span> through the dot symbol, and indicate the index of the element we need.</div>
    <div class="tr tooltip-paragraph-fold">Please note, if you use the path <span style="color:black">$.messages[*]</span> - the output will be a list of values, but the actions <span style="color:black">Get Value</span> or <span style="color:black">Get Key</span> will return only the first element from the list,i.e. <span style="color:black">m1</span>, not <span style="color:black">[m1, m2, m3]</span>. If you need a list, use the <span style="color:black">Get all values</span> or <span style="color:black">Get all keys</span> actions.</div>
    <div class="tr tooltip-paragraph-fold">You can use simple parameter names to get the value you need. For example, having the line from the previous example, you can specify a query of the form <span style="color:black">age</span> as a path and get the value of this property - <span style="color:black">100</span>.</div>
    <div class="tr tooltip-paragraph-last-fold">See full documentation and examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/BAS.Modules/jpath-documentation-en.html'); return false;"><span class="tr">here.</span></a></div>
</div>

<%= _.template($('#back').html())({ action : "executeandadd", visible : true }) %>