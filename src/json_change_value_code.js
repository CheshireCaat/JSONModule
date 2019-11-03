try {
    <%= variable %> = JPath.change(<%= data %>, <%= path %>, <%= value %>);
}
catch (e) {
    fail(e);
}