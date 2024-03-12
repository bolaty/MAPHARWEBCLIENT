using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDroitTransfertStock : ReferencesGenerales
    {
        public static string URL_DROIT_TRANSFERT_STOCK = URL_ROOT_PROJET + "wsOperateurdroitsaisiephaparentrepot.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_DROIT_TRANSFERT_STOCK = URL_DROIT_TRANSFERT_STOCK + "pvgChargerDansDataSet";
        public static string URL_AJOUTER_DROIT_TRANSFERT_STOCK = URL_DROIT_TRANSFERT_STOCK + "pvgAjouterdroit";
    }
}