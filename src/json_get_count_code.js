try
{
	<%= variable %> = JPath.getCount(<%= data %>, <%= path %>);
}
catch (e)
{
	fail(e);
}