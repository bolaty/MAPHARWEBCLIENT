using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebRelance : ReferencesGenerales
    {
        public static string URL_RELANCE = URL_ROOT_PROJET + "wsSmsout.svc/";

        ///URL TEMPLATE
        
        public static string URL_ADD_RELANCE = URL_RELANCE + "pvgAjouter";

    }
}