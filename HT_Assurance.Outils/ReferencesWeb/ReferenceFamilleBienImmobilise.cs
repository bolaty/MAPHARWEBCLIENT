using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceFamilleBienImmobilise : ReferencesGenerales
    {
        public static string URL_FBI = URL_ROOT_PROJET + "wsBienimmobilisefamille.svc/";

        // URL TEMPLATE
        public static string URL_SELECT_LISTE_FBI = URL_FBI + "pvgChargerDansDataSet";

        public static string URL_INSERT_FBI = URL_FBI + "pvgAjouter";
        public static string URL_UPDATE_FBI = URL_FBI + "pvgModifier";
        public static string URL_DELETE_FBI = URL_FBI + "pvgSupprimer";
    }
}