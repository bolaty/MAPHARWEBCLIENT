using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebBanqueAgence : ReferencesGenerales 
    {
        public static string URL_BANQUE_AGENCE = URL_ROOT_PROJET + "wsBanqueagence.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_BANQUE_AGENCE = URL_BANQUE_AGENCE + "pvgChargerDansDataSetPourCombo";

        public static string URL_SELECT_BANQUES = URL_BANQUE_AGENCE + "pvgChargerDansDataSet";
        public static string URL_INSERT_BANQUE = URL_BANQUE_AGENCE + "pvgAjouter";
        public static string URL_MODIFICATION_BANQUE = URL_BANQUE_AGENCE + "pvgModifier";
        public static string URL_SUPPRIME_BANQUE = URL_BANQUE_AGENCE + "pvgSupprimer";
    }
}