using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HT_Assurance.Startup))]
namespace HT_Assurance
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
