using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceSaisieEcritureComptable : ReferencesGenerales
    {
        public static string URL_SAISIE_ECRITURECOMPTABLE = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_SAISIE_ECRITURECOMPTABLE = URL_SAISIE_ECRITURECOMPTABLE + "pvgAjouterListeChargeAvecRepartition";
      
        public static string URL_DELETE_SAISIE_ECRITURECOMPTABLE = URL_SAISIE_ECRITURECOMPTABLE + "pvgSupprimer";

    }
}