using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebOperateur : ReferencesGenerales
    {
        public static string URL_Operateur = URL_ROOT_PROJET + "wsOperateur.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_Operateur = URL_Operateur + "pvgMiseAjour";
        public static string URL_SELECT_Operateur = URL_Operateur + "pvgChargerDansDataSetLOGIN";
        public static string URL_COMBO_OPERATEUR = URL_Operateur + "pvgChargerDansDataSetPourCombo";
        public static string URL_AJOUT_OPERATEUR = URL_Operateur + "pvgAjouter";
        public static string URL_UPDATE_OPERATEUR = URL_Operateur + "pvgModifier";
        public static string URL_DELETE_OPERATEUR = URL_Operateur + "pvgSupprimer";
        public static string URL_LISTE_Operateur = URL_Operateur + "pvgChargerDansDataSet";
        public static string URL_LISTE_MODIFICATION_ENTREPOT = URL_Operateur + "pvgChargerDansDataSetOperateurEntrepot";
        public static string URL_MODIFICATION_MOT_DE_PASSE = URL_Operateur + "pvgModifierOP_MOTPASSE";
    }
}