using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebModeAdmission : ReferencesGenerales
    {
        public static string URL_MODE_ADMISSION = URL_ROOT_PROJET + "wsCliparmodeadmission.svc/";

        ///URL TEMPLATE

       
        public static string URL_SELECT_MODE_ADMISSION = URL_MODE_ADMISSION + "pvgChargerDansDataSetPourCombo";

    }
}