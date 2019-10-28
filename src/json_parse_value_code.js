try {
    <%= variable %> = JPath.queryValue(<%= data %>, <%= path %>);
} catch (e) {
    fail(e)
}