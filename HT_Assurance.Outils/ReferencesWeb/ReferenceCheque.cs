using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebContratCheque : ReferencesGenerales 
    {
        public static string URL_CHEQUE = URL_ROOT_PROJET + "wsCtcontratcheque.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_CHEQUE = URL_CHEQUE + "pvgAjouter";
        public static string URL_SELECT_CHEQUE = URL_CHEQUE + "pvgChargerDansDataSet";
        public static string URL_DELETE_CHEQUE = URL_CHEQUE + "pvgSupprimer";
        public static string URL_MODIFICATION_CHEQUE = URL_CHEQUE + "pvgModifier";
        public static string URL_VALIDATION_CHEQUE = URL_CHEQUE + "pvgModifier";
    }
}