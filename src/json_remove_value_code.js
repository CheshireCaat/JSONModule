try {
    <%= variable %> = JPath.remove(<%= data %>, <%= path %>);
}
catch (e) {
    fail(e);
}