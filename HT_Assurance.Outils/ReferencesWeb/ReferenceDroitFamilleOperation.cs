using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assurance.Outils
{
    public class ReferencesWebDroitFamilleOperation : ReferencesGenerales
    {
        public static string URL_DROIT_FAMILLE_OPERATION = URL_ROOT_PROJET + "wsLogicielobjettypeoperationoperateur.svc/";

        ///URL TEMPLATE
        
        public static string URL_SELECT_DROIT_FAMILLE_OPERATION = URL_DROIT_FAMILLE_OPERATION + "pvgChargerDansDataSetOperateurDroit";
        public static string URL_AJOUTER_DROIT_FAMILLE_OPERATION = URL_DROIT_FAMILLE_OPERATION + "pvgAjouterListe";
    }
}