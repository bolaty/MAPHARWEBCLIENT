using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDroitSurAutreOperationTiers : ReferencesGenerales
    {
        public static string URL_DROIT_SUR_AUTRE_OPERATION_TIERS = URL_ROOT_PROJET + "wsLogicielobjettypeschemacomptableoperateur.svc/";

        ///URL TEMPLATE
        
        public static string URL_LISTE_DROIT_SUR_AUTRE_OPERATION_TIERS = URL_DROIT_SUR_AUTRE_OPERATION_TIERS + "pvgChargerDansDataSetOperateurDroit";
        public static string URL_AJOUT_DROIT_SUR_AUTRE_OPERATION_TIERS = URL_DROIT_SUR_AUTRE_OPERATION_TIERS + "pvgAjouterdroit";
    }
}