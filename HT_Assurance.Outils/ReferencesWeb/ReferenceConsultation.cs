using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebConsultation : ReferencesGenerales
    {
        public static string URL_CONSULTATION = URL_ROOT_PROJET + "wsCliconsultation.svc/";

        ///URL TEMPLATE

        public static string URL_AJOUTER_CONSULTATION = URL_CONSULTATION + "pvgAjouter";
        public static string URL_LISTE_CONSULTATION = URL_CONSULTATION + "pvgChargerDansDataSetConsultation";
        public static string URL_DELETE_CONSULTATION = URL_CONSULTATION + "pvgSupprimer";
        public static string URL_MODIFICATION_CONSULTATION = URL_CONSULTATION + "pvgModifier";
    }
}