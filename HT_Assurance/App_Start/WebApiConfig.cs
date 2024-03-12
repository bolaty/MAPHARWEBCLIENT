using System.Web.Http;

namespace HT_Assurance
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuration et services API Web

            // Itinéraires de l'API Web
            config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultControllersEditions",
            //    routeTemplate: "ControllersEditions/{controller}/{action}/{id}",
            //    defaults: new { id = System.Web.Http.RouteParameter.Optional, }
            //);

            //config.Routes.MapHttpRoute(
            //    name: "DefaultControllersLogiciels",
            //    routeTemplate: "ControllersLogiciels/{controller}/{action}/{id}",
            //    defaults: new { id = System.Web.Http.RouteParameter.Optional, }
            //);


            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = System.Web.Http.RouteParameter.Optional, }
            );
        }
    }
}
