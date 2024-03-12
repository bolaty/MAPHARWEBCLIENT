using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebLesTiers : ReferencesGenerales
    {
        public static string URL_LES_TIERS = URL_ROOT_PROJET + "wsPhatiers.svc/";
        public static string URL_LES_PROSPECT = URL_ROOT_PROJET + "wsOrgProspects.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_LES_TIERS = URL_LES_TIERS + "pvgChargerDansDataSetTiers";
        public static string URL_DELETE_LES_TIERS = URL_LES_TIERS + "pvgSupprimer";
        public static string URL_AJOUT_DES_TIERS = URL_LES_TIERS + "pvgAjouter";
        public static string URL_SELECT_LE_TIERS = URL_LES_TIERS + "pvgChargerRechercheTiersparNom";
        public static string URL_DEPART_TIERS = URL_LES_TIERS + "pvgDepartTiers";

        //PROSPECT

        public static string URL_SELECT_LES_PROSPECT = URL_LES_PROSPECT + "pvgChargerDansDataSetTiers";
        public static string URL_DELETE_LES_PROSPECT = URL_LES_PROSPECT + "pvgSupprimer";
        public static string URL_AJOUT_DES_PROSPECT = URL_LES_PROSPECT + "pvgAjouter";
        public static string URL_SELECT_LE_PROSPECT = URL_LES_PROSPECT + "pvgChargerRechercheTiersparNom";
    }
}