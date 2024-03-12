using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebQuestionnaires : ReferencesGenerales
    {
        public static string URL_QUESTIONNAIRES = URL_ROOT_PROJET + "wsCtcontratquestionnaire.svc/";

        ///URL TEMPLATE

        public static string URL_AJOUTER_QUESTIONNAIRES = URL_QUESTIONNAIRES + "pvgAjouter";
        public static string URL_MODIFIER_QUESTIONNAIRES = URL_QUESTIONNAIRES + "pvgModifier";
        public static string URL_SELECT_QUESTIONNAIRES = URL_QUESTIONNAIRES + "pvgChargerDansDataSet";
        public static string URL_SUPPRIMER_QUESTIONNAIRES = URL_QUESTIONNAIRES + "pvgSupprimer";
        
    }
}