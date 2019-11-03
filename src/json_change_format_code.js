try {
	<%= variable %> = JPath.changeFormat(<%= data %>, <%= type %>);
}
catch (e) {
	fail(e);
}