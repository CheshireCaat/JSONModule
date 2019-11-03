try {
	<%= variable %> = JPath.count(<%= data %>, <%= path %>);
}
catch (e) {
	fail(e);
}