using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebSituationVersementJour : ReferencesGenerales
    {
        public static string URL_SITUATION_VERSEMENT_JOUR = URL_ROOT_PROJET + "wsPhamouvementstockreglement.svc/";

        ///URL TEMPLATE
      
        public static string URL_SELECT_SITUATION_VERSEMENT_JOUR = URL_SITUATION_VERSEMENT_JOUR + "pvgMouvementResumeReglement";
    }

}