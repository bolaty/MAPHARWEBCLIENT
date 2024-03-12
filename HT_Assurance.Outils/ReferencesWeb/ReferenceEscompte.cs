using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebEscompte : ReferencesGenerales
    {
        public static string URL_ESCOMPTE = URL_ROOT_PROJET + "wsEscompte.svc/";

        ///URL TEMPLATE

        public static string URL_SELECT_ESCOMPTE = URL_ESCOMPTE + "pvgChargerDansDataSetPourCombo";

    }
}