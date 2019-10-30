try {
    <%= variable %> = JPath.queryKey(<%= data %>, <%= path %>);
} catch (e) {
    fail(e)
}