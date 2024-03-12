using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebMotDePasse : ReferencesGenerales 
    {
        public static string URL_MOTDEPASSE = URL_ROOT_PROJET + "wsMiccomptewebmotpasseoublie.svc/";

        ///URL TEMPLATE
        
        public static string URL_NEW_PASSWORD = URL_MOTDEPASSE + "pvgUserNewPassword";
        public static string URL_FORGOT_PASSWORD = URL_MOTDEPASSE + "pvgUserForgotPassword";
        public static string URL_UPDATE_PASSWORD = URL_MOTDEPASSE + "pvgUserUpdatePassword";

    }
}