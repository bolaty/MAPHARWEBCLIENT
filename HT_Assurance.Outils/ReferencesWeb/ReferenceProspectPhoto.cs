using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceProspectPhoto : ReferencesGenerales 
    {
        public static string URL_PROSPECTPHOTO = URL_ROOT_PROJET + "wsOrgProspectsPhoto.svc/";
        public static string URL_TIERPHOTO = URL_ROOT_PROJET + "wsPhatiersphoto.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_PHOTOPROSPECT = URL_PROSPECTPHOTO + "pvgChargerDansDataSet";
        public static string URL_SELECT_TIERPHOTO = URL_TIERPHOTO + "pvgChargerDansDataSet";

    }
}