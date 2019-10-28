try {
    var paths = (<%= paths %>).split("\n")
    <% var list = variables.split(",") %>
    var json = JSON.parse(<%= data %>)
    var simple = <%= simple %>
    <% for(var i = 0; i < list.length; i++) { %>
	    if (paths[<%= i %>] == "") {
	        VAR_<%= list[i] %> = json
	    } else {
	        var obj = jsonPath(json, paths[<%= i %>])
	        if (simple) {
	            if (obj instanceof Array) {
	                if (obj.length === 1) {
	                    VAR_<%= list[i] %> = obj[0]
	                } else {
	                    VAR_<%= list[i] %> = obj
	                }
	            } else {
	                VAR_<%= list[i] %> = obj
	            }
	        } else {
	            VAR_<%= list[i] %> = obj
	        }
	    }
    <% } %>
} catch (e) {
    fail(e)
}