try
{
	var json = JSON.parse(<%= data %>)
	var path = <%= path %>
	if(path == "") {
		<%= variable %> = Object.keys(json)
	}
	else {
		<%= variable %> = jsonKeys(json, path)
	}
}
catch(e)
{
	fail(e)
}