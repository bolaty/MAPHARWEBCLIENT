using System.Configuration;

namespace Assurance.Outils
{
    public class ReferencesGenerales
    {

        #region URL_WEB_SERVICE

        //URL_EDITION
        public static string URL_ROOT_EDITION = ConfigurationManager.AppSettings["URL_ROOT_EDITION"];
        
        //URL_PROJET
        public static string URL_ROOT_PROJET = ConfigurationManager.AppSettings["URL_ROOT_PROJET"];

        #endregion

        #region URL_DOSSIERS

        // URL_DOSSIER
        public static string URL_ROOT_DOSSIER = ConfigurationManager.AppSettings["URL_ROOT_DOSSIER"];

        #endregion

    }
}
