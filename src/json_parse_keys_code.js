try {
    <%= variable %> = JPath.keys(<%= data %>, <%= path %>);
} catch (e) {
    fail(e)
}