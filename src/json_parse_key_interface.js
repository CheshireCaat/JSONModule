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
            default_variable: "PARSED_JSON_KEY",
            help:
            {
              description: tr("Variable that stores the result of parsing (First key only).")
            }
        }) %>
</div>

<div class="tooltipinternal">
    <div class="tr tooltip-paragraph-first-fold">Execute JPath query and get one key (first matching).</div>
    <div class="tr tooltip-paragraph-fold">If an error occurs during parsing, an empty string will be returned.</div>
    <div class="tr tooltip-paragraph-fold">JSONPath query should not be empty. If you want to change the data format, use the <span style="color:black">Change format</span> action.</div>
    <div class="tr tooltip-paragraph-fold">JSON is a text format for data exchange, serialization (storage) of objects, arrays, numbers, strings, logical values ​​and <span style="color:black">null</span> values. It is based on JavaScript syntax, but still different from it: not every JavaScript code is JSON, and not every JSON is JavaScript code.</div>
    <div class="tr tooltip-paragraph-fold">JSONPath (JPath) is a powerful tool for working with the JSON data type. It is built on the basis of logic, which is very similar to XPath, but has some limitations, because the data type itself is much simpler than Xml.</div>
    <div class="tr tooltip-paragraph-fold">Using this technology, we can quickly get data from JavaScript objects or strings in JSON format. In addition, this greatly simplifies the work, as usually, parsing JSON requires writing code.</div>
    <div class="tr tooltip-paragraph-fold">Typical examples of using this function are working with the API of a website or, more often in the context of BAS, working with Cookies. In BAS, cookies are presented to the user in JSON format strings. This often causes difficulties. But with JSONPath, you can easily get the data you need.</div>
    <div class="tr tooltip-paragraph-fold">Consider an example. Suppose we got a line of the form <span style="color:black">{"Kate":{"rating":5,"count":6},"John":{"rating":1,"count":2}}</span> from a particular site. We want to get the names of people whose rating is greater than or equal to 1. This can easily be done using a query like <span style="color:black">$.[?(@.rate &gt;= 1)]</span>. Thus, as a result, we get a first name satisfying our request.</div>
    <div class="tr tooltip-paragraph-fold">Please note, if you use this action - the output will be always a single value, but the action <span style="color:black">Get all keys</span> will return all elements as list.</div>
    <div class="tr tooltip-paragraph-last-fold">See full documentation and examples <a href="#" onclick="BrowserAutomationStudio_OpenUrl('https://cheshirecaat.github.io/BAS.Modules/jpath-documentation-en.html'); return false;"><span class="tr">here.</span></a></div>
</div>

<%= _.template($('#back').html())({ action : "executeandadd", visible : true }) %>