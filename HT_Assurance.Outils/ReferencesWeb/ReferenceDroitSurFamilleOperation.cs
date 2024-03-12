using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDroitSurFamilleOperation : ReferencesGenerales
    {
        public static string URL_DROIT_SUR_FAMILLE_OPERATION = URL_ROOT_PROJET + "wsLogicielobjettypeoperationoperateur.svc/";

        ///URL TEMPLATE
        
        public static string URL_LISTE_DROIT_SUR_FAMILLE_OPERATION = URL_DROIT_SUR_FAMILLE_OPERATION + "pvgChargerDansDataSetOperateurDroit";
        public static string URL_AJOUT_DROIT_SUR_FAMILLE_OPERATION = URL_DROIT_SUR_FAMILLE_OPERATION + "pvgAjouterListe";
    }
}