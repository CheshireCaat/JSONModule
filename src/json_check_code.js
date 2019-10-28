try
{
	JSON.parse(<%= data %>)
	<%= variable %> = true
}
catch(e)
{
	<%= variable %> = false
}