try {
    <%= variable %> = JPath.values(<%= data %>, <%= path %>);
} catch (e) {
    fail(e)
}