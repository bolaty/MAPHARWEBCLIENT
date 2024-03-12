using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceExpertNomme : ReferencesGenerales 
    {
        public static string URL_EXPERTNOMME = URL_ROOT_PROJET + "wsCtsinitreexpertnomme.svc/";

        ///URL TEMPLATE
        
        public static string URL_INSERT_EXPERTNOMME = URL_EXPERTNOMME + "pvgAjouter";
        public static string URL_UPDATE_EXPERTNOMME = URL_EXPERTNOMME + "pvgModifier";
        public static string URL_DELETE_EXPERTNOMME = URL_EXPERTNOMME + "pvgSupprimer";
        public static string URL_SELECT_EXPERTNOMME = URL_EXPERTNOMME + "pvgChargerDansDataSet";
        public static string URL_SELECTCOMBO_EXPERTNOMME = URL_EXPERTNOMME + "pvgChargerDansDataSetPourCombo";

    }
}