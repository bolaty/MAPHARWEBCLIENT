using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferenceDroitSurCompte : ReferencesGenerales
    {
        public static string URL_DROIT_SUR_COMPTE = URL_ROOT_PROJET + "wsOperateurdroitCompteTresorerie.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_DROIT_SUR_COMPTE = URL_DROIT_SUR_COMPTE + "pvgChargerDansDataSetOperateurDroit";
        public static string URL_AJOUTER_DROIT_SUR_COMPTE = URL_DROIT_SUR_COMPTE + "pvgAjouterdroit";
    }
}