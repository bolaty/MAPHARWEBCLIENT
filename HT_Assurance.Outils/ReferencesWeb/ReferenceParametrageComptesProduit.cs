using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceParametrageComptesProduit : ReferencesGenerales 
    {
        public static string URL_PARAMETRAGECOMPTEPRODUIT = URL_ROOT_PROJET + "wsPhapartypearticleoperation.svc/";
        public static string URL_OPERATION = URL_ROOT_PROJET + "wsPhapartypearticleoperationparametre.svc/";
        public static string URL_PARAMETRAGEPRODUIT = URL_ROOT_PROJET + "wsPhapartypearticlecompteplancomptablemodel.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_PARAMETRAGECOMPTEPRODUIT = URL_PARAMETRAGECOMPTEPRODUIT + "pvgChargerDansDataSetPourCombo";
        public static string URL_SELECT_OPERATION = URL_OPERATION + "pvgChargerDansDataSetModel";
        public static string URL_SELECT_PARAMETRAGEPRODUIT = URL_PARAMETRAGEPRODUIT + "pvgModifier";
    }
}