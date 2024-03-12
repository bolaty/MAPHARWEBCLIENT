using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebRemiseDeChequePhoto : ReferencesGenerales 
    {
        public static string URL_REMISE_DE_CHEQUE_PHOTO = URL_ROOT_PROJET + "wsCtsinistrechequephoto.svc/";

        ///URL TEMPLATE

        public static string URL_MISE_A_JOUR_REMISE_DE_CHEQUE_PHOTO = URL_REMISE_DE_CHEQUE_PHOTO + "pvgAjouter";
        public static string URL_SELECT_REMISE_DE_CHEQUE_PHOTO = URL_REMISE_DE_CHEQUE_PHOTO + "pvgChargerDansDataSet";
        public static string URL_DELETE_REMISE_DE_CHEQUE_PHOTO = URL_REMISE_DE_CHEQUE_PHOTO + "pvgSupprimer";
        //public static string URL_MODIFICATION_REMISE_DE_CHEQUE_PHOTO = URL_REMISE_DE_CHEQUE_PHOTO + "pvgModifier";
    }
}