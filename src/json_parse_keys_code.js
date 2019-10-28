try
{
	var paths = (<%= paths %>).split("\n")
	<% var list = variables.split(",") %>
	var json = JSON.parse(<%= data %>)
	<% for(var i = 0; i < list.length; i++) { %>
		if(paths[<%= i %>] == "")
		{
			VAR_<%= list[i] %> = Object.keys(json)
		}
  		else
  		{
  			VAR_<%= list[i] %> = jsonKeys(json, paths[<%= i %>])
  		}
	<% } %>
}
catch(e)
{
	fail(e)
}