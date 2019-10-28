try {
    <%= variable %> = JPath.queryValues(<%= data %>, <%= path %>);
} catch (e) {
    fail(e)
}