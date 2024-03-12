using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebGroupeDesTiers : ReferencesGenerales
    {
        public static string URL_GROUPE_DES_TIERS = URL_ROOT_PROJET + "wsPhatiersgroupe.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_GROUPE_DES_TIERS = URL_GROUPE_DES_TIERS + "pvgChargerDansDataSetPourCombo";
        public static string URL_AJOUTER_GROUPE_DES_TIERS = URL_GROUPE_DES_TIERS + "pvgAjouter";
        public static string URL_SELECT_LISTE_GROUPE_DES_TIERS = URL_GROUPE_DES_TIERS + "pvgChargerDansDataSet";
        public static string URL_MODIFIER_GROUPE_DES_TIERS = URL_GROUPE_DES_TIERS + "pvgModifier";
        public static string URL_SUPPRIMER_GROUPE_DES_TIERS = URL_GROUPE_DES_TIERS + "pvgSupprimer";

    }
}