try {
    <%= variable %> = JPath.queryKeys(<%= data %>, <%= path %>);
} catch (e) {
    fail(e)
}