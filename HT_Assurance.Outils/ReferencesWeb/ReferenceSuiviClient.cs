using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSuiviClient : ReferencesGenerales
    {
        public static string URL_SUIVICLIENT = URL_ROOT_PROJET + "wsCtcontratsuivieclient.svc/";

        ///URL TEMPLATE

        public static string URL_AJOUTER_SUIVICLIENT = URL_SUIVICLIENT + "pvgAjouter";
        public static string URL_MODIFIER_SUIVICLIENT = URL_SUIVICLIENT + "pvgModifier";
        public static string URL_SELECT_SUIVICLIENT = URL_SUIVICLIENT + "pvgChargerDansDataSet";
        public static string URL_SUPPRIMER_SUIVICLIENT = URL_SUIVICLIENT + "pvgSupprimer";
        
    }
}