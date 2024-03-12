using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSaisieEcheancier : ReferencesGenerales
    {
        public static string URL_SAISIE_ECHEANCIER = URL_ROOT_PROJET + "wsCtcontratecheancier.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_SAISIE_ECHEANCIER = URL_SAISIE_ECHEANCIER + "pvgAjouter";
        public static string URL_SELECT_SAISIE_ECHEANCIER = URL_SAISIE_ECHEANCIER + "pvgChargerDansDataSet";
        public static string URL_DELETE_SAISIE_ECHEANCIER = URL_SAISIE_ECHEANCIER + "pvgSupprimer";

    }
}