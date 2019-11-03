var Save = this.$el.find("#Save").val().toUpperCase();
var Data = GetInputConstructorValue("Data", loader);
var Path = GetInputConstructorValue("Path", loader);

if (Data["original"].length == 0) {
    Invalid("Data to count is empty");
    return;
}

if (Save.length == 0) {
    Invalid("Variable to save is empty");
    return;
}

try {
    var code = loader.GetAdditionalData() + _.template($("#json_get_count_code").html())(
        {
            variable: "VAR_" + Save,
            data: Data["updated"],
            path: Path["updated"]
        });
    code = Normalize(code, 0);
    BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}
catch (e) {
    // pass error
}