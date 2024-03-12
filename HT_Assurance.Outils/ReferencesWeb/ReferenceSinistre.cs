using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSinistre : ReferencesGenerales
    {
        public static string URL_SINISTRE = URL_ROOT_PROJET + "wsCtparnaturesinistre.svc/";

        ///URL TEMPLATE
      
        public static string URL_SELECT_SINISTRE1 = URL_SINISTRE + "pvgChargerDansDataSetPourCombo";
    }

    public class ReferencesWebSinistre1 : ReferencesGenerales
    {
        public static string URL_SINISTRE = URL_ROOT_PROJET + "wsCtsinistre.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_SINISTRE = URL_SINISTRE + "pvgAjouter";
        public static string URL_MISE_A_JOUR2_SINISTRE = URL_SINISTRE + "pvgModifier";
        public static string URL_SELECT_SINISTRE = URL_SINISTRE + "pvgChargerDansDataSet";
        public static string URL_DELETE_SINISTRE = URL_SINISTRE + "pvgSupprimer";
        public static string URL_ACTIONS_SUR_LES_SINISTRES = URL_SINISTRE + "pvgMiseAjourStatutContrat";
        public static string URL_MODIF_TRANSMISSION = URL_SINISTRE + "pvgMiseAjourStatutContrat";
        public static string URL_MODIF_VALIDATION = URL_SINISTRE + "pvgMiseAjourStatutContrat";
        public static string URL_MODIF_MONTANTVALIDE = URL_SINISTRE + "pvgMiseAjourStatutContrat";
    }

    public class ReferencesWebSinistre2 : ReferencesGenerales
    {
        public static string URL_SINISTRE = URL_ROOT_PROJET + "wsCtsinistresuivie.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_SINISTRE = URL_SINISTRE + "pvgAjouter";
        public static string URL_MISE_A_JOUR2_SINISTRE = URL_SINISTRE + "pvgModifier";
        public static string URL_SELECT_SINISTRE = URL_SINISTRE + "pvgChargerDansDataSet";
        public static string URL_DELETE_SINISTRE = URL_SINISTRE + "pvgSupprimer";
    }

    //PHOTO DES SINISTRES
    public class ReferencesWebSinistrePhoto : ReferencesGenerales
    {
        public static string URL_SINISTRE_PHOTO = URL_ROOT_PROJET + "wsCtsinistrephoto.svc/";

        ///URL TEMPLATE

        public static string URL_INSERT_PHOTO = URL_SINISTRE_PHOTO + "pvgAjouter";
        public static string URL_LIST_PHOTO = URL_SINISTRE_PHOTO + "pvgChargerDansDataSet";
        public static string URL_DELETE_PHOTO = URL_SINISTRE_PHOTO + "pvgSupprimer";
    }
}