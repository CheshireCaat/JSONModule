try {
    <%= variable %> = JPath.key(<%= data %>, <%= path %>);
} catch (e) {
    fail(e)
}