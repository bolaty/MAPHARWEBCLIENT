using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDroitAgence : ReferencesGenerales
    {
        public static string URL_DROIT_AGENCE = URL_ROOT_PROJET + "wsOperateurdroitagence.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_DROIT_AGENCE = URL_DROIT_AGENCE + "pvgChargerDansDataSet";
        public static string URL_AJOUTER_DROIT_AGENCE = URL_DROIT_AGENCE + "pvgAjouterdroit";
    }
}