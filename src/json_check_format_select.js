var Save = this.$el.find("#Save").val().toUpperCase();
var Data = GetInputConstructorValue("Data", loader);

if (Data["original"].length == 0) {
    Invalid("Data is empty");
    return;
}

if (Save.length == 0) {
    Invalid("Variable is empty");
    return;
}

try {
    var code = loader.GetAdditionalData() + _.template($("#json_check_format_code").html())(
        {
            variable: "VAR_" + Save,
            data: Data["updated"],
        });
    code = Normalize(code, 0);
    BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}
catch (e) {
    // pass error
}