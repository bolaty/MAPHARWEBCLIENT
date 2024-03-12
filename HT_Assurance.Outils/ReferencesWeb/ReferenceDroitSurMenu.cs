using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDroitSurDroitSurMenu : ReferencesGenerales
    {
        public static string URL_DROIT_SUR_MENU = URL_ROOT_PROJET + "wsOperateurdroit.svc/";
        public static string URL_OperateurEcran = URL_ROOT_PROJET + "wsOperateurdroit.svc/";
        ///URL TEMPLATE
        public static string URL_LISTE_ECRAN = URL_OperateurEcran + "pvgChargerDansDataSetOperateurDroit";
        public static string URL_LISTE_DROIT_SUR_MENU = URL_DROIT_SUR_MENU + "pvgChargerDansDataSet";
        public static string URL_AJOUT_DROIT_SUR_MENU = URL_DROIT_SUR_MENU + "pvgAjouterdroit";
    }
}