using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebBanque : ReferencesGenerales 
    {
        public static string URL_BANQUE = URL_ROOT_PROJET + "wsBanque.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_BANQUE = URL_BANQUE + "pvgChargerDansDataSetPourCombo";

        public static string URL_SELECT_BANQUES = URL_BANQUE + "pvgChargerDansDataSet";
        public static string URL_INSERT_BANQUE = URL_BANQUE + "pvgAjouter";
        public static string URL_MODIFICATION_BANQUE = URL_BANQUE + "pvgModifier";
        public static string URL_SUPPRIME_BANQUE = URL_BANQUE + "pvgSupprimer";

    }
}