using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDroitSurOperationTresorerie : ReferencesGenerales
    {
        public static string URL_DROIT_SUR_OPERATION_TRESORRIE = URL_ROOT_PROJET + "wsLogicielobjettypeschemacomptableoperateur.svc/";

        ///URL TEMPLATE
        
        public static string URL_LISTE_DROIT_SUR_OPERATION_TRESORRIE= URL_DROIT_SUR_OPERATION_TRESORRIE + "pvgChargerDansDataSetOperateurDroit";
        public static string URL_AJOUT_DROIT_SUR_OPERATION_TRESORRIE = URL_DROIT_SUR_OPERATION_TRESORRIE + "pvgAjouterdroit";
    }
}