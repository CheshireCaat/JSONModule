try {
    <%= variable %> = JPath.value(<%= data %>, <%= path %>);
} catch (e) {
    fail(e)
}