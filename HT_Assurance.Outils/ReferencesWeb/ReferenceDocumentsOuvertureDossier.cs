using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDocumentsOuvertureDossier : ReferencesGenerales
    {
        public static string URL_DOC_OUVRE_DOSSIER = URL_ROOT_PROJET + "wsCtsinistrephoto.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_DOC_OUVRE_DOSSIER = URL_DOC_OUVRE_DOSSIER + "pvgAjouter";
        public static string URL_MODIF_DOC_OUVRE_DOSSIER = URL_DOC_OUVRE_DOSSIER + "pvgModifier";
        public static string URL_DELETE_DOC_OUVRE_DOSSIER = URL_DOC_OUVRE_DOSSIER + "pvgSupprimer";
        public static string URL_SELECT_DOC_OUVRE_DOSSIER = URL_DOC_OUVRE_DOSSIER + "pvgChargerDansDataSet";
        public static string URL_COMBO_DOC_OUVRE_DOSSIER = URL_DOC_OUVRE_DOSSIER + "pvgChargerDansDataSetPourCombo";

    }
}