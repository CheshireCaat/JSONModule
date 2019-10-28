var Save = this.$el.find("#Save").val().toUpperCase();
var Data = GetInputConstructorValue("String", loader);
var Paths = GetInputConstructorValue("Paths", loader);
var Simple = $("#Check").is(':checked');

if(Paths["original"].split('\n').length != Save.split(',').length)
{
  Invalid("Invalid ratio");
  return;
}

if(Paths["original"].split('\n').length <= 1)
{
  Invalid("Not multiple paths");
  return;
}

if(Data["original"].length == 0)
{
  Invalid("Data is empty");
  return;
}

if(Save.split(',').length <= 1)
{
  Invalid("Not multiple variables");
  return;
}

if(Save.length == 0)
{
  Invalid("Variable is empty");
  return;
}

try
{
  var code = loader.GetAdditionalData() + _.template($("#json_parse_all_code").html())(
  	{
      simple: Simple,
      variables: Save,
      data: Data["updated"],
  		paths: Paths["updated"]
  	})
  code = Normalize(code,0)
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}
catch(e)
{
  // pass error
}