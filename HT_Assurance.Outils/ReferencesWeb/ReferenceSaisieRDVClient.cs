using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSaisieRDVClient : ReferencesGenerales
    {
        public static string URL_SAISIERDVCLIENT = URL_ROOT_PROJET + "wsCtcontratrendezvousclient.svc/";

        ///URL TEMPLATE

        public static string URL_AJOUTER_SAISIERDVCLIENT = URL_SAISIERDVCLIENT + "pvgAjouter";
        public static string URL_MODIFIER_SAISIERDVCLIENT = URL_SAISIERDVCLIENT + "pvgModifier";
        public static string URL_SELECT_SAISIERDVCLIENT = URL_SAISIERDVCLIENT + "pvgChargerDansDataSet";
        public static string URL_SUPPRIMER_SAISIERDVCLIENT = URL_SAISIERDVCLIENT + "pvgSupprimer";
        
    }
}