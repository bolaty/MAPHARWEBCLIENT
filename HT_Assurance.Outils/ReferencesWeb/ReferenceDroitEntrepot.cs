using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDroitEntrepot : ReferencesGenerales
    {
        public static string URL_DROIT_ENTREPOT = URL_ROOT_PROJET + "wsOperateurdroitphaparentrepot.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_DROIT_ENTREPOT = URL_DROIT_ENTREPOT + "pvgChargerDansDataSet";
        public static string URL_AJOUTER_DROIT_ENTREPOT = URL_DROIT_ENTREPOT + "pvgAjouterdroit";
    }
}