#pragma checksum "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Edit.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "183a23b4a9b6447ec3a4c34f3b02c47d18cc4122"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Exercises_Edit), @"mvc.1.0.view", @"/Views/Exercises/Edit.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"183a23b4a9b6447ec3a4c34f3b02c47d18cc4122", @"/Views/Exercises/Edit.cshtml")]
    public class Views_Exercises_Edit : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<MeFitAPI.Models.Exercise>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\n");
#nullable restore
#line 3 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Edit.cshtml"
  
    ViewData["Title"] = "Edit";

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
<h1>Edit</h1>

<h4>Exercise</h4>
<hr />
<div class=""row"">
    <div class=""col-md-4"">
        <form asp-action=""Edit"">
            <div asp-validation-summary=""ModelOnly"" class=""text-danger""></div>
            <input type=""hidden"" asp-for=""ExerciseId"" />
            <div class=""form-group"">
                <label asp-for=""Name"" class=""control-label""></label>
                <input asp-for=""Name"" class=""form-control"" />
                <span asp-validation-for=""Name"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""Description"" class=""control-label""></label>
                <input asp-for=""Description"" class=""form-control"" />
                <span asp-validation-for=""Description"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""TargetMuscleGroup"" class=""control-label""></label>
                <input asp-for=""TargetMuscleGroup"" class=""form-control"" />
                <span asp-va");
            WriteLiteral(@"lidation-for=""TargetMuscleGroup"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""Image"" class=""control-label""></label>
                <input asp-for=""Image"" class=""form-control"" />
                <span asp-validation-for=""Image"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <label asp-for=""VidLink"" class=""control-label""></label>
                <input asp-for=""VidLink"" class=""form-control"" />
                <span asp-validation-for=""VidLink"" class=""text-danger""></span>
            </div>
            <div class=""form-group"">
                <input type=""submit"" value=""Save"" class=""btn btn-primary"" />
            </div>
        </form>
    </div>
</div>

<div>
    <a asp-action=""Index"">Back to List</a>
</div>

");
            DefineSection("Scripts", async() => {
                WriteLiteral("\n");
#nullable restore
#line 53 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Edit.cshtml"
      await Html.RenderPartialAsync("_ValidationScriptsPartial");

#line default
#line hidden
#nullable disable
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<MeFitAPI.Models.Exercise> Html { get; private set; }
    }
}
#pragma warning restore 1591
