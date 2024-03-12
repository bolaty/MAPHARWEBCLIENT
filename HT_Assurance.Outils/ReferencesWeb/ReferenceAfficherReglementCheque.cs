using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceAfficherReglementCheque : ReferencesGenerales
    {
        public static string URL_EDITIONTRESORERIECHEQUE = URL_ROOT_PROJET + "wsCtcontratchequephoto.svc/";


        ///URL TEMPLATE
        public static string URL_INSERT_EDITION_TRESORERIE_CHEQUE = URL_EDITIONTRESORERIECHEQUE + "pvgChargerDansDataSetPhotoAfficher";
        public static string URL_SELECT_REMISE_CHEQUE = URL_EDITIONTRESORERIECHEQUE + "pvgChargerDansDataSetContratCheque";
    }
}