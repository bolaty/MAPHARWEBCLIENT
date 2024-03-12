using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebProfils : ReferencesGenerales
    {
        public static string URL_PROFILS = URL_ROOT_PROJET + "wsProfilweb.svc/";

        ///URL TEMPLATE

        
        
        public static string URL_AJOUTER_PROFILS = URL_PROFILS + "pvgAjouter";
        public static string URL_SELECT_PROFILS = URL_PROFILS + "pvgChargerDansDataSet";
        public static string URL_MODIFIER_PROFILS = URL_PROFILS + "pvgModifier";
        public static string URL_SUPPRIMER_PROFILS = URL_PROFILS + "pvgSupprimer";

    }
}