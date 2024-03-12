using System.Web;
using System.Web.Optimization;

namespace HT_Assurance
{
    public class BundleConfig
    {
        // Pour plus d'informations sur le regroupement, visitez http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/templatejs").Include(
                        "~/Scripts/assets/js/js.js",
                        "~/Scripts/assets/plugins/global/plugins.bundle.js",
                        "~/Scripts/assets/plugins/custom/prismjs/prismjs.bundle.js",
                        "~/Scripts/assets/js/scripts.bundle.js", 
                        "~/Scripts/assets/plugins/custom/fullcalendar/fullcalendar.bundle.js",
                        "~/Scripts/assets/js/pages/widgets.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                        "~/Scripts/angularjs/angular.js",
                        "~/Scripts/angularjs/angular.min.js",
                        "~/Scripts/angularjs/angular-route.js",
                        "~/Scripts/angularjs/angular-route.min.js",
                        "~/Scripts/angularjs/angular-ressource.js",
                        "~/Scripts/angularjs/angular-ressource.min.js",
                        "~/Scripts/angularjs/angular-cookies.js",
                        "~/Scripts/angularjs/angular-cookies.min.js"                        
                        ));

            bundles.Add(new ScriptBundle("~/bundles/script").Include(
                       "~/App/module.js",
                        "~/App/routing.js"
                       ));
           

            bundles.Add(new StyleBundle("~/Content/templatecss").Include(
                    "~/dist/assets/plugins/custom/datatables/datatables.bundle.css",
                    "~/dist/assets/plugins/custom/fullcalendar/fullcalendar.bundle.css",
                    "~/dist/assets/plugins/global/plugins.bundle.css",
                    "~/dist/assets/plugins/custom/prismjs/prismjs.bundle.css",
                    "~/dist/assets/css/pages/login/classic/login-4.css",
                    "~/dist/assets/css/style.bundle.css",
                    "~/dist/assets/css/themes/layout/header/base/light.css",
                    "~/dist/assets/css/themes/layout/header/menu/light.css",
                    "~/dist/assets/css/themes/layout/brand/dark.css",
                    "~/dist/assets/css/themes/layout/aside/custum.css"));
        }
    }
}
