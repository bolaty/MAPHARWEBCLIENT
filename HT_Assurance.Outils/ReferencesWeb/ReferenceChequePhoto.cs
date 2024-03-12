using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebContratChequePhoto : ReferencesGenerales 
    {
        public static string URL_CHEQUE_PHOTO = URL_ROOT_PROJET + "wsCtcontratchequephoto.svc/";

        ///URL TEMPLATE

        public static string URL_AJOUTER_CHEQUE_PHOTO = URL_CHEQUE_PHOTO + "pvgAjouter";
        public static string URL_SELECT_CHEQUE_PHOTO = URL_CHEQUE_PHOTO + "pvgChargerDansDataSet";
        public static string URL_DELETE_CHEQUE_PHOTO = URL_CHEQUE_PHOTO + "pvgSupprimer";
        //public static string URL_MODIFICATION_CHEQUE_PHOTO = URL_CHEQUE_PHOTO + "pvgModifier";
    }
}