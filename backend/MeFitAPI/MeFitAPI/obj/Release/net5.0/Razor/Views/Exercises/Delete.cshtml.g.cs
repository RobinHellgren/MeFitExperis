#pragma checksum "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d49ac679853315df560edb8d996396019a97b9fb"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Exercises_Delete), @"mvc.1.0.view", @"/Views/Exercises/Delete.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d49ac679853315df560edb8d996396019a97b9fb", @"/Views/Exercises/Delete.cshtml")]
    public class Views_Exercises_Delete : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<MeFitAPI.Models.Exercise>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\n");
#nullable restore
#line 3 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
  
    ViewData["Title"] = "Delete";

#line default
#line hidden
#nullable disable
            WriteLiteral("\n<h1>Delete</h1>\n\n<h3>Are you sure you want to delete this?</h3>\n<div>\n    <h4>Exercise</h4>\n    <hr />\n    <dl class=\"row\">\n        <dt class = \"col-sm-2\">\n            ");
#nullable restore
#line 15 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.Name));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n        </dt>\n        <dd class = \"col-sm-10\">\n            ");
#nullable restore
#line 18 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
       Write(Html.DisplayFor(model => model.Name));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n        </dd>\n        <dt class = \"col-sm-2\">\n            ");
#nullable restore
#line 21 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.Description));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n        </dt>\n        <dd class = \"col-sm-10\">\n            ");
#nullable restore
#line 24 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
       Write(Html.DisplayFor(model => model.Description));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n        </dd>\n        <dt class = \"col-sm-2\">\n            ");
#nullable restore
#line 27 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.TargetMuscleGroup));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n        </dt>\n        <dd class = \"col-sm-10\">\n            ");
#nullable restore
#line 30 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
       Write(Html.DisplayFor(model => model.TargetMuscleGroup));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n        </dd>\n        <dt class = \"col-sm-2\">\n            ");
#nullable restore
#line 33 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.Image));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n        </dt>\n        <dd class = \"col-sm-10\">\n            ");
#nullable restore
#line 36 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
       Write(Html.DisplayFor(model => model.Image));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n        </dd>\n        <dt class = \"col-sm-2\">\n            ");
#nullable restore
#line 39 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
       Write(Html.DisplayNameFor(model => model.VidLink));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n        </dt>\n        <dd class = \"col-sm-10\">\n            ");
#nullable restore
#line 42 "C:\Users\rhellg\Workspace\MeFitExperis\backend\MeFitAPI\MeFitAPI\Views\Exercises\Delete.cshtml"
       Write(Html.DisplayFor(model => model.VidLink));

#line default
#line hidden
#nullable disable
            WriteLiteral("\n        </dd>\n    </dl>\n    \n    <form asp-action=\"Delete\">\n        <input type=\"hidden\" asp-for=\"ExerciseId\" />\n        <input type=\"submit\" value=\"Delete\" class=\"btn btn-danger\" /> |\n        <a asp-action=\"Index\">Back to List</a>\n    </form>\n</div>\n");
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
