try {
    <%= variable %> = JPath.checkFormat(<%= data %>);
}
catch (e) {
    fail(e);
}
