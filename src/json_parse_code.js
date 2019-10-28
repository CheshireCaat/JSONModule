try {
    var json = JSON.parse(<%= data %>)
    var simple = <%= simple %>
    var path = <%= path %>
    if (path == "") {
        <%= variable %> = json
    } else {
        var obj = jsonPath(json, path)
        if (simple) {
            if (obj instanceof Array) {
                if (obj.length === 1) {
                    <%= variable %> = obj[0]
                } else {
                    <%= variable %> = obj
                }
            } else {
                <%= variable %> = obj
            }
        } else {
            <%= variable %> = obj
        }
    }
} catch (e) {
    fail(e)
}