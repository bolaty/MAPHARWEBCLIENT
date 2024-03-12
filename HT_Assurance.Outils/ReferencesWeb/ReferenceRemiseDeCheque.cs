using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebRemiseDeCheque : ReferencesGenerales
    {
        public static string URL_REMISE_DE_CHEQUE = URL_ROOT_PROJET + "wsCtsinistrecheque.svc/";

        ///URL TEMPLATE

        
        
        public static string URL_AJOUTER_REMISE_DE_CHEQUE = URL_REMISE_DE_CHEQUE + "pvgAjouter";
        public static string URL_SELECT_REMISE_DE_CHEQUE = URL_REMISE_DE_CHEQUE + "pvgChargerDansDataSet";
        public static string URL_MODIFIER_REMISE_DE_CHEQUE = URL_REMISE_DE_CHEQUE + "pvgModifier";
        public static string URL_SUPPRIMER_REMISE_DE_CHEQUE = URL_REMISE_DE_CHEQUE + "pvgSupprimer";

    }
}