using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebJourneeTravail : ReferencesGenerales 
    {
        public static string URL_JOURNEE_TRAVAIL = URL_ROOT_PROJET + "wsJourneetravail.svc/";

        ///URL TEMPLATE
        
        public static string URL_LISTE_JOURNEE_TRAVAIL = URL_JOURNEE_TRAVAIL + "pvgChargerDansDataSet";
        public static string URL_AJOUT_JOURNEE_TRAVAIL = URL_JOURNEE_TRAVAIL + "pvgAjouter";
        public static string URL_UPDATE_JOURNEE_TRAVAIL = URL_JOURNEE_TRAVAIL + "pvgModifier";
        public static string URL_DELETE_JOURNEE_TRAVAIL = URL_JOURNEE_TRAVAIL + "pvgSupprimer";

    }
}