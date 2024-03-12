using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebTypeVehicule : ReferencesGenerales
    {
        public static string URL_TYPE_VEHICULE = URL_ROOT_PROJET + "wsTypevehicule.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_TYPE_VEHICULE = URL_TYPE_VEHICULE + "pvgMiseAjour";
        public static string URL_SELECT_TYPE_VEHICULE = URL_TYPE_VEHICULE + "pvgChargerDansDataSetPourCombo";
        public static string URL_AJOUT_TYPE_VEHICULE = URL_TYPE_VEHICULE + "pvgAjouter";
        public static string URL_LISTE_TYPE_VEHICULE = URL_TYPE_VEHICULE + "pvgChargerDansDataSet";
        public static string URL_DELETE_TYPE_VEHICULE = URL_TYPE_VEHICULE + "pvgSupprimer";
        public static string URL_UPDATE_TYPE_VEHICULE = URL_TYPE_VEHICULE + "pvgModifier";

    }
}